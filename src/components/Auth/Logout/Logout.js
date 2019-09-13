import React, { Component } from 'react'
import * as firebase from 'firebase'

export default class Logout extends Component {

  logout = () => {
    var firestore = require('firebase/firestore');

    firestore = firebase.auth();

    firestore.signOut()
      .then(() => {
        console.log("user signed out")
      });
  }

  //Continue with the video playliste: https://www.youtube.com/watch?v=JWeoQn6KB0o&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=7

  componentDidMount() {
    this.logout()
  }
  
  render() {
    return (
      <div>
        <h1>Logout</h1>
      </div>
    )
  }
}
