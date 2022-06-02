import React, { Component } from "react";

let count = 0;
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row mb-3">
        <div className="col-6 themed-grid-col">{this.props.data.title}</div>
        <div className="col-2 themed-grid-col">¥{this.props.data.prize}</div>
        <div className={"col-2 themed-grid-col" + (count ? "" : "-s")}>
          {this.manageCount()}
        </div>
      </div>
    );
  }
  manageCount() {
    return count + "个";
  }
}

export default ListItem;
