import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme/index";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
  <Component {...pageProps} />
  </ThemeProvider>
  
  </>
  )
}
