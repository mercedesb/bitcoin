import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";

import Homepage from "./pages/Homepage";
import CardsPage from "./pages/CardsPage";


class App extends Component {

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
