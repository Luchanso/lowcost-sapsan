import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = ({ palette }) => ({
  root: {
    color: palette.text.primary
    // textDecoration: 'inherit',
    // '&:hover': {
    //   textDecoration: 'underline',
    // },
  }
})

const Link = ({ children, classes, ...linkProps }) => {
  return (
    <a {...linkProps} className={classes.root}>
      { children }
    </a>
)
};

export default withStyles(styles)(Link);
