"use client";
import { ContextToggleProvider } from "@/context/NavbarToggleContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

// create a client
const queryClient = new QueryClient();
// persistor.purge() // clears localStorage for redux-persist

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (

      <QueryClientProvider client={queryClient}>
        <ContextToggleProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </ContextToggleProvider>
      </QueryClientProvider>

  );
};

export default Providers;
