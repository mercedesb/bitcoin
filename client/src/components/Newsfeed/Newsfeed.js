import React from "react";
import "./Newsfeed.css";
import { DateTime } from "luxon";
DateTime.local();

const Newsfeed = props => (
    <div className="alert alert-info" role="alert">
        <h5 className="alert-heading article-title">{props.title} <a href={props.url}><img src={require("../../img/misc/link-icon.svg")} className="link-logo" alt="link to article" /></a></h5>
        <hr />
        <p className="mb-0">Published: {DateTime.fromISO(props.date).toLocaleString(DateTime.DATETIME_SHORT)}</p>
    </div>
)
        
export default Newsfeed;