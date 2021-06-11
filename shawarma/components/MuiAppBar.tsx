import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";

import ToggleSwitch from "./ToggleSwitch";
import { useTheme } from "../contexts/ThemeContextProvider";
import TemporaryDrawer from "./TemporaryDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "block",
      minWidth: 90,
      marginLeft: 15,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor:
        theme.palette.type === "light"
          ? fade(theme.palette.grey[300], 0.55)
          : fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor:
          theme.palette.type === "light"
            ? fade(theme.palette.grey[300], 0.75)
            : fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      display: "none",

      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
        display: "flex",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
      },
      "@media(min-width:560px)": {
        "&:focus": {
          width: 400,
        },
      },
    },
    sectionDesktop: {
      alignItems: "center",
      display: "flex",
    },
  })
);

export default function MuiAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const { theme } = useTheme();

  const isMenuOpen = Boolean(anchorEl);

  // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        style={{
          background: theme.primaryLight,
          color: theme.textPrimaryDark,
          boxShadow: "none",
          boxSizing: "border-box",
          borderBottom: `1px solid ${theme.textPrimaryLight}35`,
        }}
      >
        <Toolbar
          style={{
            minHeight: 64,
          }}
        >
          <TemporaryDrawer />
          <Typography className={classes.title} variant="h6" noWrap>
            NCoV-Go
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton
              edge="end"
              aria-label="search"
              aria-haspopup="true"
              color="inherit"
              style={{ marginRight: 10 }}
            >
              <SearchIcon />
            </IconButton> */}
            <ToggleSwitch />
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
