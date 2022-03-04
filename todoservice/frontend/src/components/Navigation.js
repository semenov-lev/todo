import React from "react"
import {Link, NavLink} from "react-router-dom"
import './css/Navigation.css'


const NavigationBar = (props) => {
    return (
        <div className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar">
                    <Link className="navbar-brand" to='/'>TO-DO</Link>
                </div>
                <div className="link-box">
                    <ul className="nav-link-custom">
                        <li className="list-inline-item">
                            {props.isAuthenticated() ?
                                <button type='button' className="btn btn-secondary btn-lg" onClick={props.logOut}>Выйти
                                    из пользователя {props.username}</button> :
                                <NavLink to='/login'>Войти в аккаунт</NavLink>}
                        </li>
                        <li className="list-inline-item"><NavLink to='/users'>Пользователи</NavLink></li>
                        <li className="list-inline-item"><NavLink to='/projects'>Проекты</NavLink></li>
                        <li className="list-inline-item"><NavLink to='/todos'>Задачи</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default NavigationBar
