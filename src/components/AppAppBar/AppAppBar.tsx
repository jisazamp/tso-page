import { useTheme } from '@emotion/react'
import MenuIcon from '@mui/icons-material/Menu'
import { Divider, PaletteMode } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ToggleColorMode } from '..'
import logo from '../../assets/img/logo.png'
import logoLight from '../../assets/img/logo_light.png'
import { auth } from '../../config'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/Logout'

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
}

interface AppAppBarProps {
  mode: PaletteMode
  toggleColorMode: () => void
}

export function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const theme = useTheme() as { palette: { mode: 'light' | 'dark' } }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error when logging out', error)
    }
  }

  return (
    <div>
      <AppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar
            variant='regular'
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              {theme.palette.mode === 'light' ? (
                <img
                  src={logoLight}
                  style={logoStyle}
                  alt='logo of juan isaza'
                />
              ) : (
                <img src={logo} style={logoStyle} alt='logo of juan isaza' />
              )}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  component={Link}
                  to='/tso-page'
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant='body2' color='text.primary'>
                    Inicio
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {!user ? (
                <>
                  <Button
                    color='primary'
                    variant='contained'
                    size='small'
                    component={Link}
                    to='signin'
                  >
                    Login
                  </Button>
                </>
              ) : (
                <Typography variant='body2' color='secondary.dark'>
                  Hola, {user.email?.split('@')[0]}
                </Typography>
              )}
              {!!user && (
                <Button
                  color='primary'
                  size='small'
                  variant='text'
                  onClick={signOutUser}
                >
                  Salir
                  <LogoutIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </Button>
              )}
            </Box>

            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            ></Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant='text'
                color='primary'
                aria-label='menu'
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                    {!!user && (
                      <Typography
                        variant='body2'
                        sx={(theme) => ({
                          color:
                            theme.palette.mode === 'light' ? '#000' : '#FFF',
                        })}
                      >
                        {user.email?.split('@')[0]}
                      </Typography>
                    )}
                  </Box>
                  <MenuItem
                    component={Link}
                    to='/tso-page'
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Inicio
                  </MenuItem>
                  <Divider />
                  {user ? (
                    <MenuItem>
                      <Button
                        color='primary'
                        variant='outlined'
                        sx={{ width: '100%' }}
                        onClick={signOutUser}
                      >
                        Salir
                        <LogoutIcon sx={{ fontSize: 18, ml: 0.5 }} />
                      </Button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Button
                        color='primary'
                        variant='contained'
                        component={Link}
                        to='signin'
                        sx={{ width: '100%' }}
                        onClick={() => {
                          setOpen(false)
                        }}
                      >
                        Login
                      </Button>
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
