import menuItems from "./sub/MenuItems";
import './Navbar.css'
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isClickedMenuIcon, setClickedMenuIcon] = useState(false);
    
    const handleClick = () => {
        setClickedMenuIcon(!isClickedMenuIcon);
    }
    
    const menuItemsList = menuItems.map((item, id) => (
        <li className="navbar-li" key={id}>
            <NavLink className={item.className} to={item.path} onClick={handleClick}>{item.title}</NavLink>
        </li>
    ))


    return(
        <div className="navbar">
            <div className="navbar-logo"><NavLink to="/" style={{textDecoration:'none', color:'white'}}>StarWars</NavLink><p className="navbar-desc">May the Force be with you.</p></div>
            <div className="menu-icon" onClick={handleClick}>{!isClickedMenuIcon ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}</div>
            <ul className={!isClickedMenuIcon ? "navbar-menu" : "navbar-menu active"}>
                {menuItemsList}
            </ul>
        </div>
    )
}

export default Navbar;