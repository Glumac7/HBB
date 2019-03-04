import React, { Component } from 'react'
import '../../css/Have.css';
import $ from "jquery";
import '../../js/HaveJS';

export default class Have extends Component {

  state = {
    allImages: [],
  }

  getImages() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => {
        
        var allImgs = [];

        for(let i = 0; i < 10; i++) 
        {
          allImgs.push(res.data.memes[i]);
        }
        
        this.setState({allImages: allImgs});

      });
  }

  renderFilter() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
        <div className="input-group-append">
          <button className="btn" type="button" id="button-addon2">Button</button>
        </div>
      </div>
    )
  }

  renderBooks() {
    var element_index = 0;

    return this.state.allImages.map((value, index, items) => {

      if(items[element_index + 1])
      {
        return (
          <div className="row" key={items[element_index].id}>
            
            <div className="col-md-6">
              <div id="fragment">
                <img className="img-thumbnail" src={items[element_index].url} alt=""/>
                <h1>ID: {items[element_index].id}</h1>
                <p>NAME: {items[element_index].name}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div id="fragment">
                <img className="img-thumbnail" src={items[element_index + 1].url} alt=""/>
                <h1>ID: {items[element_index + 1].id}</h1>
                <p>NAME: {items[element_index + 1].name}</p>
              </div>
            </div>

            <div style={{display: "none"}}>{element_index = element_index + 2}</div>

          </div>
        )
      }

      else if(items[index + 1] === undefined && index % 2 === 0)
      {
        return (
          <div id="fragment" key={items[index].id}>
            <img className="img-thumbnail" src={items[index].url} alt=""/>
            <h1>ID: {items[index].id}</h1>
            <p>NAME: {items[index].name}</p>
          </div>
        )
      }

      else return null;
      
    });
  }

  componentDidMount() {
    this.getImages();
    /* JQuery */
    

    $(document).ready( () => {
      var height = 0;

      $("#books .col-md-6").each(function(){
           height = $(this).height(); 
      });
      console.log(height);
      $("#fragment").height(height);
    })
  }

  render() {
    return (
      <div id="Have-component">
        <div className="container text-center" id="books-container">
            
            <div className="row" id="filter">{this.renderFilter()}</div>
            <div id="books">{this.renderBooks()}</div>

        </div>
      </div>
    )
  }
}
