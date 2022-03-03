import React from "react"
import {Link, NavLink} from "react-router-dom"
import './css/Navigation.css'


const NavigationBar = () => {
    return (
        <div className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar">
                    <Link className="navbar-brand" to='/'>TO-DO</Link>
                </div>
                <div className="link-box">
                    <ul className="nav-link-custom">
                        <li className="list-inline-item"><NavLink to='/login'>ВХОД</NavLink></li>
                        <li className="list-inline-item"> </li>
                        <li className="list-inline-item"><NavLink to='/users'>ПОЛЬЗОВАТЕЛИ</NavLink></li>
                        <li className="list-inline-item"><NavLink to='/projects'>ПРОЕКТЫ</NavLink></li>
                        <li className="list-inline-item"><NavLink to='/todos'>ЗАДАЧИ</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default NavigationBar
