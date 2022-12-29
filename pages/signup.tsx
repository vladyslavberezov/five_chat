import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {SignUpTemplate} from 'src/components/templates'
const theme = createTheme()

export default function Signup() {
  return (
      <ThemeProvider theme={theme}>
        <SignUpTemplate/>
      </ThemeProvider>
  )
}