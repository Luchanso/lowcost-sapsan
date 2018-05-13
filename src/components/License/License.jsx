import React, { Fragment } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Link from "../Link";

const styles = {
  root: {
    margin: 20
  }
};

const License = ({ classes }) => (
  <Fragment>
    <Typography variant="caption" className={classes.root}>
      Steam locomotive icon (favicon.ico) by{" "}
      <Link href="http://delapouite.com/" target="_blank">
        Delapouite
      </Link>{" "}
      under{" "}
      <Link href="https://creativecommons.org/licenses/by/3.0/" target="_blank">
        CC BY 3.0
      </Link>
      <br />
      Site by{" "}
      <Link href="https://github.com/Luchanso" target="_blank">
        Loutchansky Oleg
      </Link>{" "}
      under{" "}
      <Link
        href="https://github.com/Luchanso/lowcost-sapsan/blob/master/LICENSE"
        target="_blank"
      >
        MIT License
      </Link>
    </Typography>
    <Typography variant="caption" className={classes.root} />
  </Fragment>
);

export default withStyles(styles)(License);
