import React from 'react'
import {Link} from 'react-router-dom';
import '../../css/Navbar.css';
import '../../js/NavbarJS';

function burger_icon()
{
	var burger = document.querySelector('.burger-container');

	if (burger.classList) burger.classList.toggle("open");
	else 
	{
	    var classes = burger.className.split(" ");
	    var i = classes.indexOf("open");

		if (i >= 0) 
			classes.splice(i, 1);
	        
		else 
			classes.push("open");
	}
}


export default function Navbar() {

const burger_ico = () => {return burger_icon();}
/*#6922B0*/
  return (
    <div className="Navbar-component">
        {/*
            If loged in view this page, if not, just one, main, page will be displayed without a navbar!
        */}

        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
            <Link className="navbar-brand" to="/"><img alt="Logo" id="logo" src={ require('../../images/logo.png') } /></Link>
                <button id="nav-button" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={burger_ico}>
                    <div className="burger-container">
                        <div className="burger">
                            <span> </span>
                            <span> </span>
                            <span> </span>
                            <span> </span>
                        </div>
                    </div>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto" id="nav-ul">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    </div>
  )
}
