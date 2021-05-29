import { Button } from "@material-ui/core";
import React from "react";
import { useTheme } from "../contexts/ThemeContextProvider";
import { IThemedButton } from "../interfaces/IThemedButton";

export const ThemedButton: React.FC<IThemedButton> = ({
  children,
  style,
  onClick,
}) => {
  const { isDarkMode, theme } = useTheme();

  const btnStyles = {
    background: isDarkMode ? theme.primaryLighter : "none",
    border: isDarkMode ? "none" : `1px solid ${theme.textPrimaryDark}50`,
  };

  return (
    <Button size="large" onClick={onClick} style={{ ...style, ...btnStyles }}>
      {children}
    </Button>
  );
};
