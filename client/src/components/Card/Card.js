import React from "react";
import { PopoverLeft, PopoverRight } from "../Popover/Popover"
import "./Card.css";

const Card = props => (
    <div className="card mb-4 d-flex justify-content-center">
        <div className="card-body">
            <h5 className="card-title"><span className="coin">{props.coin}</span> <i className="fas fa-angle-left ml-1 mr-1"></i> <span className="curr">{props.currency}</span></h5>
            <hr />
            <h6 className="card-subtitle text-muted pt-2 pb-3">Low-High Spread</h6>
            <table>
                <thead>
                    <tr>
                        <th className="pb-4">
                            <PopoverLeft 
                                id={props.id}
                                lexchange={props.lexchange}
                                description={props.lexchangeDescription}
                            />
                        </th>
                        <th className="empty-space pb-4"></th>
                        <th className="pb-4">
                            <PopoverRight 
                                id={props.id}
                                rexchange={props.rexchange}
                                description={props.rexchangeDescription}
                                />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="curr-low-high-values">
                        <td>
                            <h5 className="align-middle pb-2">
                                <span className="curr-logo"><img alt={props.currency} src={require(`../../img/crypto_logos/${props.currency}_logo.svg`)} /></span> <span className="curr-low-value align-middle">{props.lefthandValue}</span>
                            </h5>
                        </td>
                        <td className="empty-space"></td>
                        <td>
                            <h5 className="align-middle pb-2">
                            <span className="curr-logo"><img alt={props.currency} src={require(`../../img/crypto_logos/${props.currency}_logo.svg`)} /></span> <span className="curr-high-value align-middle">{props.righthandValue}</span>
                            </h5>
                        </td>
                    </tr>
                    <tr className="dollar-low-high-values">
                        <td>
                            <h5 className="dollar-value align-middle pt-3">
                                <span className="dollar-logo">$</span> <span className="dollar-low-value">{props.leftusdValue}</span>
                            </h5>
                        </td>
                        <td className="empty-space"></td>
                        <td>
                            <h5 className="dollar-value align-middle pt-3">
                                <span className="dollar-logo">$</span> <span className="dollar-high-value">{props.rightusdValue}</span>
                            </h5>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="badge badge-success profit-badge d-flex justify-content-center text-center mt-4"><h5 className="align-middle my-2">+ $ {props.usdDiff}</h5></div>
        </div>
    </div>
);

export default Card;