// functions/index.js
const functions = require("firebase-functions");
const { Pool } = require("pg");

// Cấu hình kết nối (Nên dùng biến môi trường, nhưng đây là ví dụ hard-code để bạn dễ hiểu trước)
// Bạn thay chuỗi kết nối của Neon vào đây
const connectionString = "postgresql://neondb_owner:npg_7btITi9PnVJg@ep-wild-sunset-a1x943n4-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
// const connectionString = "my_connection_string"

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Bắt buộc với Neon
});

// Tạo một hàm tên là 'getDataFromNeon'
exports.getDataFromNeon = functions.https.onCall(async (data, context) => {
  // data: là tham số từ React gửi lên (ví dụ: id user)
  // context: chứa thông tin xác thực người dùng (nếu user đã login)

  // 1. Kiểm tra xem người dùng đã login chưa (tuỳ chọn)
  // if (!context.auth) {
  //    throw new functions.https.HttpsError('unauthenticated', 'Bạn cần đăng nhập.');
  // }
  let client;
  try {
    client = await pool.connect();
    
    // Đảm bảo bảng 'users' đã tồn tại trong database của bạn
    const result = await client.query('SELECT * FROM user LIMIT 5'); 
    
    return { success: true, data: result.rows };

  } catch (error) {
    console.error("Lỗi Database:", error);
    throw new functions.https.HttpsError('internal', 'Lỗi kết nối Database', error.message);
  } finally {
    // Luôn giải phóng kết nối
    if (client) client.release();
  }
});