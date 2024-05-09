import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import components from './Components';
import typography from './Typography';
import { shadows } from './Shadows';
import { LightThemeColors } from './LightThemeColors';
import { baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale';

export const BuildTheme = (config: any = {}) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const defaultTheme = baselightTheme;
  const defaultShadow = shadows;
  const themeSelect = themeOptions;
  const baseMode = {
    shadows: defaultShadow,
    typography: typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );
  theme.components = components(theme);

  return theme;
};




const ThemeSettings = () => {
  return BuildTheme();
};

export { ThemeSettings };