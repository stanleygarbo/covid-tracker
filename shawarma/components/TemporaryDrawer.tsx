import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/icons/Menu";
import Facebook from "@material-ui/icons/Facebook";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { useTheme } from "../contexts/ThemeContextProvider";
import { useRouter } from "next/router";
import { IconButton } from "@material-ui/core";
import {
  Brightness4Outlined,
  Brightness7Outlined,
  Info,
} from "@material-ui/icons";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();

  const router = useRouter();

  const { pathname } = router;

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {
            linkName: "Home",
            linkUrl: "/",
            linkIcon: <HomeIcon />,
          },
          {
            linkName: "Map",
            linkUrl: "/map",
            linkIcon: <ExploreIcon />,
          },
          {
            linkName: "Hospitals",
            linkUrl: "/hospitals",
            linkIcon: <LocalHospitalIcon />,
          },
          {
            linkName: "About",
            linkUrl: "/about",
            linkIcon: <Info />,
          },
        ].map((link, index) => (
          <ListItem
            key={index}
            button
            component="a"
            onClick={() => {
              router.push(link.linkUrl);
            }}
            target="blank"
            style={{
              backgroundColor: pathname === link.linkUrl && theme.accent + "20",
            }}
          >
            <ListItemIcon
              style={{ color: pathname === link.linkUrl && theme.accent }}
            >
              {link.linkIcon}
            </ListItemIcon>
            <ListItemText
              style={{ color: pathname === link.linkUrl && theme.accent }}
              primary={link.linkName}
            />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {/* {[
          {
            linkName: "Facebook page",
            linkUrl: "https://www.facebook.com/coderko/",
            linkIcon: <Facebook />,
          },
        ].map((link, index) => (
          <ListItem
            key={index}
            button
            component="a"
            href={link.linkUrl}
            target="blank"
          >
            <ListItemIcon>{link.linkIcon}</ListItemIcon>
            <ListItemText primary={link.linkName} />
          </ListItem>
        ))} */}

        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon>
            {!isDarkMode ? <Brightness4Outlined /> : <Brightness7Outlined />}
          </ListItemIcon>
          <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer("left", true)}
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
