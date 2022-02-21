import React from "react";
import {Link, NavLink} from "react-router-dom";
import './css/Navigation.css';


const NavigationBar = () => {
    return (
        <div className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar">
                    <Link className="navbar-brand" to='/'>TO-DO</Link>
                </div>
                <div className="link-box">
                    <ul className="nav-link-custom">
                        <li className="list-inline-item"><NavLink to='/users'>USERS</NavLink></li>
                        <li className="list-inline-item"><NavLink to='/projects'>PROJECTS</NavLink></li>
                        <li className="list-inline-item"><NavLink to='/todos'>TODOS</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;
