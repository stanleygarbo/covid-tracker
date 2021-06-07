import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { useTheme } from "../contexts/ThemeContextProvider";
import { Brightness4Outlined, Brightness7Outlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { IToggleSwitch } from "../interfaces/IToggleSwitch";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      marginLeft: theme.spacing(3),
      display: "none",

      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),

      backgroundColor:
        theme.palette.type == "light" ? theme.palette.grey[300] : "#fff",
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function CustomizedSwitches({ label = "" }: IToggleSwitch) {
  const { isDarkMode, toggleDarkMode, theme } = useTheme();

  return (
    <FormGroup
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControlLabel
        control={
          <IOSSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            name="mode"
          />
        }
        style={{ marginRight: 0 }}
        label={label}
      />
      <IconButton
        style={{ color: theme.textPrimaryDark }}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
      </IconButton>
    </FormGroup>
  );
}
