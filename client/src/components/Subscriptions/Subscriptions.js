import React, { Components } from "react";
import "./Subscriptions.css";

const Subscriptions = () => (
    <div className="spoilsContainer">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="spoils-header">
                        <h2>Check out our Spoils Subscriptions:</h2>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Basic Spoils</h4>
                            <h3 className="card-subtitle mb-2">$5/month</h3>
                            <h5>Data Only</h5>
                            <ul>
                                <li>Real-time cards</li>
                                <li>Access to limited number of randomized cards</li>
                                <li>Real-time newsfeed</li>
                            </ul>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Premium Spoils</h4>
                            <h3 className="card-subtitle mb-2">$10/month</h3>
                            <h5>Website &#38; Data</h5>
                            <ul>
                                <li>Real-time cards</li>
                                <li>Access to all cards</li>
                                <li>Real-time newsfeed</li>
                                <li>Bot services for trade signals</li>
                            </ul>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Subscriptions;