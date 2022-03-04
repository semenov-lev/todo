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
        localStorage.setItem('username', username)
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({token: token}, () => this.loadData())
    }

    getTokenFromCookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({token: token}, () => this.loadData())
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logOut() {
        this.setToken('')
        localStorage.clear()
    }

    getHeaders() {
        let headers = {
            'content-type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Bearer ' + this.state.token
        }
        return headers
    }

    loadData() {
        const headers = this.getHeaders()

        axios.get(getUrl(USERS_URL), {headers}).then(response => {
            const users = response.data
            this.setState({
                users: users,
            })
        }).catch(error => {
            console.log(error)
            this.setState({users: {}})
        })

        axios.get(getUrl(PROJECTS_URL), {headers}).then(response => {
            const projects = response.data
            this.setState({
                projects: projects,
            })
        }).catch(error => {
            console.log(error)
            this.setState({projects: {}})
        })

        axios.get(getUrl(TODOS_URL), {headers}).then(response => {
            const todos = response.data
            this.setState({
                todos: todos,
            })
        }).catch(error => {
            console.log(error)
            this.setState({todos: {}})
        })
    }

    componentDidMount() {
        this.getTokenFromCookies()
        this.setState({username: localStorage.getItem('username')})
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
                            <Route path='/'
                                   element={this.isAuthenticated() ? <WelcomePage/> : <Navigate to="/login"/>}/>
                            <Route path='/login' element={this.isAuthenticated() ? <Navigate to="/"/> : <LoginForm
                                getAuthData={(username, password) => this.getAuthData(username, password)}/>}/>
                            <Route path='/users'
                                   element={this.isAuthenticated() ? <UsersPage page={this.state.users}/> :
                                       <Navigate to="/login"/>}/>
                            <Route path='/projects'
                                   element={this.isAuthenticated() ? <ProjectsPage page={this.state.projects}/> :
                                       <Navigate to="/login"/>}/>
                            <Route path='/project/:id' element={this.isAuthenticated() ?
                                <ProjectDetail getProject={(id) => this.getProject(id)}
                                               project={this.state.project}/> : <Navigate to="/login"/>}/>
                            <Route path='/todos'
                                   element={this.isAuthenticated() ? <TodosPage page={this.state.todos}/> :
                                       <Navigate to="/login"/>}/>
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
