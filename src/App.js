import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
// import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import {
  ChakraProvider,
  // useToast,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
// Chakra imports

// --- 1. IMPORT HÀM GỌI DATABASE ---
// import { getAllUsers } from './services/db'; 

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  // const toast = useToast();
  // useEffect(() => {
  //   const testConnection = async () => {
  //     try {
  //       console.log("⏳ Đang thử kết nối tới Neon Postgres...");
        
  //       // Gọi hàm từ service
  //       const response = await getAllUsers();
        
  //       console.log("✅ KẾT QUẢ TỪ NEON:", response);
        
  //       // Hiện thông báo xanh lá cây báo thành công
  //       toast({
  //         title: "Kết nối Database thành công!",
  //         description: `Đã lấy được ${response.data ? response.data.length : 0} dòng dữ liệu. Xem F12 (Console).`,
  //         status: "success",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "top-right"
  //       });

  //     } catch (error) {
  //       console.error("❌ Lỗi kết nối:", error);
        
  //       // Hiện thông báo đỏ báo lỗi
  //       toast({
  //         title: "Lỗi kết nối Neon Database",
  //         description: error.message,
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true,
  //         position: "top-right"
  //       });
  //     }
  //   };

  //   // Gọi hàm test
  //   testConnection();
  // }, [toast]); // [] rỗng nghĩa là chỉ chạy 1 lần khi web vừa tải xong

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
