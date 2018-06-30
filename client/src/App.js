import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";

import Homepage from "./pages/Homepage";
import CardsPage from "./pages/CardsPage";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
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
          <Route exact path="/cards" component={CardsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
