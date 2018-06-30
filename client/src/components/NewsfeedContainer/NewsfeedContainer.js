import React from "react";
import "../Newsfeed/Newsfeed.css";

const NewsfeedContainer = props => (
    <div className="container newsContainer mx-auto">
        <div className="col-md-12 text-left mb-3">
            <h4>Cryptofeed:</h4>
        </div>
        <div className="newsfeedContainer">
            {props.children}
        </div>
    </div>
)

export default NewsfeedContainer;