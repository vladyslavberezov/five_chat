import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '../src/Link'

export default function SignIn() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xs">
          <Link href="/" color="secondary">
            login page
          </Link>
        <Box sx={{
          bgcolor: '#cfe8fc',
          width: '100%',
          justifyContent: 'center'
        
        }}>
          <form>
            <Stack spacing={2}>
              <TextField
                required
                id="standard-required"
                label="Username"
                defaultValue=""
                variant="standard"
              />
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
              <Button size="small" color="secondary" variant="contained">Contained</Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
