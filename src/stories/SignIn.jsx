import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import theme from 'theme/theme';
import AuthLayout from "../layouts/auth";
import { MemoryRouter } from 'react-router-dom';

export const SignIn = () => {
    return <ChakraProvider theme={theme}>
        <React.StrictMode>
            <MemoryRouter initialEntries={['/auth']}>
                <AuthLayout />
            </MemoryRouter>
        </React.StrictMode>
    </ChakraProvider>
}