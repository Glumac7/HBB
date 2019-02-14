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
        for(let i = 0; i < 7; i++) 
        {
          allImgs.push(res.data.memes[i]);
        }
        
        this.setState({allImages: allImgs});
      });
  }

  componentDidMount() {
    this.getImages();
  }

  render() {
    var element_index = 0;

    return (
      <div className="container text-center" id="Have-component">
        {

            this.state.allImages.map((value, index, items) => {

              if(items[element_index + 1])
              {
                return (
                  <div className="row" key={items[element_index].id}>
                    <div className="col-md-6" id="fragment" >
                      <img className="img-thumbnail" src={items[element_index].url} alt=""/>
                      <h1>ID: {items[element_index].id}</h1>
                      <p>NAME: {items[element_index].name}</p>
                    </div>

                    <div className="col-md-6" id="fragment">
                      <img className="img-thumbnail" src={items[element_index + 1].url} alt=""/>
                      <h1>ID: {items[element_index + 1].id}</h1>
                      <p>NAME: {items[element_index + 1].name}</p>
                    </div>

                    {element_index= element_index + 2}

                  </div>
                )
              }

              else if(items[index + 1] == undefined && index % 2 == 0)
              {
                return (
                  <div id="fragment" key={items[index].id}>
                    <img className="img-thumbnail" src={items[index].url} alt=""/>
                    <h1>ID: {items[index].id}</h1>
                    <p>NAME: {items[index].name}</p>
                  </div>
                )
              }
            })
          
          
        }
      </div>
    )
  }
}
