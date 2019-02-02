import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import CreateEdit from "./CreateEdit";
import Home from "./Home";
import NotificationContainer from "./NotificationManager";

class App extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/edit/:id?" component={CreateEdit} />
        <NotificationContainer />
      </>
    );
  }
}
export default App;
