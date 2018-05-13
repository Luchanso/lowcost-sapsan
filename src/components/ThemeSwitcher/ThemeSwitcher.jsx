import React from "react";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import InvertColorsIcon from "@material-ui/icons/InvertColors";

const styles = ({ palette }) => ({
  root: {
    position: "fixed",
    top: 20,
    right: 20,
    color: palette.type === "dark" ? "white" : "black"
  }
});

const ThemeSwitcher = props => (
  <IconButton aria-label="Invert site colors" {...props}>
    <InvertColorsIcon />
  </IconButton>
);

export default withStyles(styles)(ThemeSwitcher);
