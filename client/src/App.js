import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";

import Homepage from "./pages/Homepage";
import CardsPage from "./pages/CardsPage";
import SignUpPage from "./pages/SignUpPage";
import { firebase } from './firebase';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    console.log(firebase);
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <Router>
        <div className="appContainer">
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/cards" component={CardsPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </div>
      </Router>
    );
  }
}

export default App;
