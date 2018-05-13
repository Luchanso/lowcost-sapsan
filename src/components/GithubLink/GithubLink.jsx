import React from "react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import GithubIcon from "../GithubIcon";

const styles = ({ spacing, palette }) => ({
  root: {
    color: palette.type === "dark" ? "white" : "black"
  }
});

const GithubLink = ({ classes, ...otherProps }) => (
  <IconButton className={classes.root} {...otherProps}>
    <GithubIcon />
  </IconButton>
);

export default withStyles(styles)(GithubLink);
