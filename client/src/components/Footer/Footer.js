import React from "react";

const Footer = () => (
    <footer className="navbar-dark bg-dark">
        <div className="container">
            <div className="row py-3">
                <div className="col-md-4">
                    <p>Follow Us On:</p>
                    <div className="social-media">
                        <i className="fab fa-facebook"></i>
                        <a href="https://github.com/m0bi/bitcoin"><i className="fab fa-github"></i></a>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
                <div className="col-md-4">
                    <p>Collaborators:</p>
                    <a href="https://github.com/m0bi"><p className="collaborators">ezra@coincrusader.io</p></a>
                    <a href="https://github.com/racheljlee"><p className="collaborators">rae@coincrusader.io</p></a>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer;