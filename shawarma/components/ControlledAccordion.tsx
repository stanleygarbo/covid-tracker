import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTheme } from "../contexts/ThemeContextProvider";
import { IControlledAccordion } from "../interfaces/IControlledAccordion";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "100px",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function ControlledAccordion({
  title,
  description,
  value,
}: IControlledAccordion) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const { theme } = useTheme();

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
          <Typography className={classes.secondaryHeading}>{value}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column" }}>
          <Typography
            style={{
              color: theme.textPrimaryLight,
              fontSize: 30,
            }}
          >
            {value}
          </Typography>
          <Typography style={{ color: theme.textPrimaryLight, marginTop: 15 }}>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
