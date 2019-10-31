import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Display/Navbar';
import Have from './components/Display/Have';
import Buy from './components/Display/Buy';
import Home from './components/Display/Home';
import Logout from './components/Auth/Logout/Logout';
import SignupFront from './components/Auth/Signup/SignupFront';
import SigninFront from './components/Auth/Signin/SigninFront';
import * as firebase from 'firebase';

class App extends Component {

  state = {
    isLogedin: false
  }

  render() {

    //Checks if the User is loged in or not and displayes the corresponing message
    var firestore = firebase.auth();

    firestore.onAuthStateChanged(user => {
      if(user){
        console.log(user.uid);
      }
      else
      {
        console.log("0");
      }
    })

    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
