import { createMuiTheme } from "@material-ui/core";
import { lightModeColors, darkModeColors } from "./colors";

const overrides = {
  MuiFormControlLabel: {
    label: {
      display: "flex",
    },
  },
  MuiButton: {
    label: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

const overridesLight = {
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: lightModeColors.primaryLight,
      },
    },
    MuiSelect: {
      root: {
        color: lightModeColors.textPrimaryDark,
      },
    },
    ...overrides,
  },
};

const overridesDark = {
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: darkModeColors.primaryLight,
      },
    },
    MuiSelect: {
      root: {
        color: darkModeColors.textPrimary,
      },
    },
    ...overrides,
  },
};

const breakpoints = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export const materialDarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: darkModeColors.accent,
    },
    secondary: {
      main: darkModeColors.error,
    },
  },
  ...breakpoints,
  ...overridesDark,
});

export const materialLightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: lightModeColors.accent,
    },
    secondary: {
      main: lightModeColors.error,
    },
  },
  ...breakpoints,
  ...overridesLight,
});

materialLightTheme.typography.h5 = {
  fontSize: 20,
  "@media (max-width:462px)": {
    fontSize: 16,
  },
};

materialLightTheme.typography.subtitle1 = {
  fontSize: 13,
  "@media (max-width:462px)": {
    fontSize: 12,
  },
};

materialDarkTheme.typography.h5 = {
  fontSize: 20,
  "@media (max-width:462px)": {
    fontSize: 16,
  },
};

materialDarkTheme.typography.subtitle1 = {
  fontSize: 13,
  "@media (max-width:462px)": {
    fontSize: 12,
  },
};
