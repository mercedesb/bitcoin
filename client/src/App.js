import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CardsContainer from "./components/CardsContainer/CardsContainer";
import Card from "./components/Card/Card";
import cryptocoinsJSON from "./json/cryptocoins.json";


class App extends Component {
  state = {
    cryptocoinsJSON
  }

  componentWillMount() {
    var coinLogo = cryptocoinsJSON.map(coin => console.log(coin.logo));
    // this.setState ({
    //   cryptocoinsJSON: coinLogo
    // })
  }

  render() {
    return (
      <div className="appContainer">
        <Header />
        <CardsContainer>
          {this.state.cryptocoinsJSON.map((coin, i) => (
            <Card
              key={i}
              name={coin.name}
              symbol={coin.symbol}
              logo={coin.logo}
            />
          ))}
        </CardsContainer>
      </div>
    );
  }
}

export default App;
