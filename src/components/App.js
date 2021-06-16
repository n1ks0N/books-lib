import React from "react";
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from "react-router-dom";
import Home from '../pages/Home'
import Test from '../pages/Test'

const App = () => {
  return (
    <div className="app">
        <Switch>
          <Route exact path="/test" component={Test} />
          <Route path="*" component={Home} />
        </Switch>
    </div>
  );
}

export default hot(App);
