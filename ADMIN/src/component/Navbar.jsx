import React from 'react'
import { IoBagAdd } from "react-icons/io5";
import logo from "../assets/logo.png";
import "./CSS/Navbar.css";
const Navbar = ({ setToken }) => {
    return (
        <div className="navbar">
            <img src={logo} alt="Logo" className="logo" />
            <div className="navbar-right">
                <IoBagAdd className="cart-icon" />
                <button onClick={() => setToken('')} className="logout-btn">Logout</button>
            </div>
        </div>
    )
}

export default Navbar