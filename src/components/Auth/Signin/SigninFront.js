import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import "../../../css/Auth_Style/Signin.css"
import * as firebase from 'firebase';

export default class SigninFront extends Component {

  /*
  --USE THE FUNCTION BELOW TO SETUP WHEN CERTAIN PAGES WILL BE DISPLAYED--
    auth.onAuthStateChanged(user => {
      if(user){
        console.log("user logged in", user)
      }
      else
      {
        console.log('user logged out)
      }
    })
  */

  addUsers = () => {
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    var firestore = require('firebase/firestore');

    firestore = firebase.auth();

    firestore.signInWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred)
      })

  }

  render() {
    return (
      <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-50 p-b-90">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-51">
                Login
              </span>

              
              <div className="wrap-input100 validate-input m-b-16" data-validate = "E-Mail is required">
                <input id="login-email" className="input100" type="email" name="e-mail" placeholder="E-Mail"></input>
                <span className="focus-input100"></span>
              </div>
              
              
              <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                <input id="login-password" className="input100" type="password" name="pass" placeholder="Password"></input>
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

              <div className="container-login100-form-btn m-t-17">
                <button onClick={this.addUsers} id="login-btn" className="login100-form-btn" type="button">
                  Login
                </button>

                <Link to="/signup" id="signup-btn" className="login100-form-btn">
                  Sign up
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
      </>
    )
  }
}
