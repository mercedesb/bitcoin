import React, { Component } from "react";
import CardsContainer from "../components/CardsContainer/CardsContainer";
import Card from "../components/Card/Card";
import cryptocoinsJSON from "../json/cryptocoins.json";

import API from "../utils/API";

class CardsPage extends Component {
    state = {
        cryptocoinsJSON
    }

    componentDidMount() {
        API.getCardData().then(res => {
            this.setState({
                cards: res.data
            });
        });
    }

    render() {
        return (
            <CardsContainer>
                {this.state.cryptocoinsJSON.map((coin, i) => (
                    <Card
                        key={i}
                        name={coin.name}
                        symbol={coin.symbol}
                        logo={coin.logo}
                    >
                    </Card>
                ))}
            </CardsContainer>
        );
    }
}


export default CardsPage;