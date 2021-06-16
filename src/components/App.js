import React from "react";
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from "react-router-dom";
import Home from '../pages/Home'
import Test from '../pages/Test'
import styled from 'styled-components'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const App = () => {
  return (
    <div className="app">
      <PageWrapper>
        <Switch>
          <Route exact path="/test" component={Test} />
          <Route path="*" component={Home} />
        </Switch>
      </PageWrapper>
    </div>
  );
}

export default hot(App);
