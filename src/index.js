import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDBmTmvtGACi1XJBz-wx1iZQx_zfqfBcdM",
    serviceAccount: "./serviceAccount.json",
    authDomain: "booker-f7c51.firebaseapp.com",
    databaseURL: "https://booker-f7c51.firebaseio.com",
    projectId: "booker-f7c51",
    storageBucket: "gs://booker-f7c51.appspot.com",
    messagingSenderId: "27282689801",
    appId: "1:27282689801:web:a989ed9ba5368998"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var message = require("./dummy.json");
  var ref = firebase.database().ref().child('node-client');
  var logsRef = ref.child('logs');
  var messagesRef = ref.child("messages");
  var messageRef = messagesRef.push(message);

  logsRef.child(messageRef.key).set(message);
  
  logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
    console.log("added", snap.val());
  });

  logsRef.on('child_removed', function(snap) {
    console.log('removed', snap.val());
  });

  ref.child('logs').on('child_changed', function(snap) {
    console.log("changed", snap.val());
  });

  ref.child('logs').on('value', function(snap) {
    console.log('value', snap.val());
  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
