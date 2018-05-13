import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = ({ spacing }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    zIndex: 1,
    top: spacing.unit,
    right: spacing.unit
  }
});

const FixedIcons = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
)

export default withStyles(styles)(FixedIcons);
