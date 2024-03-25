/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useMemo, useEffect } from 'react';
// https://mui.com/material-ui/customization/palette/#customization
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '~/features/theme';
import Color from '~/lib/color';

const createCustomTheme = (theme) =>
  createTheme({
    palette: {
      primary: { main: theme.mainColor },
      secondary: { main: theme.secondColor },
    },
  });

const CustomThemeProvider = ({ children }) => {
  const theme = useTheme().useTheme();
  useEffect(() => updateCSS(theme), [theme]);
  const providedTheme = useMemo(() => createCustomTheme(theme), [theme]);

  return <ThemeProvider theme={providedTheme}>{children}</ThemeProvider>;
};

const updateCSS = (theme) => {
  const { style } = window.document.documentElement; // html
  const { mainColor, secondColor, foregroundColor, backgroundColor } = theme;
  const colors = [
    ['main-color', mainColor],
    ['second-color', secondColor],
    ['foreground-color', foregroundColor],
    ['background-color', backgroundColor],
  ];
  for (const [prop, value] of colors) {
    const color = new Color(value);
    style.setProperty(`--${prop}`, color.toString());
    for (const variant of ['lighten', 'darken', 'opacity']) {
      for (const percent of [0, 20, 40, 60, 80, 100]) {
        style.setProperty(
          `--${prop}-${variant}-${percent}`,
          color[variant](percent / 100),
        );
      }
    }
  }
  style.setProperty('--logo', `url(${theme.logo})`);
};

export default CustomThemeProvider;
