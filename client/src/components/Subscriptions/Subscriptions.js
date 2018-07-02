import React from "react";
import "./Subscriptions.css";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

const Subscriptions = () => (
    <div className="spoilsContainer mx-auto" id="spoilsContainer">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="spoils-header py-5 text-center">
                        <h2>Check out our Spoils Subscriptions:</h2>
                    </div>
                </div>
            </div>
            <div className="row card-container mx-auto  mb-5 text-center">
                <div className="offset-md-2 col-md-4">
                    <div className="card spoils-card">
                        <div className="card-body">
                            <h4 className="card-title">Basic Spoils</h4>
                            <h3 className="card-subtitle mt-5 mb-2">$5/month</h3>
                            <h5>Data Only</h5>
                            <ul className="text-left mt-5">
                                <li>Real-time cards</li>
                                <li>Real-time newsfeed</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 offst-md-2">
                    <div className="card spoils-card">
                        <div className="card-body">
                            <h4 className="card-title">Premium Spoils</h4>
                            <h3 className="card-subtitle mt-5 mb-2">$10/month</h3>
                            <h5 className="strong">Website &#38; Data</h5>
                            <ul className="text-left mt-5">
                                <li>Real-time cards</li>
                                <li>Real-time newsfeed</li>
                                <li>Bot services for trade signals</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row to-signup d-flex justify-content-center">
                <Link to={routes.SIGN_UP}><button type="button" className="btn learn-more signup-btn">Sign Up!</button></Link>
            </div>
        </div>
    </div>
)

export default Subscriptions;