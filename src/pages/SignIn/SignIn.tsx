import { zodResolver } from '@hookform/resolvers/zod'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config'
import { SignInFormData, SignInUserSchema } from '../../types'

export function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInUserSchema),
  })

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/tso-page')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true)

    signInWithEmailAndPassword(auth, data.username, data.password)
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

        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register('username')}
            margin='normal'
            required
            fullWidth
            id='username'
            label='Correo Institucional'
            helperText={errors.username?.message}
            name='username'
            autoComplete='username'
            type='email'
            autoFocus
            error={!!errors.username}
          />

          <TextField
            {...register('password')}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Contraseña'
            helperText={errors.password?.message}
            type='password'
            id='password'
            autoComplete='current-password'
            error={!!errors.password}
          />

          {/* <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Recuérdame'
          /> */}

          <Button
            type='submit'
            disabled={isLoading}
            fullWidth
            variant='contained'
            sx={(theme) => ({
              mt: 3,
              mb: 2,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.01)' },
              '&:active': { transform: 'scale(0.98)' },
              backgroundColor: isLoading
                ? '#d4d4d4'
                : theme.palette.primary.dark,
            })}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
          </Button>

          {/* <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  )
}
