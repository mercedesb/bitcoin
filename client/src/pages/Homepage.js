import React, { Component } from "react";

import Jumbotron from "../components/Jumbotron/Jumbotron";
import Overview from "../components/Overview/Overview";
import About from "../components/About/About";
import Subscriptions from "../components/Subscriptions/Subscriptions";
import NewsfeedContainer from "../components/NewsfeedContainer/NewsfeedContainer";
import Newsfeed from "../components/Newsfeed/Newsfeed";
import Footer from "../components/Footer/Footer";

import API from "../utils/API";


class Homepage extends Component {
    state = {
        newsfeed: []
    }

    componentDidMount() {
        API.getNewsData().then(res => {
            const newsfeed = res.data;
            console.log(res.data);
            for (let i = 0; i < newsfeed.length; i++) {
                // console.log("Title: " + newsfeed[i].title);
                // console.log("=================");
                // console.log("Url: " + newsfeed[i].url);
                // console.log("=================");
                // console.log("Date: " + newsfeed[i].date);
            }
            this.setState({
                newsfeed
            });
        });
    }

    render() {
        return (
            <div className="homepage-container">
                <Jumbotron />
                <Overview />
                <About />
                <Subscriptions />
                <NewsfeedContainer>
                    {this.state.newsfeed.map((news, i)=>(
                        <Newsfeed
                            key={i}
                            title={news.title}
                            url={news.url}
                            date={news.date}
                        />
                    ))}
                </NewsfeedContainer>
                <Footer />
            </div>
        )
    }
}

export default Homepage;