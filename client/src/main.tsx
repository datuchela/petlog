import React from "react";
import ReactDOM from "react-dom/client";

//React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Context Providers
import { AuthProvider } from "./context/AuthProvider";
import { PetsProvider } from "./context/PetsProvider";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <PetsProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </PetsProvider>
    </AuthProvider>
  </React.StrictMode>
);
