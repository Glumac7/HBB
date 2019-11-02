import React, { Component } from 'react'
import "../../../css/Auth_Style/Signup.css";
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-dom';


export default class SignupFront extends Component {

  state = {
    redirect: false,
    errMessage: "",
    err: false,
    displayXClicked: false
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/signin' />
    }
  }

  deleteOnClick = (e) => {

    e.preventDefault();
    document.getElementById("signupErrDiv").style.display = "none";
    this.setState({displayXClicked: true})
  }

  addUsers = () => {

    const username = document.getElementById('username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    var db = firebase.firestore();
    var forState = this;

    var firestore = require('firebase/firestore');

    firestore = firebase.auth();
    //One collection "users" and in each user(id is username that was given by signup)
    //a 'books' collection
    //where the user can upload as much books as he pleases.

    firestore.createUserWithEmailAndPassword(email, password)
    .then(() => {

      console.log("1");
      

      db.collection("users").doc(email).set({
        username: username,
        eMail: email,
      })
      .then(function() {
        forState.setState({
          redirect: true
        })
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

    })
    .catch(err => {
      if(this.state.displayXClicked)
      {
        document.getElementById("signupErrDiv").style.display = "block";
        this.setState({displayXClicked: false})
      }
      else {
        this.setState({errMessage: err.message, err: true})
      }
      
    });

  }

  render() {
    return (
      <>
      { (this.state.redirect) ? this.renderRedirect() : (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-50 p-b-90">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-51">
                SIGN UP
              </span>

              
              <div className="wrap-input100 validate-input m-b-16" data-validate = "Username is required">
                <input id="username" className="input100" type="text" name="username" placeholder="Username"></input>
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-16" data-validate = "E-Mail is required">
                <input id="signup-email" className="input100" type="email" name="e-mail" placeholder="E-Mail"></input>
                <span className="focus-input100"></span>
              </div>
              
              <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                <input id="signup-password" className="input100" type="password" name="pass" placeholder="Password"></input>
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                <input className="input100" type="password" name="rep-pass" placeholder="Repeat Password"></input>
                <span className="focus-input100"></span>
              </div>
              
              <div className="flex-sb-m w-full p-t-3 p-b-24">
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"></input>
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div>
                  <a href="http://localhost:3000" className="txt1">
                    Forgot?
                  </a>
                </div>
              </div>

              {(this.state.err) ? (<div id="signupErrDiv">
                <p id="signupErrP">{this.state.errMessage}</p>
                <button id="signupErrX" onClick={this.deleteOnClick}>X</button>
              </div>) : "" }

              <div className="container-login100-form-btn m-t-17">
                <button onClick={this.addUsers} id="signup-btn2" className="login100-form-btn" type="button">
                  Sign up
                </button>

                <Link to="/signin" id="login-btn2" className="login100-form-btn">
                  Login
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
      )}
      </>
    )
  }
}
