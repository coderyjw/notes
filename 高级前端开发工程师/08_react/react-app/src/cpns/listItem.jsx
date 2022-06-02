import React, { PureComponent } from "react";
import style from "./listItem.module.css";
class ListItem extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log({ nextProps, nextState }, this.state);
  //   if (this.state.count === nextState.count) return false;
  //   return true;
  // }
  constructor(props) {
    super(props);
    console.log("Item step1: constructor");
  }

  componentDidMount() {
    console.log("Item step3: render");
  }

  render() {
    console.log("Item step2: render");
    return (
      <div className="row mb-3">
        <div className={`col-6 themed-grid-col ${style.title}`}>
          {this.props.data.title}
        </div>
        <div className="col-2 themed-grid-col">¥{this.props.data.prize}</div>
        <div
          className={
            "col-2 themed-grid-col" + (this.props.data.count ? "" : "-s")
          }
        >
          {this.props.data.count > 0 ? (
            <button
              onClick={() => this.props.onSubCount(this.props.data.id)}
              type="button"
              className="btn btn-primary"
            >
              -
            </button>
          ) : (
            ""
          )}
          {this.manageCount()}
          <button
            onClick={() => this.props.onAddCount(this.props.data.id)}
            type="button"
            className="btn btn-primary"
          >
            +
          </button>
        </div>
        <div className="col-2 themed-grid-col">
          ¥{this.props.data.prize * this.props.data.count}
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
      count: 10,
    });
  }

  doSomethingWithCount() {
    if (this.props.data.count < 0) {
      return 0;
    } else {
      return this.props.data.count;
    }
  }
}

export default ListItem;
