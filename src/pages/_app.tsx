import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

import Layout from '../components/Layout';
import MyAppContextProvider from '../components/MyAppContextProvider';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      text: {
        disabled: 'text.primary'
      }
    },
    components: {
      MuiInputBase: {
        defaultProps: {
          autoComplete: 'off',
        },
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyAppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MyAppContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
