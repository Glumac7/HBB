import React, { Component } from 'react'
import '../../css/Have.css';
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

        for(let i = 20; i < 31; i++) 
        {
          allImgs.push(res.data.memes[i]);
        }
        
        this.setState({allImages: allImgs});

        
      });
  }

  renderFilter() {
    return (
      <div id="form">
        
        <div className="input-group mb-3">
          <select id="genres" className="form-control col-md-3">
            <option>Choose a genre...</option>
            <option>Fantasy</option>
            <option>Westerns</option>
            <option>Romance</option>
            <option>Thriller</option>
            <option>Mystery</option>
          </select>

          <input type="text" className="form-control col-md-3" placeholder="Writer..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>

          <input type="text" className="form-control" placeholder="Title..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>
          <div className="input-group-append">
            <button className="btn" type="button" id="button-addon2">Search</button>
            <button className="btn" type="button" id="button-addon2">Add</button>
          </div>
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
                <img src={items[element_index].url} alt=""/>
                <h1>TITLE: {items[element_index].id}</h1>
                <div>
                  <p>WRITER: {items[element_index].name}</p>
                  <p>Genres: {items[element_index].name}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div id="fragment">
                <img src={items[element_index + 1].url} alt=""/>
                <h1>TITLE: {items[element_index + 1].id}</h1>
                <div>
                  <p>WRITER: {items[element_index + 1].name}</p>
                  <p>Genres: {items[element_index + 1].name}</p>
                </div>
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
            <img src={items[index].url} alt=""/>
            <h1>TITLE: {items[index].id}</h1>
            <div>
              <p>WRITER: {items[index].name}</p>
              <p>Genres: {items[index].name}</p>
            </div>
          </div>
        )
      }

      else return null;
      
    });
    
  }

  componentDidMount() {
    this.getImages();
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
