import React from "react";
import { Link } from "react-router-dom";
import scrollToComponent from 'react-scroll-to-component';

import SignOutLink from "../SignOut/SignOut";
import * as routes from "../../constants/routes";
import "./Header.css";


const Header = props => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={routes.HOME}>
                <img className="navbar-brand" src={require("../../img/brand_logo/coin-crusader_logo.svg")} alt="Coin Crusader" /> <span className="brand-name">Coin Crusader</span>
            </Link>
            <Navigation authUser={props.authUser} />
        </nav>
    </header>
)

const Navigation = ({ authUser }) =>
    <div>
        {authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

const NavigationAuth = () =>
    <div className="nav-links d-flex flex-row justify-content-end">
        <div className="nav-item nav-link">
            <Link to={routes.HOME}>Home</Link>
        </div>
        <div className="nav-item nav-link">
            <Link to={routes.CARDS}>Cards</Link>
        </div>
        <div className="nav-item nav-link">
            <Link to="#newsContainer">Newsfeed</Link>
        </div>
        <div className="nav-item nav-link">
            <SignOutLink />
        </div>
    </div>

const NavigationNonAuth = () =>
    <div className="nav-links d-flex flex-row align-items-end">
        <div className="nav-item nav-link">
            <Link to={routes.HOME}>Home</Link>
        </div>
        <div className="nav-item nav-link">
            <a href="#overviewContainer" onClick={() => scrollToComponent(this.overviewContainer, { offset: 100, align: 'bottom', duration: 500, ease: 'inExpo' })}>Overview</a>
        </div>
        <div className="nav-item nav-link">
            <Link to="#aboutContainer">About</Link>
        </div>
        <div className="nav-item nav-link">
            <Link to="#newsContainer">Newsfeed</Link>
        </div>
        <div className="nav-item nav-link">
            <Link to={routes.SIGN_IN}>Sign In</Link>
        </div>
    </div>

export { Header, Navigation };