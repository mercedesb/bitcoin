import React, { Component } from "react";
import "./Jumbotron.css";

const Jumbotron = () => (
    <div className="jumbotron d-flex align-items-center">
        <div className="container">
            <div className="col-md-10 header-message">
                <h1>Enter the World of Arbitrage.</h1>
                <p>lorem ipsum blah blah bitcoin kucoin ehtereum binance changelly stuff goes here hey there you like some money? huehuehue</p>
                <button type="button" className="btn btn-outline-light learn-more">Learn More</button>
            </div>
        </div>
    </div>
)

export default Jumbotron;