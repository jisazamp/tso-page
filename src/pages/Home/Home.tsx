import { Box, Divider } from '@mui/material'
import {
  FAQ,
  Footer,
  Highlights,
  LogoCollection,
  Pricing,
} from '../../components'

export const Home = () => {
  return (
    <>
      {/* <Hero /> */}
      <Box sx={{ bgcolor: 'background.default', marginTop: 10 }}>
        <LogoCollection />
        {/* <Features /> */}
        <Divider />
        {/* <Testimonials /> */}
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
