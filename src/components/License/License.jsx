import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Link from "../Link";

const styles = {
  root: {
    margin: 20
  }
};

const License = ({ classes }) => (
  <Typography variant="caption" className={classes.root}>
    Steam locomotive icon (favicon.ico) by{" "}
    <Link href="http://delapouite.com/" target="_blank">
      Delapouite
    </Link>{" "}
    under{" "}
    <Link href="https://creativecommons.org/licenses/by/3.0/" target="_blank">
      CC BY 3.0
    </Link>
  </Typography>
);

export default withStyles(styles)(License);
