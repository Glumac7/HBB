import React from 'react'
import {Link} from 'react-router-dom';
import '../../css/Nav, Footer/Navbar.css';
import '../../js/NavbarJS';
import * as firebase from 'firebase';

function burger_icon() //Controls the burger icon animation
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

class Navbar extends React.Component {

    state = {
        isLogedin: false
    }
    
    logitTrue = () => {
        this.setState({isLogedin: true});
    }
    logitFalse = () => {
        this.setState({isLogedin: false});
    }
    
    componentDidMount() {
        var firestore = firebase.auth();

        
        firestore.onAuthStateChanged(user => {
        
            if (user) {
            // User is signed in.
                console.log("User signedin! " , user);
                this.logitTrue();

            } else {
            // No user is signed in.
                this.logitFalse();
                console.log("No user is signed in.")
            }

        })
    }

    render() {
        var burgerIcon = () => burger_icon();

        return (
            <nav className="navbar navbar-expand-lg fixed-top">
                {
                   (window.location.pathname === "/forgot" || window.location.pathname === "/signin" || window.location.pathname === "/signup") ? (<div className="container">
                            <Link to="/"><div className="navbar-brand"><img className="navbar-brand" alt="Logo" id="logo" src={ require('../../images/logo.png') } /></div></Link></div>) : (this.state.isLogedin) ? (
                        
                            <div className="container">
                            <Link to="/"><div className="navbar-brand"><img className="navbar-brand" alt="Logo" id="logo" src={ require('../../images/logo.png') } /></div></Link>

                                <button id="nav-button" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={burgerIcon}>
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
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/have">Have</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/buy">Buy</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link id="logout" className="nav-link" onClick={this.handleClick} to="/logout">Log Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        

                    ) : (

                        
                            <div className="container">
                            <Link to="/"><div className="navbar-brand"><img className="navbar-brand" alt="Logo" id="logo" src={ require('../../images/logo.png') } /></div></Link>

                                <button id="nav-button" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" onClick={burgerIcon}>
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
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signin" onClick={this.handleClick} >Sign In</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        
                        
                    )
                }
            </nav>
        )
    }
}

export default Navbar;