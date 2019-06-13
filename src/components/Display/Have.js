import React, { Component } from 'react'
import '../../css/Have.css';
import '../../js/HaveJS';

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

  handleSearch = () =>  {
    var genreSearch = document.getElementById('genres').value;
    var writerSearch = document.getElementById('writer').value;
    var titleSearch = document.getElementById('title').value;

    //Add the filter functionality so that you could filter the search results!
    
    /*this.setState(
      {
        genre: genreSearch,
        writer: writerSearch,
        title: titleSearch
      });*/

      var obj_search = {}; //Obj that fild with searching data

      if(genreSearch === "Choose a genre..." && titleSearch === "" && writerSearch === "") //If the inputs are empty...
      {
          this.setState({searched: false});
          alert("Pleas fill the inputs before you wish to search them.");
          return 0;
      }
      else //If at least one of the inputs is filed out...check which one if any are empty...
      {
        /* Just one input field fild out */
        if(genreSearch === "Choose a genre..." && writerSearch === "")
        {
          obj_search.title = titleSearch;
        }
        else if(genreSearch === "Choose a genre..." && titleSearch === "")
        {
          obj_search.writer = writerSearch;
        }
        else if(writerSearch === "" && titleSearch === "")
        {
          obj_search.genre = genreSearch;
        }

        /*-----------------*/

        /* Two input fields fild out */
        else if(genreSearch === "Choose a genre...")
        {
          obj_search = { writer: writerSearch, title: titleSearch }
        }
        else if(writerSearch === "")
        {
          obj_search = { genre: genreSearch, title: titleSearch }
        }
        else if(titleSearch === "")
        {
          obj_search = { genre: genreSearch, writer: writerSearch }
        }

        /*-----------------*/

        /* If all input fields are field out */
        else
        {
          obj_search = {
            genre: genreSearch,
            writer: writerSearch,
            title: titleSearch
          }
        }

        /*-----------------*/
      }

      var allSearchBooks = [];

      this.state.allImages.map(item => {

        let genreCompare = item.genre.toLowerCase() === genreSearch.toLowerCase();
        let titleCompare = item.title.toLowerCase() === titleSearch.toLowerCase();
        let writerCompare = item.writer.toLowerCase() === writerSearch.toLowerCase();

        if (titleCompare || writerCompare || genreCompare)
        {
          allSearchBooks.push(item);
        }
        return 0;
      });

      this.setState({searchedImages: allSearchBooks, searched: true});
  }

  renderFilter() {
    return (
      <div id="form">
        
        <div className="input-group mb-3">
          <select id="genres" defaultValue="" className="form-control col-md-3">
            <option>Choose a genre...</option>
            <option>Fantasy</option>
            <option>Westerns</option>
            <option>Romance</option>
            <option>Thriller</option>
            <option>Mystery</option>
          </select>

          <input id="writer" defaultValue="" type="text" className="form-control col-md-3" placeholder="Writer..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>

          <input id="title" defaultValue="" type="text" className="form-control" placeholder="Title..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>
          <div className="input-group-append">
            <button onClick={this.handleSearch} className="btn" type="button" id="button-addon2">Search</button>
            <button onChange={this.handleAdd} className="btn" type="button" id="button-addon2">Add</button>
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
      <div id="Have-component">
        <div className="container text-center" id="books-container">
            
            <div className="row" id="filter">{this.renderFilter()}</div>
            <div id="books">{this.renderBooks()}</div>

        </div>
      </div>
    )
  }
}
