import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Overview from "../components/Overview/Overview";
import About from "../components/About/About";
import Subscriptions from "../components/Subscriptions/Subscriptions";
import NewsfeedContainer from "../components/NewsfeedContainer/NewsfeedContainer";
import Newsfeed from "../components/Newsfeed/Newsfeed";

class Homepage extends Component {
    render() {
        return (
            <div className="homepage-container">
                <Jumbotron />
                <Overview />
                <About />
                <Subscriptions />
                    {/* <Newsfeed /> */}
            </div>
        )
    }
}

export default Homepage;