import { ethers } from "ethers";
import axios from "axios";
import { Network, Alchemy } from 'alchemy-sdk';
import { Buffer } from "buffer";

const ABI = []

const fetchLatestTransactions = (contractAddress) => {
  const endpoint = 'https://api-testnet.polygonscan.com/api'
  const module = 'account'
  const action = 'txlist'
  const apiKey = '324TNRV6V23A9RTPUZRYIWYVRITDFI2437'

// https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=0xba821dc848803900C01BA7Ac1D7a034B95B1eD97&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken
  const request_url = `${endpoint}?module=${module}&action=${action}&address=${contractAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
  return axios.get(request_url).then(response => response.data['result'])
}

const decode = (abi, data, topics) => {
  const interface_instance = new ethers.utils.Interface(abi);
  try {
    var parsedLog = interface_instance.parseLog({topics: topics, data: data});
    return {
      schemaId: parsedLog.args['schemaId'].toString(),
      attestation: {
        attester: parsedLog.args['publisher'],
        proposer: parsedLog.args['from'],
        attestee: parsedLog.args['recipient'],
        data: Buffer.from( parsedLog.args['data'].substr(2), 'hex').toString()
      }
    }
  } catch (e) {
    return null;
  }
}

const fetchDecodedTransactionLog = (txHash) => {
  const settings = {
    apiKey: 'wFBwYJxCyZ7dNJg7WW4CJf46E2yk4Hqi',
    network: Network.MATIC_MUMBAI
  };

  const alchemy = new Alchemy(settings);
  return alchemy.core.getTransactionReceipt(txHash).then(txReceipt => {
    const txLogs = txReceipt.logs
    const ret = []
    if (txLogs.length == 101) {
      txLogs.forEach(log => {
        const decodedLog = decode(ABI, log.data, log.topics)
        const temp = {
          address: log.address,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash
        }
        const combinedLog = {
          ...temp,
          ...decodedLog
        }
        ret.push(combinedLog)
      })
    }
    return ret
  })
}

const formatAttestationData = (attestationData) => {
  const ret = {}
  for (const data in attestationData) {
    if (ret.hasOwnProperty(data.schemaId)) {
      ret["data"].push(data)
    }
  }
}

export const fetchAttestationDataOld = async () => {
  const contractAddress = '0xcAd3bab4c178739E0Aa57b4F51e4c79dc8300ce6'
  const transactions = await fetchLatestTransactions(contractAddress)
  const ret = []
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i]
    const txHash = tx.hash
    const parsedLogs = await fetchDecodedTransactionLog(txHash)
    if (parsedLogs.length == 101) {
      // removing last log
      parsedLogs.pop()
      const tempData = {
        schemaId: parsedLogs[0].schemaId.toString(),
        transactionHash: parsedLogs[0].transactionHash,
        blockNumber: parsedLogs[0].blockNumber,
        data: parsedLogs
      }
      ret.push(tempData)
    }
  }
  const formattedAttestationData = formatAttestationData(ret)
  return formattedAttestationData
}

const sortAttestationData = (data) => {
  data = [...data]
  var sortedData = data.sort(function(a, b) { return parseFloat(b[4]) - parseFloat(a[4]); });
  return sortedData
}

export const fetchAttestationData = async (schemaIdList) => {
  const RPC_URL='https://polygon-mumbai.g.alchemy.com/v2/wFBwYJxCyZ7dNJg7WW4CJf46E2yk4Hqi'
  const CONTRACT_ADDRESS='0x61e8b9729741466811456540B1DFE3cA660C7925'
  const CONTRACT_ABI=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"publisher","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"schemaId","type":"uint256"},{"indexed":false,"internalType":"string","name":"data","type":"string"}],"name":"AttestationPublished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"schemaId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"string","name":"key","type":"string"},{"indexed":false,"internalType":"enum SchemaRegistry.SchemaType","name":"schemaType","type":"uint8"},{"indexed":false,"internalType":"string","name":"definition","type":"string"}],"name":"SchemaRegistered","type":"event"},{"inputs":[],"name":"SEMVER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_schemaId","type":"uint256"},{"internalType":"string","name":"_data","type":"string"}],"name":"attest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_schemaId","type":"uint256"},{"components":[{"internalType":"uint256","name":"schemaId","type":"uint256"},{"internalType":"address","name":"publisher","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"data","type":"string"}],"internalType":"struct Attestation.AttestationRecord[]","name":"_attestations","type":"tuple[]"}],"name":"attestBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"attestationIdxByPublisher","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"attestationIdxBySchemaId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attestations","outputs":[{"internalType":"uint256","name":"schemaId","type":"uint256"},{"internalType":"address","name":"publisher","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"data","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_publisher","type":"address"}],"name":"getAttestationsByPublisher","outputs":[{"components":[{"internalType":"uint256","name":"schemaId","type":"uint256"},{"internalType":"address","name":"publisher","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"data","type":"string"}],"internalType":"struct Attestation.AttestationRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_schemaId","type":"uint256"}],"name":"getAttestationsBySchemaId","outputs":[{"components":[{"internalType":"uint256","name":"schemaId","type":"uint256"},{"internalType":"address","name":"publisher","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"data","type":"string"}],"internalType":"struct Attestation.AttestationRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_schemaId","type":"uint256"}],"name":"getSchemaById","outputs":[{"components":[{"internalType":"uint256","name":"schemaId","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"key","type":"string"},{"internalType":"enum SchemaRegistry.SchemaType","name":"schemaType","type":"uint8"},{"internalType":"string","name":"definition","type":"string"}],"internalType":"struct SchemaRegistry.Schema","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_key","type":"string"},{"internalType":"enum SchemaRegistry.SchemaType","name":"_schemaType","type":"uint8"},{"internalType":"string","name":"_definition","type":"string"}],"name":"registerSchema","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"schemaIds","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"schemaTypes","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"schemas","outputs":[{"internalType":"uint256","name":"schemaId","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"key","type":"string"},{"internalType":"enum SchemaRegistry.SchemaType","name":"schemaType","type":"uint8"},{"internalType":"string","name":"definition","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  const rpc = RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const contractAddress = CONTRACT_ADDRESS
  const contractABI = CONTRACT_ABI
  const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

  const ret = []
  for (let i = 0; i < schemaIdList.length; i++) {
    const schemaId = schemaIdList[i]
    const attestationData = await contractInstance.getAttestationsBySchemaId(schemaId)
    const sortedAttestationData = sortAttestationData(attestationData)
    const attestationDataFormatted = {
      "top100Data": [],
      "bottom100Data": []
    }
    for (let j = 0; j < sortedAttestationData.length; j++) {
      const rowData = sortedAttestationData[j]
      if (j < 100) {
        attestationDataFormatted["top100Data"].push({
          schemaId: rowData[0],
          publisher: rowData[1],
          from: rowData[2],
          recipient: rowData[3],
          data: rowData[4]
        })
      } else {
        attestationDataFormatted["bottom100Data"].push({
          schemaId: rowData[0],
          publisher: rowData[1],
          from: rowData[2],
          recipient: rowData[3],
          data: rowData[4]
        })
      }
    }
    ret.push({
      id: schemaId,
      data: attestationDataFormatted
    })
  }

  return ret
}
