import React, { createContext, useContext, useEffect, useState } from "react";
import { darkModeColors, lightModeColors } from "../theme/colors";

type IContext = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    accent: string;
    accent2: string;
    textPrimary: string;
    textPrimaryDark: string;
    textPrimaryLight: string;
    shadow: string;
    error: string;
    success: string;
    dark: string;
  };
};

const ThemeContext = createContext<IContext>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  theme: lightModeColors,
});

interface IThemeContextProvider {
  children: React.ReactChild;
}

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider: React.FC<IThemeContextProvider> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    setIsDarkMode(isDarkMode == "true");
  }, []);

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", (!isDarkMode).toString());
    return "Current mode: " + isDarkMode;
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        theme: isDarkMode ? darkModeColors : lightModeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
