import React from "react";

const NavigationBar = () => {
    return (
        <div className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar">
                    <a className="navbar-brand" href="#">TO-DO</a>
                </div>
                <div className="link-box">
                    <ul className="nav-link-custom">
                        <li className="active list-inline-item"><a href="#">USERS</a></li>
                        <li className="list-inline-item"><a href="#">LINK 1</a></li>
                        <li className="list-inline-item"><a href="#">LINK 2</a></li>
                        <li className="list-inline-item"><a href="#">LINK 3</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;
