import React, { Component } from 'react';
import "../../css/Auth_Style/Signin.css";
import * as firebase from 'firebase';

export default class Forgot extends Component {

    resetPassword = () => {
        var email = document.getElementById("login-email").value;
    
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                console.log('successful');
            })
            .catch(err => {
                console.log("error: " + err)
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
                                Reset Password
                                </span>

                                
                                <div className="wrap-input100 validate-input m-b-16" data-validate = "E-Mail is required">
                                    <input id="login-email" className="input100" type="email" name="e-mail" placeholder="E-Mail"></input>
                                    <span className="focus-input100"></span>
                                </div>


                                <div className="container-login100-form-btn m-t-17">
                                    <button style={{width: "100%"}} onClick={this.resetPassword} id="login-btn" className="login100-form-btn" type="button">
                                    Reset Password
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
