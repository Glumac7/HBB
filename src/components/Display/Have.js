import React, { Component } from 'react'
import '../../css/Have.css';
import '../../js/HaveJS';
import Footer from './Footer';

export default class Have extends Component {

  state = {
    allImages: [],
    searchedImages: [],
    searched: false,
    /*genre: "",
    writer: "",
    title: "",*/
  }

  getImages = () => {
    
    var data_json = require("../../dummy.json");
    
    var allImgs = [];

    for(let i = 0; i < 5; i++) 
    {
      allImgs.push(data_json.data[i]);
    }
    
    this.setState({allImages: allImgs});
  }

  /*
  * 1) Image search not possible. --DONE--
  * 2) Check to see if the file is an image file or some other file --DONE--
  * 3) Add a button next to the 'Choose a file...' button  --DONE--
  *   - Only visible and active when an image has bean uploaded
  *     (Adding an event listener to the input field would be a good idea)
  *   - On click it would make the value of the input field "" and display: none;
  * 4) Adding the add functionality to the handleAdd()
  *    and uploading the image to the image folder for later use
  */

  handleSearch = () =>  {
    var genreSearch = document.getElementById('genres').value;
    var imageSearch = document.getElementById('file').value;
    var writerSearch = document.getElementById('writer').value;
    var titleSearch = document.getElementById('title').value;

    if(imageSearch !== "")
    {
      alert("Image search is not posible.");
      this.setState({searched: false});
      return 0;
    }

    if(genreSearch === "Choose a genre..." && titleSearch === "" && writerSearch === "") //If the inputs are empty...
    {
        this.setState({searched: false});
        return 0;
    }
    else //If at least one of the inputs is filed out...check which one if any are empty...
    {
      var searchedElements;
      var isTitle;
      var isGenre;
      var isWriter;
      /* Just one input field fild out */
      if(genreSearch === "Choose a genre..." && writerSearch === "")
      {
        searchedElements = this.state.allImages.filter( item => {
          isTitle = item.title.toLowerCase() === titleSearch.toLowerCase();
          return (isTitle);
        });
      }
      else if(genreSearch === "Choose a genre..." && titleSearch === "")
      {
        searchedElements = this.state.allImages.filter( item => {
          isWriter = item.writer.toLowerCase() === writerSearch.toLowerCase();
          return (isWriter);
        });
      }
      else if(writerSearch === "" && titleSearch === "")
      {
        searchedElements = this.state.allImages.filter( item => {
          isGenre = item.genre.toLowerCase() === genreSearch.toLowerCase();
          return (isGenre);
        });
      }

      /*-----------------*/

      /* Two input fields fild out */
      else if(genreSearch === "Choose a genre...")
      {
        searchedElements = this.state.allImages.filter( item => {
          isTitle = item.title.toLowerCase() === titleSearch.toLowerCase();
          isWriter = item.writer.toLowerCase() === writerSearch.toLowerCase();
          return (isTitle && isWriter);
        });
      }
      else if(writerSearch === "")
      {
        searchedElements = this.state.allImages.filter( item => {
          isTitle = item.title.toLowerCase() === titleSearch.toLowerCase();
          isGenre = item.genre.toLowerCase() === genreSearch.toLowerCase();
          return (isTitle && isGenre);
        });
      }
      else if(titleSearch === "")
      {
        searchedElements = this.state.allImages.filter( item => {
          isGenre = item.genre.toLowerCase() === genreSearch.toLowerCase();
          isWriter = item.writer.toLowerCase() === writerSearch.toLowerCase();
          return (isGenre && isWriter);
        });
      }

      /*-----------------*/

      /* If all input fields are field out */
      else
      {
        searchedElements = this.state.allImages.filter( item => {
          isTitle = item.title.toLowerCase() === titleSearch.toLowerCase();
          isGenre = item.genre.toLowerCase() === genreSearch.toLowerCase();
          isWriter = item.writer.toLowerCase() === writerSearch.toLowerCase();
          return (isTitle && isGenre && isWriter);
        });
      }

      /*-----------------*/
    }

    this.setState({searchedImages: searchedElements, searched: true});
  }

  handleAdd = () => {
    var genreSearch = document.getElementById('genres').value;
    var imageSearch = document.getElementById('file').value;
    var writerSearch = document.getElementById('writer').value;
    var titleSearch = document.getElementById('title').value;

    var imageExtension = imageSearch.substring(imageSearch.lastIndexOf('.')+1, imageSearch.length) || imageSearch;

    if(imageExtension !== "jpg" 
    || imageExtension !== "jpeg" 
    || imageExtension !== "png")
    {
      alert("Only image files are accepted (jpg, jpeg, png)!");
    }

    if(genreSearch === "Choose a genre..." 
    || titleSearch === "" 
    || writerSearch === ""
    || imageSearch === "") //If the inputs are empty...
    {
      alert("Please fill out all fields.");
    }
    else
    {
      /* Check if it exists */
      var exists = this.state.allImages.filter( item => {
        return (item.title.toLowerCase() === titleSearch.toLowerCase() && item.writer.toLowerCase() === writerSearch.toLowerCase() && item.genre.toLowerCase() === genreSearch.toLowerCase());
      })

      if(exists.length === 0)
      {
        var newState = this.state.allImages;
        newState.push({  cover: "./cover.jpg", title: titleSearch, writer: writerSearch, genre: genreSearch  });
        
        this.setState({ allImages: newState });
      }
      else
      {
        alert("This book already exists, try searching it.");
      }
    }
  }

