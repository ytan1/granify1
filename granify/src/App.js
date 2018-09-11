import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header/Header' 
import Add from './Add/Add' 
import Display from './Display/Display' 
import Delete from './Delete/Delete' 
import { Route, Switch } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='add' component={Add} ></Route>
          <Route path='diplay' component={Display} ></Route>
          <Route path='delete' component={Delete} ></Route>
          <Route component={Display}></Route>
        </Switch>
        
      </div>
    );
  }
}

export default App;
