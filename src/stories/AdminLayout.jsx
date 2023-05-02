import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import theme from 'theme/theme';
import AdminLayout from "../layouts/admin";
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom';
import RTLLayout from '../layouts/rtl';

export const App = () => {
  return <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>
          {/* <Route path={`/auth`} component={AuthLayout} /> */}
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Redirect from='/' to='/admin' />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>
}