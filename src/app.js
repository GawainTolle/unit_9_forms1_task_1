import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./app/components/navBar";

import Main from "./app/layouts/main";
import Login from "./app/layouts/login";
import Users from "./app/layouts/users";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userLol?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
