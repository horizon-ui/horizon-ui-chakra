import {
  Box,
  Select
} from '@chakra-ui/react'

export default function RankingsOptions(props) {
  const { placeholder, options, onChangeCallback } = props;
  return (
    <Box w="250px">
      <Select placeholder={placeholder} onSelect={() => {onChangeCallback()}}>
        {options.map((option) => {
          return <option value={option}>{option}</option>
        })}
      </Select>
    </Box>
  )
}
