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
import Forgot from './components/Display/Forgot';
import * as firebase from 'firebase';

class App extends Component {

  state = {
    boolian: false,
  }

  componentDidMount() {
    var firestore = firebase.auth();
    
    firestore.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("User signedin!", user.email);

      } else {
        // No user is signed in.
        console.log("No user is signed in.")
      }

    })
  }

  render() {

    return (
      <Router>
        <div className="App">
        
          <Navbar></Navbar>
        
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/have" component={Have}/>
            <Route path="/buy" component={Buy}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={SignupFront}/>
            <Route path="/signin" component={SigninFront}/>
            <Route path="/forgot" component={Forgot}/>
          </Switch>
        
        </div>
      </Router>
    );
  }
}

export default App;
