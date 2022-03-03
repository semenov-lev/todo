import React from "react"


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    handleSubmit(event) {
        console.log(`${this.state.login} ${this.state.password}`)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {
        return (
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase">Вход</h2>
                                    <p className="text-white-50 mb-5">Пожалуйста, введите свой логин и пароль!</p>
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                        <div className="form-outline form-white mb-4">
                                            <input type='text' name='login' className="form-control form-control-lg"
                                                   value={this.state.login}
                                                   onChange={(event) => this.handleChange(event)}/>
                                            <label className="form-label">Логин</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input type='password' name='password'
                                                   className="form-control form-control-lg"
                                                   value={this.state.password}
                                                   onChange={(event) => this.handleChange(event)}/>
                                            <label className="form-label" htmlFor="typePasswordX">Пароль</label>
                                        </div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="">Забыли
                                            пароль?</a></p>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Войти
                                        </button>
                                    </form>
                                </div>
                                <div>
                                    <p className="mb-0">Нет аккаунта? <a href=""
                                                                         className="text-white-50 fw-bold">Зарегистрироваться</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginForm
