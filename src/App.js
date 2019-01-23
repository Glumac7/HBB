import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Display/Navbar';
import Have from './components/Display/Have';
import Buy from './components/Display/Buy';
import Home from './components/Display/Home';
import Logout from './components/Auth/Logout/Logout';
import SignupFront from './components/Auth/Signup/SignupFront';
import SigninFront from './components/Auth/Signin/SigninFront';

class App extends Component {

  state = {
    isLogedin: false
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        
          <Navbar isLogedin={this.state.isLogedin}></Navbar>
        
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/have" component={Have}/>
            <Route path="/buy" component={Buy}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={SignupFront}/>
            <Route path="/signin" component={SigninFront}/>
          </Switch>
        
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
