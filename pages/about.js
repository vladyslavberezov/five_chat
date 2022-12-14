import * as React from 'react'
import { Typography, Box, Container, Button, Link } from 'src/components/atoms/'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
        <ProTip/>
        <Copyright/>
      </Box>
    </Container>
  )
}
