import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { ThemedButton } from "./ThemedButton";
import { IMediaCard } from "../interfaces/IMediaCard";
import { CardActionArea } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShareIcon from "@material-ui/icons/Share";
import { useTheme } from "../contexts/ThemeContextProvider";
import { darkModeColors } from "../theme/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      alignItems: "space-between",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    content: {
      flex: 1,
      height: "100%",
      "&:last-child": {
        padding: 10,
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cover: {
      width: 151,
      height: "100%",
      background: darkModeColors.accent,
      "@media(max-width:390px)": {
        width: 121,
      },
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    icons: {
      display: "flex",
      marginTop: 14,
      "& > *": {
        fontSize: 35,
      },
      "@media(max-width:390px)": {
        "& > *": {
          fontSize: 25,
        },
      },
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    cardActionArea: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
  })
);

export default function MediaCard({
  title,
  subtitle,
  withButton = true,
  onClick,
}: IMediaCard) {
  const classes = useStyles();
  const { theme } = useTheme();

  if (withButton)
    return (
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {subtitle}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <ThemedButton onClick={() => {}}>Learn more</ThemedButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/medicalservices.svg"
          title="Live from space album cover"
        />
      </Card>
    );
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea} onClick={onClick}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography
              component="h5"
              variant="h5"
              style={{ color: theme.textPrimaryDark }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ color: theme.textPrimaryLight }}
            >
              {subtitle}
            </Typography>
            <div
              className={classes.icons}
              style={{ color: theme.textPrimaryLight }}
            >
              <ShareIcon />
              <LocationOnIcon style={{ marginLeft: 12 }} />
            </div>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          component="img"
          alt="hospital illustration"
          image="/medicalservices.svg"
          title="Live from space album cover"
        />
      </CardActionArea>
    </Card>
  );
}
