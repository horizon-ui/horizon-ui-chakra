import { httpsCallable } from "firebase/functions";
// Đi ra ngoài thư mục services (..) để tìm file firebase.js ở thư mục src
import { functions } from "../firebase";

/**
 * Hàm chung để gọi Cloud Functions
 * Giúp code gọn hơn và dễ xử lý lỗi tập trung
 */
const callFunction = async (functionName, data = {}) => {
  try {
    const func = httpsCallable(functions, functionName);
    const result = await func(data);
    return result.data;
  } catch (error) {
    console.error(`Lỗi khi gọi function ${functionName}:`, error);
    throw error;
  }
};

/**
 * Lấy danh sách users từ Neon Postgres
 * Gọi function 'getDataFromNeon' đã viết trong index.js (Backend)
 */
export const getAllUsers = async () => {
  // Gọi hàm và trả về kết quả
  return await callFunction('getDataFromNeon');
};

/**
 * Ví dụ thêm: Thêm mới user (nếu sau này bạn cần)
 */
export const addUser = async (userData) => {
  return await callFunction('addUserToNeon', userData);
};