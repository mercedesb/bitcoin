import React from "react";
import Newsfeed from "../Newsfeed/Newsfeed";

const NewsfeedContainer = props => (
    <div className="container newsfeedContainer mx-auto">
        {props.children}
    </div>
)

export default NewsfeedContainer;