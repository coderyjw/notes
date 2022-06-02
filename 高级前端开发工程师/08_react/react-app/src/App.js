import React, { Fragment, PureComponent } from "react";
import "./App.css";
// import ListItem from "./cpns/listItemFunc";
import ListItem from "./cpns/listItem";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [
        {
          id: 1,
          title: "sony 65寸高清电视",
          prize: 4000,
          count: 0,
        },
        {
          id: 2,
          title: "华为 Meta30",
          prize: 6000,
          count: 0,
        },
        {
          id: 3,
          title: "华硕 玩家国度笔记本",
          prize: 10000,
          count: 0,
        },
      ],
    };
  }
  render() {
    return (
      <Fragment>
        <h1 className="title">Hello React</h1>
        <button
          onClick={() => this.resetCount()}
          type="button"
          className="btn btn-primary"
        >
          重置
        </button>
        {this.renderList()}
      </Fragment>
    );
  }

  renderList() {
    if (this.state.listData.length === 0) {
      return <div class="text-center">购物车是空的</div>;
    } else {
      return (
        <div className="container">
          {this.state.listData.map((item) => (
            <ListItem
              data={item}
              key={item.id}
              onSubCount={(id) => this.subCount(id)}
              onAddCount={(id) => this.addCount(id)}
            />
          ))}
        </div>
      );
    }
  }

  subCount(id) {
    console.log("sub", id);
    const _list = this.state.listData.map((item) => {
      if (item.id === id) {
        const _item = { ...item };
        _item.count--;
        return _item;
      }
      return item;
    });
    this.setState({
      listData: _list,
    });
  }

  addCount(id) {
    console.log("add", id);
    const _list = this.state.listData.map((item) => {
      if (item.id === id) {
        const _item = { ...item };
        _item.count++;
        return _item;
      }
      return item;
    });
    this.setState({
      listData: _list,
    });
  }
  resetCount() {
    const _list = this.state.listData.map((item) => {
      item.count = 0;
      return item;
    });
    this.setState({
      listData: _list,
    });
  }
}
