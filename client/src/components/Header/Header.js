import React, { Component } from "react";
import "./Header.css";

const Header = () => (
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                <img src={require("../../img/brand_logo/coin-crusader_logo.svg")} /> <span className="brand-name">Coin Crusader</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="#">Overview</a>
                    <a class="nav-item nav-link" href="#">About</a>
                    <a class="nav-item nav-link" href="#">Newsfeed</a>
                    <a class="nav-item nav-link" href="#">Log In</a>
                </div>
            </div>
        </nav>
    </header>
)

export default Header;