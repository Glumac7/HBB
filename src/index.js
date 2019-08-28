import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDBmTmvtGACi1XJBz-wx1iZQx_zfqfBcdM",
    authDomain: "booker-f7c51.firebaseapp.com",
    databaseURL: "https://booker-f7c51.firebaseio.com",
    projectId: "booker-f7c51",
    storageBucket: "gs://booker-f7c51.appspot.com",
    messagingSenderId: "27282689801",
    appId: "1:27282689801:web:a989ed9ba5368998"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
