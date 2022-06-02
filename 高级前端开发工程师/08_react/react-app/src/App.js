import { Fragment } from "react";
import "./App.css";
import ListItem from "./cpns/listItem";
function App() {
  return (
    <Fragment>
      <div className="container">
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
      <div className="container">
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </Fragment>
  );
}

export default App;
