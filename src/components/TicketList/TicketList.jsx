import React, { Component } from "react";
import { List as VirtualList, WindowScroller } from "react-virtualized";
import Ticket from "../Ticket";
import { withStyles, Paper } from "material-ui";

const TICKET_HEIGHT = 68;

const styles = ({ spacing }) => ({
  root: {
    padding: `${spacing.unit}px 0 ${spacing.unit}px ${spacing.unit}px`
  }
});

class TicketList extends Component {
  render() {
    const { items } = this.props;

    return (
      <div>
        { this.renderList() }
        {/* <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <VirtualList
              style={{ outline: 'none' }}
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={items.length}
              rowHeight={TICKET_HEIGHT}
              rowRenderer={this.renderRow}
              scrollTop={scrollTop}
              width={300}
            />
          )}
        </WindowScroller> */}
      </div>
    );
  }

  renderList() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper>
          Номер поезда
        </Paper>
      </div>
    )
  }

  renderRow = ({ index, isScrolling, isVisible, key, parent, style }) => {
    const { items } = this.props;

    return (
      <div key={key} style={style}>
        <Ticket {...items[index]} />
      </div>
    );
  }
}


export default withStyles(styles)(TicketList);
