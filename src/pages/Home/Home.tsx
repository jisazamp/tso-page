import { Box, Divider } from '@mui/material'
import {
  FAQ,
  Features,
  Footer,
  Hero,
  Highlights,
  LogoCollection,
  Pricing,
  Testimonials,
} from '../../components'

export const Home = () => {
  return (
    <>
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
    </>
  )
}
