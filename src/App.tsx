import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { Routes } from "./routes/Router";
import { AuthContextProvider, CartContextProvider } from "./providers";

import "antd/dist/reset.css";

const queryClient = new QueryClient();

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <Routes />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
