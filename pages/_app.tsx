import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
