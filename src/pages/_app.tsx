import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import type { AppProps } from 'next/app'
import MenuAppBar from '../components/AppBar'

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
      <MenuAppBar />
      <main>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}

export default MyApp
