import React from "react";
import "./Overview.css";

const Overview = () => (
    <div className="overviewContainer mx-auto" id="overviewContainer">
        <div className="container text-center">
            <div className="row">
                <div className="col-md-12">
                    <div className="overview-header py-5">
                        <h2>What is Arbitrage?</h2>
                        <p>Arbitrage in the cryptocurrency world is the art of simultaneously buying and selling currency in different exchange markets to take advantage of the differing prices. In turn, it allows traders to find the best opportunities for a high profit. In order to understand "crypto-arbitrage," we must first understand the design and purpose of cryptocurrency and blockchains.</p>
                    </div>
                </div>
            </div>
            <div className="overview-cryptocurrency">
                <div className="row text-center">
                    <div className="offset-md-2 col-md-8 offset-md-2">
                        <img className="overview-img" src={require("../../img/brand_logo/coin-crusader_logo.svg")} alt="Icons" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-left mb-3">
                        <h4>Cyryptocurrency</h4>
                    </div>
                </div>
                <div className="row text-left mb-5">
                    <div className="col-md-6">
                        <p>Cryptocurrency is an idea that takes root in the ideas of the late 90s and early 2000s (see Stephenson’s <a href="https://www.amazon.com/Cryptonomicon-Neal-Stephenson/dp/0060512806">Cryptonomicon</a>) when anonymity and security of information became a concern to those in the computing industry. What was once only theoretical knowledge, actually found a foothold in contemporary culture with the cryptocurrency explosion related to the worth of Bitcoin on local exchange markets.</p>
                        <p>The currencies themselves are valued as a commodity in the same way that gold or silver is valued. In certain areas of the internet, these coins themselves may be used in exchange for goods and services, and, furthermore, may be traded on exchanges against coins of different values.</p>
                        <p>These markets provide centralized locations where assets may be traded; however there is a weakness to</p>
                    </div>
                    <div className="col-md-6">
                        <p>this methodology. First, the centralization of the market makes it a target for hackers. The blockchain system on which cryptocurrencies are based on is advanced enough that without some point to attack, owners' funds are generally safe. But if they are stored on an open market exchange, they may be compromised. This is why it is recommended that traders find a personal cold-storage wallet to store the funds that are not being actively traded.</p>
                        <p>The inherent weakness to said methodology—the centralization of the exchange—has been overcome by a number of different services that offer direct translation between coins, providing algorithms that find buyers, sellers, and market values. This type of exchange, however, has a different set of economic rules and principles that guide its operation.</p>
                    </div>
                </div>
            </div>
            <div className="overview-blockchain">
                <div className="row text-center">
                    <div className="offset-md-2 col-md-8 offset-md-2">
                        <img className="overview-img" src={require("../../img/brand_logo/coin-crusader_logo.svg")} alt="Icons" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-left mb-3">
                        <h4>Blockchains</h4>
                    </div>
                </div>
                <div className="row text-left mb-5">
                    <div className="col-md-6">
                        <p>Blockchain is the technology upon which Bitcoin is based. To provide a currency without a centralized authority, a decentralized network was devised. This network supports the transaction ledger. In turn, this ledger records every transaction from the coin's introduction to its present day position. Mining the blockchain allows for the creation of new coins, in the same way that mining the earth for gold produces new gold. The way bitcoin specifically was set up, was that there is a finite number of coins that can be mined from the blockchain, and once those coins are all mined, then there are no new coins left to circulate. This methodology can create a supply shortage and increases the price of the coin.</p>
                    </div>
                    <div className="col-md-6">
                        <p>Not all coins operate on the same blockchain. A graphical representation of the different algorithms and their corresponding coins can be found at <a href="https://coin360.io/">coin360</a>. These differences create competition on a number of levels. If the algorithms upon which the coins are based are not sufficiently secure, then the ledgers may be attacked by malicious agents. This problem arises again for smaller networks, which can be more easily taken over by bad actors. The form of this attack is called "a 51% attack," where 51% of the network's nodes are taken over by a hacking group, allowing the coercion of the network in order for the hackers to empty people’s wallets. To monitor the availability of this type of attack on a specific coin, to provide a good idea of the coin's stability relative to bad actors, see <a href="https://www.crypto51.app/">crypto51</a>.</p>
                    </div>
                </div>
            </div>
            <div className="trading-arbitrage-overview">
                <div className="row">
                    <div className="col-md-12 text-left mb-3">
                        <h4>Trading &amp; Arbitrage</h4>
                    </div>
                </div>
                <div className="row text-left mb-5">
                    <div className="col-md-6">
                        <p>Arbitrage takes advantage of price differences between markets in the cryptocurrency space. To capitalize on the matching imbalance, you must strike a number of deals. The purpose of Coin Crusader is to help you identify arbitrage opportunities in order to help you make the right combination of deals.</p>
                        <p>Consider the following example: there are two exchanges Alpha and Beta listing a product Widget on their marketplace. Alpha is listing widget at $7,690.00 and Beta is listing widget for $7,540.00. Neither Alpha nor Beta talk with each other, they are independent systems whose prices are controlled by the supply and demand for the widgets within each system independently. When you arbitrate between Alpha and Beta, you are buying widgets on the Beta system and selling them on the Alpha system. If this kind of movement of assets happens enough times, the price difference between Alpha and Beta will eventually disappear. Because more supply is being offered to Alpha, the price will start to lower. Because of increased demand, the price on Beta will begin to rise. Once these two prices equalize, no more arbitrage opportunities will be available.</p>
                    </div>
                    <div className="col-md-6">
                        <p>This type of trading method has two pitfalls. First, the exchanges do not like it when their resources are removed. Because of this, they levy fees on withdrawing widgets. When preparing for arbitration between exchanges, it is always best to check the withdrawal fees on the low priced exchange. The arbitrage value must absorb the fees and still return a profit for the trade to be actionable. Once you have sold your coin on the high exchange, you must then withdraw the profit to an independent wallet where you may exchange it for fiat currency. Therefore, the withdrawal fees on both exchanges must be monitored. It is often the case that a third trade may be made on the high exchange to mitigate the withdrawal fees, but one should be careful that this auxiliary trade does not eliminate profit. Finally, one must consider the fees charged for exchanging cryptocurrency for fiat currency. Thus, an arbitrage trade has fees levyd at four points: first, there is a fee for exchanging fiat currency for cryptocurrency. Then there is the withdrawal fee on the low exchange, the withdrawal fee on the high exchange, and the fee for exchanging cryptocurrency to fiat currency. Not all of these fees are large but they must be considered when making a decision to execute a trade.</p>
                    </div>
                </div>
            </div>
            <div className="row to-about d-flex justify-content-center">
                <a href="#aboutContainer"><button type="button" className="btn btn-outline-dark learn-more">Why Coin Crusader?</button></a>
            </div>
        </div>
    </div>
)

export default Overview;