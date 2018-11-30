import React, { Component } from 'react';
import Home from './components/Home';
import Group from './components/Group';
import Exercise from './components/Exercise';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/"><h1>thing</h1></Link>
        <Switch>
          <Route exact path="/exercise/:exerciseId" component={Exercise}/>
          <Route exact path="/group/:groupId" component={Group}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
