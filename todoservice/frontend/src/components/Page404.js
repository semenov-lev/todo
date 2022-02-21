import React from "react";
import {Link} from "react-router-dom";


const NotFound404 = () => {
    return (
        <div>
            <h1>Ошибка 404<br/>Страница по адресу «{window.location.href}» не найдена</h1>
            <Link to="/"><h2>Идем домой</h2></Link>
        </div>
    )
}


export default NotFound404;
