import React, { useContext, useState } from "react";
import './Navbar.css';
import logo from '../assests/logo.png';
import cart_icon from '../assests/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (menuName) => {
        setMenu(menuName);
        setIsMobileMenuOpen(false);
    };

    return (
        <>

            <div className="navbar">
                <div className="nav-logo">
                    <img src={logo} alt="Shopcase Logo" />
                    <p>SHOPCASE</p>
                </div>

                {/* Hamburger Menu */}
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`} role="navigation" aria-label="Main navigation">
                    <li onClick={() => handleMenuClick("Home")}>
                        <Link to='/'>Home</Link>
                        {menu === "shop" && <hr />}
                    </li>
                    <li onClick={() => handleMenuClick("mens")}>
                        <Link to='/mens'>Men</Link>
                        {menu === "mens" && <hr />}
                    </li>
                    <li onClick={() => handleMenuClick("womens")}>
                        <Link to='/womens'>Women</Link>
                        {menu === "womens" && <hr />}
                    </li>
                    <li onClick={() => handleMenuClick("kids")}>
                        <Link to='/kids'>Kids</Link>
                        {menu === "kids" && <hr />}
                    </li>
                </ul>

                <div className="nav-login-cart">
                    <Link to='./login'><button>Login</button></Link>
                    <Link to='./cart'><img src={cart_icon} alt="cart" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>


            {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
        </>
    );
};

export default Navbar;
