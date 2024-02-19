/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import Main from "./screens";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from "./store";


const queryClient = new QueryClient()

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Main />
      </Provider>
    </QueryClientProvider>

  );
}

export default App;
