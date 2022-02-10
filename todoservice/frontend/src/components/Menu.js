import React from "react";

const NavMenuBar = () => {
    return(
        <div className={"navbar navbar-inverse navbar-fixed-top"}>
            <div className={"container"}>
                <div className={"navbar-collapse collapse"}>
                    <ul className={"nav navbar-nav navbar-right"}>
                        <li className={"active"}><a href={"#"}>HOME</a></li>
                        <li><a href={"#"}>ABOUT</a></li>
                        <li><a href={"#"}>SERVICES</a></li>
                        <li><a href={"#"}>WORKS</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavMenuBar