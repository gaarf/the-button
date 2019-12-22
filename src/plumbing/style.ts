import React from "react";
import { StyleSheetDefinition } from "aesthetic";
import TypeStyleAesthetic from "aesthetic-adapter-typestyle";
import {
  useStylesFactory,
  useThemeFactory,
  ThemeProvider
} from "aesthetic-react";
import { TypeStyle } from "typestyle";
import * as csstips from "csstips";

type Mixins = { [key in keyof typeof csstips]: any };

interface Theme {
  color: {
    bg: string;
    text: string;
  };
  font: {
    family: string;
    size: string | number;
  };
  border: string;
  unit: number;
  mixin: Mixins;
}

const aesthetic = new TypeStyleAesthetic<Theme>(
  new TypeStyle({ autoGenerateTag: true })
);

csstips.setupPage('#root');
csstips.normalize();

aesthetic.registerTheme(
  "default",
  {
    color: {
      bg: "white",
      text: "#111"
    },
    font: {
      family: "sans-serif",
      size: 14
    },
    unit: 8,
    border: '1px solid #CCC',
    mixin: csstips as Mixins
  },
  ({ color, font }: Theme) => ({
    "@global": {
      body: {
        backgroundColor: color.bg,
        fontFamily: font.family,
        fontSize: font.size,
        color: color.text
      }
    }
  })
);

export default aesthetic;

export const ThemeProviderImpl: React.FC = ({ children }) => {
  aesthetic.changeTheme("default");
  return React.createElement(ThemeProvider, { aesthetic, children: children! });
};

export type StyleSheet = StyleSheetDefinition<Theme, any>;

export const useStyles = useStylesFactory(aesthetic);
export const useTheme = useThemeFactory(aesthetic);
