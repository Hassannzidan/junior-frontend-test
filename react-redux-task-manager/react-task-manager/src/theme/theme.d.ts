import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brandAccent: Palette['primary']
  }
  interface PaletteOptions {
    brandAccent?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    brandAccent: true
  }
}
