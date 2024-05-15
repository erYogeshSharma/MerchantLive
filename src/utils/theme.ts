import { Color, darkScrollbar } from "@mui/material";
import {
  amber,
  deepPurple,
  green,
  grey,
  indigo,
  orange,
  red,
} from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    txt12: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    txt12?: React.CSSProperties;
  }

  interface PaletteColor {
    25?: string;
    50?: string;
    200?: string;
    400?: string;
    500?: string;
    600?: string;
  }

  interface SimplePaletteColorOptions {
    25?: string;
    50?: string;
    200?: string;
    400?: string;
    500?: string;
    600?: string;
  }

  interface TypeText {
    25?: string;
    50?: string;
    200?: string;
    500?: string;
    400?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    w9: string;
  }
}

const inter = "'Inter', sans-serif";
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    txt12: true;
  }
}

type mode = "light" | "dark";
const primary = indigo;
const secondary = amber;

function getIconColors(color: Color, mode: mode) {
  const dark = mode === "dark";
  return {
    backgroundColor: dark ? color[900] : color[50],
    color: dark ? color[100] : color[700],
    border: `1px solid ${color[200]}`,
    "&:hover": {
      backgroundColor: dark ? color[600] : color[100],
    },
  };
}
const getTheme = (mode: mode): ThemeOptions => ({
  typography: {
    fontSize: 16,
    htmlFontSize: 10,
    fontFamily: inter,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          ...darkScrollbar(
            mode === "light"
              ? {
                  track: "#fff",
                  thumb: grey[400],
                  active: grey[400],
                }
              : undefined
          ),
          //scrollbarWidth for Firefox
          scrollbarWidth: "thin",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          height: 15,
          width: 15,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: getIconColors(primary, mode),
        colorError: getIconColors(red, mode),
        colorSuccess: getIconColors(green, mode),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: mode === "dark" ? primary[700] : primary[200],
            "&:hover": {
              backgroundColor: mode === "dark" ? primary[500] : primary[100],
            },
          },
        },
      },
    },
  },
  palette: {
    mode: mode,
    primary: primary,
    secondary: secondary,

    background: {
      default: mode === "light" ? primary[50] : grey[900],
      paper: mode === "light" ? "#fff" : grey[900],
    },
  },
  shape: {
    borderRadius: 1,
  },
});

export default getTheme;
