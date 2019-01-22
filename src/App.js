import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Display/Navbar';
import Home from './components/Display/Home';

class App extends Component {

  
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      
        <Navbar></Navbar>
      
        <Switch>
          <Route path="/" component={Home}/>
        </Switch>
      
        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
