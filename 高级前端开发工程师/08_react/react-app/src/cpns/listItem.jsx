import React, { Component } from "react";
import style from "./listItem.module.css";
let count = 0;
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row mb-3">
        <div className={`col-6 themed-grid-col ${style.title}`}>
          {this.props.data.title}
        </div>
        <div className="col-2 themed-grid-col">¥{this.props.data.prize}</div>
        <div className={"col-2 themed-grid-col" + (count ? "" : "-s")}>
          <button
            onClick={(e) => this.subCount(e)}
            type="button"
            className="btn btn-primary"
          >
            -
          </button>
          {this.manageCount()}
          <button
            onClick={this.addCount}
            type="button"
            className="btn btn-primary"
          >
            +
          </button>
        </div>
      </div>
    );
  }
  manageCount() {
    return count + "个";
  }
  subCount(e) {
    console.log({ e },this);
  }

  addCount(e) {}

  doSomethingWithCount() {
    if (count < 0) {
      return 0;
    }
  }
}

export default ListItem;
