import React from "react"
import {Link} from "react-router-dom"


const NotFound404 = () => {
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h1>Ошибка 404<br/></h1>
                                    <p>Страница по адресу «{window.location.href}» не найдена<br/><br/></p>
                                    <Link to="/"><h2>Перейти на главную страницу</h2></Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NotFound404
