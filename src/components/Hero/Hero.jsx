import React from "react";
import './Hero.css';
import hand_icon from '../assests/hand_icon.png';
import arrow_icon from '../assests/arrow.png';
import women_hero from '../assests/woman-hero.png';

const Hero = () => {
    return (
        <div className="hero ">
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" className="responsive-img" />
                    </div>
                    <p>collections</p>
                    <p>For everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <img src={women_hero} alt="" className="responsive-img"/>

            </div>
        </div>
    )
}
export default Hero;