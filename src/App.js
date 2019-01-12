import React, { Component } from 'react';
import Home from './components/Home';
import Group from './components/Group';
import Exercise from './components/Exercise';
import Timer from './components/Timer';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/exercise/:id" component={Exercise}/>
          {/* <Route exact path="/group/:groupId" component={Group}/> */}
          {/* <Route path="/" component={Home}/> */}
          <Redirect to="/exercise/foo" />
        </Switch>
      </div>
    );
  }
}

export default App;
