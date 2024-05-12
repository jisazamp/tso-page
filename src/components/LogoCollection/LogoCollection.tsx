import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/system'
import { Bash, Linux, Windows } from '../../assets/img'

const iconStyles = {
  fontSize: '60px',
}

const whiteLogos = [
  { id: 3, label: 'Linux', logo: <Linux /> },
  { id: 4, label: 'Windows', logo: <Windows /> },
  {
    id: 1,
    label: 'bash',
    logo: <Bash />,
  },
  { id: 2, label: 'GitHub', logo: <GitHubIcon sx={iconStyles} /> },
]

const darkLogos = [
  { id: 3, label: 'Linux', logo: <Linux /> },
  { id: 4, label: 'Windows', logo: <Windows /> },
  {
    id: 1,
    label: 'bash',
    logo: <Bash />,
  },
  { id: 2, label: 'GitHub', logo: <GitHubIcon sx={iconStyles} /> },
]

export function LogoCollection() {
  const theme = useTheme()
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos

  return (
    <Box id='logoCollection' sx={{ py: 4 }}>
      <Typography
        component='p'
        variant='subtitle2'
        align='center'
        color='text.secondary'
      >
        Tecnologías que vamos a usar en este curso
      </Typography>
      <Grid container justifyContent='center' sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo) => (
          <Grid item key={logo.id}>
            <Box
              sx={(theme) => ({
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                justifyContent: 'center',
                margin: '10px 20px',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                '& svg': {
                  fill: theme.palette.mode === 'light' ? '#000' : '#FFF',
                },
              })}
            >
              {logo.logo}
              <Typography>{logo.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
