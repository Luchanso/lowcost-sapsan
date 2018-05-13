import React, { Component } from "react";
import { compose } from "ramda";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import { withStyles } from "material-ui/styles";

const styles = ({ palette }) => ({
  price: {
    color: palette.secondary.main
  },
  root: {
    width: 300
  }
});

class Ticket extends Component {
  render() {
    const { date, train, price, classes } = this.props;

    return (
      <div className={classes.root}>
        <ListItem>
          <ListItemText primary={train} secondary={date} />
          <ListItemSecondaryAction>
            <ListItemText
              primary={`${price} ₽`}
              classes={{
                primary: classes.price
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

export default compose(withStyles(styles))(Ticket);
