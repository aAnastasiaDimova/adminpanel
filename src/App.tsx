import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./router/routes";
import { QueryClientProviderC } from "./providers/tanstack";
import { StoreProvider } from "./store/storeProvider";

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <QueryClientProviderC>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </QueryClientProviderC>
  );
};

export default App;
