import React from "react";
import { withStyles } from "material-ui/styles";

const styles = ({ palette }) => ({
  root: {
    color: palette.text.primary
    // textDecoration: 'inherit',
    // '&:hover': {
    //   textDecoration: 'underline',
    // },
  }
});

const Link = ({ children, classes, ...linkProps }) => {
  const resultProps = { ...linkProps };
  if (linkProps.target === "_blank") {
    resultProps.rel = "noopener";
  }

  return (
    <a {...resultProps} className={classes.root}>
      {children}
    </a>
  );
};

export default withStyles(styles)(Link);
