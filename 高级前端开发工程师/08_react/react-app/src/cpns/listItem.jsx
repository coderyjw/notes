import React, { Component } from "react";
import style from "./listItem.module.css";
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div className="row mb-3">
        <div className={`col-6 themed-grid-col ${style.title}`}>
          {this.props.data.title}
        </div>
        <div className="col-2 themed-grid-col">¥{this.props.data.prize}</div>
        <div
          className={"col-2 themed-grid-col" + (this.state.count ? "" : "-s")}
        >
          <button
            onClick={(e) => this.subCount(e)}
            type="button"
            className="btn btn-primary"
          >
            -
          </button>
          {this.manageCount()}
          <button
            onClick={(e) => this.addCount(e)}
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
    return this.doSomethingWithCount() + "个";
  }
  subCount(e) {
    this.setState({
      count: this.state.count - 1,
    });
  }

  addCount(e) {
    this.setState({
      count: this.state.count + 1,
    });
  }

  doSomethingWithCount() {
    if (this.state.count < 0) {
      return 0;
    } else {
      return this.state.count;
    }
  }
}

export default ListItem;
