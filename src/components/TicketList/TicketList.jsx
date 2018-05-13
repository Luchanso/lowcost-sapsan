import React, { Component } from "react";
import List from "material-ui/List";
import { List as VirtualList, WindowScroller } from "react-virtualized";
import Ticket from "../Ticket";

const TICKET_HEIGHT = 68;

class TicketList extends Component {
  render() {
    const { items } = this.props;

    return (
      <List>
        <WindowScroller>
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
        </WindowScroller>
      </List>
    );
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
export default TicketList;
