import React, { Component } from "react";
import scrollToComponent from 'react-scroll-to-component';
import "./Jumbotron.css";

const Jumbotron = () => (
    <div className="jumbotron d-flex align-items-center">
        <div className="container">
            <div className="col-md-10 header-message mb-5">
                <h1>Enter the World of Arbitrage.</h1>
                <p>Become an arbitrageur by training yourself with a sharp eye and mind to discern high profit trading between cryptocurrencies and their markets.</p>
            </div>
            <a href="#overviewContainer">
                <button 
                    type="button" 
                    className="btn btn-outline-light learn-more py-2"
                    onClick={() => scrollToComponent(this.overviewContainer, { offset: 0, align: 'bottom', duration: 500, ease:'inExpo'})}>Learn More</button>
            </a>
        </div>
    </div>
)

export default Jumbotron;