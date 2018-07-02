import React from "react";
import "./About.css";

const About = () => (
    <div className="aboutContainer mx-auto" id="aboutContainer">
        <div className="container text-center">
            <div className="row">
                <div className="col-md-12">
                    <div className="about-header py-5">
                        <h2>What does Coin Crusader do?</h2>
                        <p>The cryptocurrency market lacks equilibrium. With severe instability, the differences in prices between markets may reach astronomical levels. Arbitrage seeks to profit on this instability by providing trades which stabilize the market.</p>
                    </div>
                </div>
            </div>
            <div className="about">
                <div className="row text-center">
                    <div className="offset-md-2 col-md-8 offset-md-2">
                        <img className="about-img" src={require("../../img/brand_logo/coin-crusader_logo.svg")} alt="Icons" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-left mb-3">
                        <h4>What we do:</h4>
                    </div>
                </div>
                <div className="row text-left mb-5">
                    <div className="col-md-6">
                        <p>Cryptocurrency is an idea that takes root in the ideas of the late 90s and early 2000s (see See Stephenson’s Cryptonomicon) when anonymity and security of information became a concern to those in the computing industry. What was once only theoretical knowledge, actually found a foothold in contemporary culture with the cryptocurrency explosion related to the worth of Bitcoin on local exchange markets.</p>
                        <p>The currencies themselves are valued as a commodity in the same way that gold or silver is valued. In certain areas of the internet, these coins themselves may be used in exchange for goods and services, and, furthermore, may be traded on exchanges against coins of different values.</p>
                        <p>These markets provide centralized locations where assets may be traded; however there is a weakness to</p>
                    </div>
                    <div className="col-md-6">
                        <p>this methodology. First, the centralization of the market makes it a target for hackers. The blockchain system on which cryptocurrencies are based on is advanced enough that without some point to attack, owners' funds are generally safe. But if they are stored on an open market exchange, they may be compromised. This is why it is recommended that traders find a personal cold-storage wallet to store the funds that are not being actively traded.</p>
                        <p>The inherent weakness to said methodology—the centralization of the exchange—has been overcome by a number of different services that offer direct translation between coins, providing algorithms that find buyers, sellers, and market values. This type of exchange, however, has a different set of economic rules and principles that guide its operation.</p>
                    </div>
                </div>
            </div>
            <div className="row to-subscriptions d-flex justify-content-center">
                <a href="#spoilsContainer"><button type="button" className="btn btn-outline-dark learn-more">See Spoils</button></a>
            </div>
        </div>
    </div>
)

export default About;