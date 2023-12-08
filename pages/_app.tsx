import { useState } from "react";
import { QueryClient,Hydrate } from "@tanstack/react-query";
import { QueryClientProvider
 } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import {UIProvider} from '@/components/contexts/UIContext'



import "@/styles/globals.css";
import theme from "@/lib/theme";

export default function App({ Component, pageProps }:any) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            staleTime: 1000 * 10,
            retry: process.env.NODE_ENV === "production",
            refetchOnWindowFocus: process.env.NODE_ENV === "production",
          },
        },
      })
  );

  return (
    <>
      <CssBaseline />
      
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Hydrate state={pageProps.dehydratedState}>
              <UIProvider>
                <Component {...pageProps} />
                </UIProvider>
             
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
     
    </>
  );
}
