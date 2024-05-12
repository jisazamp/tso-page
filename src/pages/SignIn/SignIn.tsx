import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config'

export function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/tso-page')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)
    const email = data.get('email') + ''
    const password = data.get('password') + ''

    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Inicio de sesión
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Correo Institucional'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Contraseña'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Recuérdame'
          />
          <Button
            type='submit'
            disabled={isLoading}
            fullWidth
            variant='contained'
            sx={(theme) => ({
              mt: 3,
              mb: 2,
              backgroundColor: isLoading
                ? '#d4d4d4'
                : theme.palette.primary.dark,
            })}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
