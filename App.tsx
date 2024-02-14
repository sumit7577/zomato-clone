/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import Main from "./navigation"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>

  );
}

export default App;
