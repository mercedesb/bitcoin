import React from "react";
import ReactDOM from "react-dom";
import "./Header.css";
// import Login from "../components/Login/Login";

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                <img src={require("../../img/brand_logo/coin-crusader_logo.svg")} alt="Coin Crusader" /> <span className="brand-name">Coin Crusader</span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#overviewContainer">Overview</a>
                    <a className="nav-item nav-link" href="#">About</a>
                    <a className="nav-item nav-link" href="#">Newsfeed</a>
                    <a className="nav-item nav-link" href="#">Log In</a>
                </div>
            </div>
        </nav>
    </header>
)

export default Header;