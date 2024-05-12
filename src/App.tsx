import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { PaletteMode } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'
import {
  AppAppBar,
  FAQ,
  Features,
  Footer,
  Hero,
  Highlights,
  LogoCollection,
  Pricing,
  Testimonials,
} from './components'
import { getLPTheme } from './getLPTheme'

interface ToggleCustomThemeProps {
  showCustomTheme: boolean
  toggleCustomTheme: () => void
}

export function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color='primary'
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label='Platform'
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

export function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light')
  const LPtheme = createTheme(getLPTheme(mode))

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}
