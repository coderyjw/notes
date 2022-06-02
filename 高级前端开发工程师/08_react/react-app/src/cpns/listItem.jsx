import React, { Component } from "react";

const product = {
  id: 1,
  title: "sony 65寸高清电视",
  prize: 4000,
};

let count = 0;
class ListItem extends Component {
  state = {};
  render() {
    return (
      <div className="row mb-3">
        <div className="col-6 themed-grid-col">{product.title}</div>
        <div className="col-2 themed-grid-col">¥{product.prize}</div>
        <div className="col-2 themed-grid-col">{this.manageCount()}</div>
      </div>
    );
  }
  manageCount() {
    return count + "个";
  }
}

export default ListItem;
