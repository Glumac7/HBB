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
            <span id="main-headline">there is no <span>friend</span> as loyal as a <span>book.</span></span>
          </Typing>
  
          <section id="scroll-down">
            <a href="#about-container"><span></span></a>
          </section>
  
          <div className="layer"></div>
  
        </div>
  
  
        <div id="about-container" className="container">
          <div className="row">
  
            <div className="col-md-6">
              <h1>About</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus possimus odit veritatis magnam sequi qui in, cupiditate quam cum obcaecati inventore ea reprehenderit nihil saepe, omnis repudiandae odio eveniet id!</p>
            </div>
  
            <div id="about-photos" className="col-md-6">
              <img src={  require('../../images/about-1.jpg')  } style={{  maxWidth: "50%"  }}alt=""/>
              <img src={  require('../../images/about-2.jpg')  } style={{  maxWidth: "50%"  }}alt=""/>
            </div>
  
          </div>
        </div>
        <Footer></Footer>
      </div>

      
    )
  }
}

