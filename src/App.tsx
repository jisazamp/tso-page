import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { onAuthStateChanged } from 'firebase/auth'
import * as React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppAppBar } from './components'
import { auth } from './config'
import { getLPTheme } from './getLPTheme'

export function Layout() {
  const [mode, setMode] = React.useState<PaletteMode>('light')
  const navigate = useNavigate()
  const LPtheme = createTheme(getLPTheme(mode))

  const toggleColorMode = React.useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/tso-page/signin')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Outlet />
    </ThemeProvider>
  )
}
