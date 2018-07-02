import React from "react";
import { auth } from "../../firebase";

const SignOutLink = () =>
    <span className="nav-item nav-link" onClick={auth.doSignOut}>Sign Out</span>

export default SignOutLink;