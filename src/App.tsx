import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { AppAppBar } from './components'
import { getLPTheme } from './getLPTheme'

export function Layout() {
  const [mode, setMode] = React.useState<PaletteMode>('light')
  const LPtheme = createTheme(getLPTheme(mode))

  const toggleColorMode = React.useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Outlet />
    </ThemeProvider>
  )
}
