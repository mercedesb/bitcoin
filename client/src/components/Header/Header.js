import React from "react";
import { Link } from "react-router-dom";

import SignOutLink from "../SignOut/SignOut";
import * as routes from "../../constants/routes";
import "./Header.css";


const Header = props => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                <img src={require("../../img/brand_logo/coin-crusader_logo.svg")} alt="Coin Crusader" /> <span className="brand-name">Coin Crusader</span>
            </a>
            <Navigation authUser={props.authUser} />
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#overviewContainer">Overview</a>
                    <a className="nav-item nav-link" href="#aboutContainer">About</a>
                    <a className="nav-item nav-link" href="#">Newsfeed</a>
                    <span className="nav-item nav-link"><Link to={routes.SIGN_IN}>Sign In</Link></span>
                    <SignOutLink/>
                </div>
            </div> */}
        </nav>
    </header>
)

const Navigation = ({ authUser }) =>
    <div className="d-flex justify-content-end">
        { authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

const NavigationAuth = () =>
        <ul>
            <li className="nav-item nav-link"><Link to={routes.HOME}>Home</Link></li>
            <li className="nav-item nav-link"><Link to={routes.CARDS}>Cards</Link></li>
            <li><a className="nav-item nav-link" href="#newsContainer">Newsfeed</a></li>
            <li className="nav-item nav-link"><Link to={routes.ACCOUNT}>Account</Link></li>
            <li className="nav-item nav-link"><SignOutLink /></li>
        </ul>

const NavigationNonAuth = () =>
        <ul>
            <li className="nav-item nav-link"><Link to={routes.HOME}>Home</Link></li>
            <li><a className="nav-item nav-link" href="#overviewContainer">Overview</a></li>
            <li><a className="nav-item nav-link" href="#aboutContainer">About</a></li>
            <li><a className="nav-item nav-link" href="#newsContainer">Newsfeed</a></li>
            <li className="nav-item nav-link"><Link to={routes.SIGN_IN}>Sign in</Link></li>
        </ul>

export { Header, Navigation };