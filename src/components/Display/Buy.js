import React, { Component } from 'react'
import '../../css/Have.css';
import '../../css/Buy.css';
import Footer from './Footer';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Buy extends Component {

  state = {
    allImages: [],
    searchedImages: [],
    searched: false,
    imgFile: null,
    userEmail: ""
  } 

  handleChange = event => {

    var imgFile = event.target.files[0];
    
    this.setState({imgFile: imgFile});

    document.querySelector("#file + label").style.width = "80%";
    document.getElementById('input-cancel-button').style.width = "20%";
    
    document.getElementById('input-cancel-button').style.display = "inline-block";

  }

  deleteOnClick = (e) => {

    var db = firebase.firestore();
    
    var h1 = e.target.parentElement.parentElement.querySelector('h1').querySelector('b').innerText.replace(/\s+/g, '');;
    var p1 = e.target.parentElement.parentElement.querySelectorAll('p')[0].querySelector('b').innerText.replace(/\s+/g, '');;
    var p2 = e.target.parentElement.parentElement.querySelectorAll('p')[1].querySelector('b').innerText.replace(/\s+/g, '');;
    
    var element = p2 + p1 + h1;

    db.collection('users').doc(this.state.userEmail).collection('buy').doc(element).delete();

    e.target.parentElement.parentElement.style.display = "none";
  }

  handleX = (e) => {
    document.getElementById('file').value = "";
    e.target.style.display = "none";

    
    document.querySelector("#file + label").style.width = "100%";
  }

  getImages = () => {

    //Fix the navbar and make it mobile frandly!

    var db = firebase.firestore();
    
    var allImages = [];
    var userEmail = "";

    if(!sessionStorage.getItem("userEmail"))
    {
      userEmail = localStorage.getItem("userEmail");
    }
    else if(sessionStorage.getItem("userEmail"))
    {
      userEmail = sessionStorage.getItem("userEmail");
    }

    this.setState({userEmail: userEmail});

    db.collection('users').doc(userEmail).collection('buy').get()
      .then(snapshot => {
        try{
          const snapDocs = snapshot.docs;

          snapDocs.forEach(doc => {
            const guide = doc.data();
            allImages.push(guide);
            this.setState({allImages: allImages})
          })
        }
        catch(err) {
          console.log(err)
        }
        
      })
      .catch(err => {
        console.log(err)
      })
        
  }

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

    var db = firebase.firestore();

    var genreSearch = document.getElementById('genres').value;
    var imageSearch = document.getElementById('file').value;
    var writerSearch = document.getElementById('writer').value;
    var titleSearch = document.getElementById('title').value;

    var imageExtension = imageSearch.substring(imageSearch.lastIndexOf('.')+1, imageSearch.length) || imageSearch;

    var imageTrueExtension = imageExtension === "png" ? true : 
                             (imageExtension === "jpg") ? true :
                             (imageExtension === "jpeg") ? true : false

    if(!imageTrueExtension)
    {
      console.log(imageExtension === "png");
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

        var trimGenreSearch = genreSearch.replace(/\s+/g, '');
        var trimWriterSearch = writerSearch.replace(/\s+/g, '');
        var trimTitleSearch = titleSearch.replace(/\s+/g, '');

        var file = document.getElementById('file').files[0];

        Object.defineProperty( file, "name", {
            writable: true,
            configurable: true,
            enumerable: true
          } );

        file.name = trimGenreSearch + trimWriterSearch + trimTitleSearch + "." + imageExtension;

        var usersName = trimGenreSearch + trimWriterSearch + trimTitleSearch;
        
        var storageRef = firebase.storage().ref('book_images/' + file.name);
        var stateLength = this.state.allImages.length + 1;

        storageRef.put(file).then(() => {

          storageRef.getDownloadURL().then((e) => {

            var lastStateElement = this.state.allImages.pop();
            var modifiedLastStateElement = {cover: e, genre: lastStateElement.genre, title: lastStateElement.title, id: usersName, writer: lastStateElement.writer};
            var modifiedState = this.state.allImages;

            modifiedState.push(modifiedLastStateElement);            

            this.setState({allImages: modifiedState});

            db.collection("users").doc(this.state.userEmail+"").collection('buy').doc(usersName+"").set({
              cover: e,
              genre: lastStateElement.genre,
              title: lastStateElement.title,
              id: usersName,
              writer: lastStateElement.writer
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            
          })
          
        });

        
        var newState = this.state.allImages;
        
        newState.push({  cover: './cover.gif', title: titleSearch, id: stateLength, writer: writerSearch, genre: genreSearch  });
        
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
             
          <div id="choose-a-file">
            <input onChange={this.handleChange} type="file" name="file" id="file" className="form-control col-md-3 inputfile inputfile-input" data-multiple-caption="{count} files selected" multiple></input>
            <label htmlFor="file"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;&nbsp;&nbsp;&nbsp;</span></label>
            <button onClick={this.handleX} id="input-cancel-button" style={{display: "none"}}>X</button>

          </div>
          <input id="writer" defaultValue="" type="text" className="form-control col-md-3" placeholder="Writer..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>

          <input id="title" defaultValue="" type="text" className="form-control col-md-3" placeholder="Title..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>
          <div className="input-group-append search-add-buttons">
            <button onClick={this.handleSearch} className="btn search-btn" type="button" id="button-addon2">Search</button>
            <button onClick={this.handleAdd} className="btn" type="button" id="button-addon2">Add</button>
          </div>
        </div>
      </div>
    )
  }

  renderbuy() {

      if(this.state.searched)
      {
        return this.state.searchedImages.map((value, index, items) => {
        
          return (
            <div id="fragment" key={items[index].id}>
              <img src={items[index].cover} alt=""/>
              <h1><b>{items[index].title}</b></h1>
              <div id="writer-genres">
                <p>Writen by: <b>{items[index].writer}</b></p>
                <p>Genre: <b>{items[index].genre}</b></p>
              </div>
              <div id="delete-book">
                <button type="button" onClick={this.deleteOnClick}>X</button>
              </div>
            </div>
          )
        });
      }
      else
      {
        return this.state.allImages.map((value, index, items) => {
        
          return (
            <div id="fragment" key={items[index].id}>
              <img src={items[index].cover} alt=""/>
              <h1><b>{items[index].title}</b></h1>
              <div id="writer-genres">
                <p>Writen by: <b>{items[index].writer}</b></p>
                <p>Genre: <b>{items[index].genre}</b></p>
              </div>
              <div id="delete-book">
                <button type="button" onClick={this.deleteOnClick}>X</button>
              </div>
            </div>
          )
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
              Buy
        </span>
        <div className="container text-center" id="buy-container">
        
            <div className="row" id="filter">{this.renderFilter()}</div>
            <div id="buy">{this.renderbuy()}</div>

        </div>
      </div>
      <Footer/>
      </>
    )
  }
}
