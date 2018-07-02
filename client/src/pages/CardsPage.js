import React, { Component } from "react";
import CardsContainer from "../components/CardsContainer/CardsContainer";
import Card from "../components/Card/Card";
import descriptionsJSON from "../json/descriptions.json";

import API from "../utils/API";

class CardsPage extends Component {
    state = {
        cards: [],
        symbol: ""
    }
    
    componentDidMount() {

        API.getCardData().then(res => {
            const cards = res.data;
            console.log("cards", cards);
            for (let i = 0; i < cards.length; i++) {
                cards[i].coin = cards[i].coincurrency.match(/^[^_]+(?=_)/g)[0];
                cards[i].currency = cards[i].coincurrency.match(/(?<=_).*/g)[0];
                cards[i].lexchangeDescription = descriptionsJSON[cards[i].lexchange];
                cards[i].rexchangeDescription = descriptionsJSON[cards[i].rexchange];
 
                // cards[i].lexchangeURL = descriptionsJSON[cards[i].lexchangeDescription[1]];
                // cards[i].rexchangeURL = descriptionsJSON[cards[i].rexchange[1]];
            }
            this.setState({
                cards
            });
        });
    }

    render() {
        return (
            <CardsContainer>
                {this.state.cards.map((card, i) => (
                    <Card
                        key={i}
                        id={i}
                        coin={card.coin}
                        currency={card.currency}
                        lefthandValue={Number(card.lhs).toFixed(3)}
                        righthandValue={Number(card.rhs).toFixed(3)}
                        currencyDiff={Number(card.diff).toFixed(3)}
                        leftusdValue={card.usdlhs}
                        rightusdValue={card.usdrhs}
                        usdDiff={card.usddiff}
                        lexchange={card.lexchange}
                        rexchange={card.rexchange}
                        lexchangeDescription={card.lexchangeDescription.description}
                        rexchangeDescription={card.rexchangeDescription.description}
                        >
                    </Card>
                ))}
            </CardsContainer>
        );
    }
}


export default CardsPage;