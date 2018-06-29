import React from "react";
import "./Newsfeed.css";

const Newsfeed = props => (
    <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">{props.title}, {props.url}</h4>
        <hr />
        <p className="mb-0">{props.date}</p>
    </div>
)
        
export default Newsfeed;