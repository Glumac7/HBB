import React from 'react'
import '../../css/Home.css';
import '../../js/HomeJS';
import Typing from 'react-typing-animation';
import $ from "jquery";
import Footer from './Footer';

export default class Home extends React.Component {

  componentDidMount() {
    $(function() {
      $('#scroll-down a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
      });
    });
  }

  render() {
    return (
      <div className="Home-component">
        <div className="bg">
          
          <Typing className="asd">
            <span id="main-headline">there is no <p>friend</p> as loyal as a <p>book.</p></span>
          </Typing>
  
          <section id="scroll-down">
            <a href="#about-container"><span></span></a>
          </section>
  
          <div className="layer"></div>
  
        </div>
  
  
        <div id="about-container" className="container">
          <div className="row">
  
            <div id="about-text" className="col-md-6">
              <h1>About</h1>
              <p>Booker is an app that allows you to create an account in which you can record books that you <b>have</b> or that you want to <b>buy</b>.</p>
            </div>
  
            <div id="about-photos" className="col-md-6">
              <img src='https://images.unsplash.com/photo-1508107506371-193d6e71444c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' style={{  maxWidth: "50%"  }}alt=""/>
              <img src='https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80' style={{  maxWidth: "50%"  }}alt=""/>
            </div>
  
          </div>
        </div>
        <Footer/>
      </div>

      
    )
  }
}

