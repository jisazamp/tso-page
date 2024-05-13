import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { PaletteMode } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface ToggleColorModeProps {
  mode: PaletteMode
  toggleColorMode: () => void
}

export function ToggleColorMode({
  mode,
  toggleColorMode,
}: ToggleColorModeProps) {
  return (
    <Box sx={{ maxWidth: '32px', ml: 1, mr: 1 }}>
      <Button
        variant='text'
        onClick={toggleColorMode}
        size='small'
        aria-label='button to toggle theme'
        sx={{
          minWidth: '32px',
          height: '32px',
          p: '4px',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.1)' },
          '&:active': { transform: 'scale(0.9)' },
        }}
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize='small' />
        ) : (
          <ModeNightRoundedIcon fontSize='small' />
        )}
      </Button>
    </Box>
  )
}
