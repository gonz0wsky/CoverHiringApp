import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
  useQueryClient as useReactQueryClient,
} from "@tanstack/react-query";

import type { ReactNode } from "react";
import React from "react";

export const queryClient = new QueryClient();

const Context = React.createContext<{
  queryClient: QueryClient;
}>({
  queryClient,
});

const InitClient = ({ children }: { children: ReactNode }) => {
  useReactQueryClient(queryClient);
  return <>{children}</>;
};

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Context.Provider value={{ queryClient }}>
      <InitClient>
        <ReactQueryClientProvider client={queryClient}>
          {children}
        </ReactQueryClientProvider>
      </InitClient>
    </Context.Provider>
  );
};

export function useQueryClient() {
  return React.useContext(Context).queryClient;
}