  renderFilter() {
    return (
      <div id="form">
        
        <div id="filter-container" className="input-group mb-3">
          <select id="genres" defaultValue="" className="form-control col-md-3">
            <option>Choose a genre...</option>
            <option>genre2</option>
            <option>Westerns</option>
            <option>Romance</option>
            <option>Thriller</option>
            <option>Mystery</option>
          </select>          
             
          <input type="file" name="file" id="file" className="form-control col-md-3 inputfile inputfile-input" data-multiple-caption="{count} files selected" multiple></input>
          <label htmlFor="file"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;</span></label>
          <button id="input-cancel-button" style={{width: "44px", borderLeft: "1px solid #ced4da"}}>X</button>

          <input id="writer" defaultValue="" type="text" className="form-control col-md-3" placeholder="Writer..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>

          <input id="title" defaultValue="" type="text" className="form-control col-md-3" placeholder="Title..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>
          <div className="input-group-append">
            <button onClick={this.handleSearch} className="btn search-btn" type="button" id="button-addon2">Search</button>
            <button onClick={this.handleAdd} className="btn" type="button" id="button-addon2">Add</button>
          </div>
        </div>
      </div>
    )
  }

  renderBooks() {
    var element_index = 0;

    if(this.state.searched === false)
    {
      return this.state.allImages.map((value, index, items) => {

        if(items[element_index + 1])
        {
          return (
            <div className="row" key={items[element_index].title}>
              
              <div className="col-md-6">
                <div id="fragment">
                  <img src={items[element_index].cover} alt=""/>
                  <h1>TITLE: {items[element_index].title}</h1>
                  <div>
                    <p>WRITER: {items[element_index].writer}</p>
                    <p>Genres: {items[element_index].genre}</p>
                  </div>
                </div>
              </div>
  
              <div className="col-md-6">
                <div id="fragment">
                  <img src={items[element_index + 1].cover} alt=""/>
                  <h1>TITLE: {items[element_index + 1].title}</h1>
                  <div>
                    <p>WRITER: {items[element_index + 1].writer}</p>
                    <p>Genres: {items[element_index + 1].genre}</p>
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
            <div id="fragment" key={items[index].title}>
              <img src={items[index].cover} alt=""/>
              <h1>TITLE: {items[index].title}</h1>
              <div>
                <p>WRITER: {items[index].writer}</p>
                <p>Genres: {items[index].genre}</p>
              </div>
            </div>
          )
        }
  
        else return null;
        
      });
    }

    else 
    {
      return this.state.searchedImages.map((value, index, items) => {

        if(items[element_index + 1])
        {
          return (
            <div className="row" key={items[element_index].title}>
              
              <div className="col-md-6">
                <div id="fragment">
                  <img src={items[element_index].cover} alt=""/>
                  <h1>TITLE: {items[element_index].title}</h1>
                  <div>
                    <p>WRITER: {items[element_index].writer}</p>
                    <p>Genres: {items[element_index].genre}</p>
                  </div>
                </div>
              </div>
  
              <div className="col-md-6">
                <div id="fragment">
                  <img src={items[element_index + 1].cover} alt=""/>
                  <h1>TITLE: {items[element_index + 1].title}</h1>
                  <div>
                    <p>WRITER: {items[element_index + 1].writer}</p>
                    <p>Genres: {items[element_index + 1].genre}</p>
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
            <div id="fragment" key={items[index].title}>
              <img src={items[index].cover} alt=""/>
              <h1>TITLE: {items[index].title}</h1>
              <div>
                <p>WRITER: {items[index].writer}</p>
                <p>Genres: {items[index].genre}</p>
              </div>
            </div>
          )
        }
  
        else return null;
        
      });
    }
    
  }

  componentDidMount() {
    this.getImages();
  }

  render() {
    return (
      <>
      <div id="Have-component">
        <span className="login100-form-title p-b-51">
                Have
        </span>
        <div className="container text-center" id="books-container">
        
            <div className="row" id="filter">{this.renderFilter()}</div>
            <div id="books">{this.renderBooks()}</div>

        </div>
      </div>
      <Footer/>
      </>
    )
  }
}
