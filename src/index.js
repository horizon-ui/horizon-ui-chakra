import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/rtl/*" element={<RtlLayout />} />
            <Route path="/" element={<Navigate to="/admin" />} />
          </Routes>
        </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
