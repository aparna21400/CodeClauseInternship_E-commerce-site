import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io";
import { FaBoxArchive } from "react-icons/fa6";
import { MdFormatListBulletedAdd } from "react-icons/md";
import "./CSS/Sidebar.css"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink 
                    to="/add" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-option active" : "sidebar-option"
                    }
                >
                    <IoMdAddCircle className="List-icon" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                <NavLink 
                    to="/list" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-option active" : "sidebar-option"
                    }
                >
                    <MdFormatListBulletedAdd className="List-icon" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                <NavLink 
                    to="/orders" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-option active" : "sidebar-option"
                    }
                >
                    <FaBoxArchive className="order-icon" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar