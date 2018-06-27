import React, { Components } from "react";
import "./About.css";

const About = () => (
    <div className="aboutContainer">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="about-header">
                        <h2>What does Coin Crusader do?</h2>
                        <p>Coin Crusader is a flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling him Big Bear. We never had the chance to. Maybe it was the eleven months he spent in the womb. The doctor said there were claw marks on the walls of her uterus. Yeah, well, have you seen the new Mustang?</p>
                    </div>
                </div>
            </div>
            <div className="row talk-points-container">
                <table>
                    <tr>
                        <td><img src={require("../../img/brand_logo/coin-crusader_logo.svg")} /></td>
                        <td><img src={require("../../img/brand_logo/coin-crusader_logo.svg")} /></td>
                        <td><img src={require("../../img/brand_logo/coin-crusader_logo.svg")} /></td>
                    </tr>
                    <tr>
                        <td><h3>Main Point 1.</h3></td>
                        <td><h3>Main Point 2.</h3></td>
                        <td><h3>Main Point 3.</h3></td>
                    </tr>
                    <tr>
                        <td><p>Those options are already baked in with this model shoot me an email clear blue water but we need distributors to evangelize the new line to local markets, but fire up your browser. Strategic high-level 30,000 ft view. Drill down re-inventing the wheel at the end of the day but curate imagineer, or to be inspired is to become creative.</p></td>
                        <td><p>Those options are already baked in with this model shoot me an email clear blue water but we need distributors to evangelize the new line to local markets, but fire up your browser. Strategic high-level 30,000 ft view. Drill down re-inventing the wheel at the end of the day but curate imagineer, or to be inspired is to become creative.</p></td>
                        <td><p>Those options are already baked in with this model shoot me an email clear blue water but we need distributors to evangelize the new line to local markets, but fire up your browser. Strategic high-level 30,000 ft view. Drill down re-inventing the wheel at the end of the day but curate imagineer, or to be inspired is to become creative.</p></td>
                    </tr>
                </table>
            </div>
            <div className="row button-link-to-about">
                <button type="button" className="btn btn-outline-dark learn-more">See Spoils</button>
            </div>
        </div>
    </div>
)

export default About;