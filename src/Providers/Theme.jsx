import React, { useMemo, useEffect } from 'react'
// https://mui.com/material-ui/customization/palette/#customization
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useThemeSlice } from '/app/slices'
import Color from '/lib/color'

const createCustomTheme = theme =>
  createTheme({
    palette: {
      primary: { main: theme.mainColor },
      secondary: { main: theme.secondColor },
    },
  })

const CustomThemeProvider = ({ children }) => {
  const theme = useThemeSlice().useTheme()
  useEffect(() => updateCSS(theme), [theme])
  const providedTheme = useMemo(() => createCustomTheme(theme), [theme])

  return <ThemeProvider theme={providedTheme}>{children}</ThemeProvider>
}

const updateCSS = theme => {
  const { style } = window.document.documentElement // html
  const { mainColor, secondColor } = theme
  const [forgroundColor, backgroundColor] = ['#111', '#EEE']
  const colors = [
    ['main-color', mainColor],
    ['second-color', secondColor],
    ['foreground-color', forgroundColor],
    ['background-color', backgroundColor],
  ]
  for (const [prop, value] of colors) {
    const color = new Color(value)
    style.setProperty(`--${prop}`, color.toString())
    for (const variant of ['lighten', 'darken', 'opacity']) {
      for (const percent of [0, 20, 40, 60, 80, 100]) {
        style.setProperty(`--${prop}-${variant}-${percent}`, color[variant](percent / 100))
      }
    }
  }
  style.setProperty('--logo', `url(${theme.logo})`)
}

export default CustomThemeProvider
