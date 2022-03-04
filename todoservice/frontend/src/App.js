import React from "react"
import axios from "axios"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Cookies from "universal-cookie"

import './App.css'
import WelcomePage from "./components/Welcome"
import UsersPage from "./components/Users"
import NavigationBar from "./components/Navigation"
import Footer from "./components/Footer"
import NotFound404 from "./components/Page404"
import ProjectsPage from "./components/Projects"
import ProjectDetail from "./components/Project"
import TodosPage from "./components/Todos"
import LoginForm from "./components/Login"


const DOMAIN = 'http://127.0.0.1:8000/api/'
const USERS_URL = 'users/'
const PROJECTS_URL = 'projects/'
const TODOS_URL = 'todos/'
const TOKEN_URL = 'token/'
// const TOKEN_REFRESH_URL = 'token/refresh/'


const getUrl = (url) => {
    return `${DOMAIN}${url}`
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {},
            projects: {},
            project: {},
            todos: {},
            token: '',
            username: '',
        }
    }

    getProject(id) {
        axios.get(getUrl(`projects/${id}/`))
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    getAuthData(username, password) {
        axios.post(getUrl(TOKEN_URL), {username: username, password: password}).then(response => {
            this.setToken(response.data['access'])
        }).catch(error => alert('Неверный логин или пароль'))
        this.setState({username: username})
        localStorage.setItem('username', JSON.stringify(username))
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({token: token})
    }

    getTokenFromCookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({token: token})
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logOut() {
        this.setToken('')
    }

    loadData() {
        axios.get(getUrl(USERS_URL)).then(response => {
            const users = response.data
            this.setState({
                users: users,
            })
        }).catch(error => console.log(error))

        axios.get(getUrl(PROJECTS_URL)).then(response => {
            const projects = response.data
            this.setState({
                projects: projects,
            })
        }).catch(error => console.log(error))

        axios.get(getUrl(TODOS_URL)).then(response => {
            const todos = response.data
            this.setState({
                todos: todos,
            })
        }).catch(error => console.log(error))

        this.setState({username: JSON.parse(localStorage.getItem('username'))})
    }

    componentDidMount() {
        this.getTokenFromCookies()
        this.loadData()
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <div className={'navigation-bar'}>
                        <NavigationBar isAuthenticated={() => this.isAuthenticated()} logOut={() => this.logOut()}
                                       username={this.state.username}/>
                    </div>
                    <div className={'context'}>
                        <Routes>
                            <Route path='/' element={<WelcomePage/>}/>
                            <Route path='/login' element={this.isAuthenticated() ? <Navigate to="/"/> : <LoginForm
                                getAuthData={(username, password) => this.getAuthData(username, password)}/>}/>
                            <Route path='/users' element={<UsersPage page={this.state.users}/>}/>
                            <Route path='/projects' element={<ProjectsPage page={this.state.projects}/>}/>
                            <Route path='/project/:id' element={<ProjectDetail getProject={(id) => this.getProject(id)}
                                                                               project={this.state.project}/>}/>
                            <Route path='/todos' element={<TodosPage page={this.state.todos}/>}/>
                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>
                    </div>
                    <div className={'footer'}>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </>
        )
    }
}


export default App
