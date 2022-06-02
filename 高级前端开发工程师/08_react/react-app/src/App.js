import { Fragment } from "react";
import "./App.css";
// import ListItem from "./cpns/listItemFunc";
import ListItem from "./cpns/listItem";

const listData = [
  {
    id: 1,
    title: "sony 65寸高清电视",
    prize: 4000,
  },
  {
    id: 2,
    title: "华为 Meta30",
    prize: 6000,
  },
  {
    id: 3,
    title: "华硕 玩家国度笔记本",
    prize: 10000,
  },
];

function renderList() {
  if (listData.length === 0) {
    return <div class="text-center">购物车是空的</div>;
  } else {
    return (
      <div className="container">
        {listData.map((item) => (
          <ListItem data={item} key={item.id} />
        ))}
      </div>
    );
  }
}
function App() {
  return <Fragment>{renderList()}</Fragment>;
}

export default App;
