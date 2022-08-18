import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppWithReactQuery from "./AppWithReactQuery";
const queryClient = new QueryClient({
defaultOptions: {
  queries: {
  staleTime: 86400 * 7
  }
}
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWithReactQuery />
    </QueryClientProvider>
  </React.StrictMode>
);
