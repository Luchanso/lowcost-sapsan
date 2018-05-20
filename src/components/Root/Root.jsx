import React from 'react';
import { Grid, withStyles, withTheme } from "material-ui";
import Filters from "../Filters";
import TicketList from "../TicketList";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  }
});

const Root = ({ classes, theme }) => (
  <Grid container spacing={theme.spacing.unit}>
    <Grid item xs={9}>
      <TicketList />
    </Grid>
    <Grid item xs={3}>
      <Filters />
    </Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(Root);
