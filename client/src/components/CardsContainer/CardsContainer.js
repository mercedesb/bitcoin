import React, { Component } from "react";
import Card from "../Card/Card";
import "../CardsContainer/CardsContainer.css";

const CardsContainer = props => (
    <div className="row cards-container">
        {props.children.map(child => {
            return (<div className="col-4 card-container">{child}</div>)
        })}
    </div>
)


export default CardsContainer;