import React, { Component } from "react";
// import { Popover } from "react-bootstrap";
// import $ from "jquery"; 
import "./Card.css";

// const popoverLeft = (
//     <Popover id="popover-position-left" title="Popover left">
//         Content goes here.
//     </Popover>
// )

// const popoverRight = (
//     <Popover id="popover-position-right" title="Popover right">
//         Content goes here.
//     </Popover>
// )


const Card = props => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title"><span className="rh-coin">{props.symbol}</span> <i className="fas fa-angle-left"></i> <span className="lh-curr">LTC</span></h5>
            <hr />
            <h6 className="card-subtitle mb-2 text-muted">Low-High Spread</h6>
            <table>
                <thead>
                    <tr>
                        <th>
                            {/* <OverlayTrigger trigger="click" placement="left" overlay={popoverLeft}> */}
                                <button type="button" className="badge badge-danger low-badge">Low</button>
                            {/* </OverlayTrigger> */}
                        </th>
                        <th className="empty-space"></th>
                        <th>
                            <button type="button" className="badge badge-success high-badge">High</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="coin-cash-low-high-values">
                        <td>
                            <h5>
                                <span className="rh-coin-logo"><img alt={props.name} src={require(`../../img/crypto_logos/${props.symbol}_logo.svg`)} /></span> <span className="coin-cash-low-value">200</span>
                            </h5>
                        </td>
                        <td className="empty-space"></td>
                        <td>
                            <h5>
                                <span className="currency-logo">฿</span> <span className="coin-cash-high-value">600</span>
                            </h5>
                        </td>
                    </tr>
                    <tr className="dollar-low-high-values">
                        <td>
                            <h5 className="dollar-value">
                                <span className="dollar-logo">$</span> <span className="dollar-low-value">50</span>
                            </h5>
                        </td>
                        <td className="empty-space"></td>
                        <td>
                            <h5 className="dollar-value">
                                <span className="dollar-logo">$</span> <span className="dollar-high-value">150</span>
                            </h5>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="badge badge-success profit-badge"><h5>+ $ 100</h5></div>
        </div>
    </div>
);

export default Card;