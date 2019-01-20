import React, { Component } from 'react';
import Exercises from './components/Exercises';
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
          <Route path="/" component={Exercises}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
