import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";

import { Routes } from "./routes/Router";
import { AuthContextProvider, CartContextProvider } from "./providers";

import "antd/dist/reset.css";

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, PointElement, LineElement, BarElement);

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
