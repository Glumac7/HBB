import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import "../../../css/Auth_Style/Signin.css"
import * as firebase from 'firebase';

class SigninFront extends Component {

  state = {
    redirect: false,
    errMessage: "",
    err: false,
    displayXClicked: false,
  }

 

  renderRedirect = () => {
      return <Redirect to='/have' />
  }

  deleteOnClick = (e) => {

    e.preventDefault();
    document.getElementById("signinErrDiv").style.display = "none";
    this.setState({displayXClicked: true})
  }

  loginUsers = () => {
  
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    var firestore = require('firebase/firestore');

    firestore = firebase.auth();

    var rememberMeChecked = document.getElementById("ckb1").checked;

    if(rememberMeChecked) 
    {
      console.log("checked the box!");
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {

        firestore.signInWithEmailAndPassword(email, password)
          .then(() => {

            localStorage.setItem('userEmail', email);

            this.setState({
              redirect: true
            })

          })
          .catch(err => {
            console.log(err)
            if(this.state.displayXClicked)
            {
              document.getElementById("signinErrDiv").style.display = "block";
              this.setState({displayXClicked: false})
            }
            else {
              this.setState({errMessage: err.message, err: true})
            }
            
          });
      })
    }
    else
    {
      console.log("not checked");
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
          firestore.signInWithEmailAndPassword(email, password)
          .then(() => {

            sessionStorage.setItem('userEmail', email);

            this.setState({
              redirect: true
            })

          })
          .catch(err => {
            if(this.state.displayXClicked)
            {
              document.getElementById("signinErrDiv").style.display = "block";
              this.setState({displayXClicked: false})
            }
            else {
              this.setState({errMessage: err.message, err: true})
            }
            
          });
      })
    }
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
                  <Link to="/forgot" className="txt1">
                    Forgot?
                  </Link>
                </div>
              </div>

              {(this.state.err) ? (<div id="signinErrDiv">
                <p id="signinErrP">{this.state.errMessage}</p>
                <button id="signinErrX" onClick={this.deleteOnClick}>X</button>
              </div>) : "" }

              <div className="container-login100-form-btn m-t-17">
                <button onClick={this.loginUsers} id="login-btn" className="login100-form-btn" type="button">
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
      )}
      </>
    )
  }
}

export default SigninFront;
