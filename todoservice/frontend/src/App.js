import React from "react"
import axios from "axios"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Cookies from "universal-cookie"
import jwt_decode from "jwt-decode"

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
import ProjectForm from "./components/ProjectForm";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const USERS_URL = 'users/'
const PROJECTS_URL = 'projects/'
const TODOS_URL = 'todos/'
const TOKEN_URL = 'token/'
const TOKEN_REFRESH_URL = 'token/refresh/'
const cookies = new Cookies()

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
            refresh: '',
            username: '',
        }
    }

    getProject(id) {
        const headers = this.getHeaders()
        axios.get(getUrl(`projects/${id}/`), {headers})
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => {
                console.log(error)
                this.setState({project: {}})
            }
        )
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(getUrl(`projects/${id}/`), {headers})
            .then(response => {
                this.loadData()
            }).catch(error => {
                console.log(error)
                this.setState({projects: {}})
            }
        )
    }

    createProject(name, description, deadline_timestamp, users, rep_url) {
        const headers = this.getHeaders()
        const data = {
            name: name,
            description: description,
            deadline_timestamp: deadline_timestamp,
            users: users,
            rep_url: rep_url
        }
        axios.post(getUrl(PROJECTS_URL), data, {headers}).then(response => {

            this.loadData()
        }).catch(error => {
                console.log(error)
                this.setState({projects: {}})
            }
        )
    }

    getAuthData(username, password) {
        axios.post(getUrl(TOKEN_URL), {username: username, password: password}).then(response => {
            this.setTokenData(response.data['access'], response.data['refresh'])
        }).catch(error => alert('Неверный логин или пароль'))
        this.setState({username: username})
        localStorage.setItem('username', username)
    }

    setTokenData(token, refresh = null) {
        cookies.set('token', token)
        if (refresh !== null) {
            cookies.set('refresh', refresh)
            this.setState({refresh: refresh})
        }
        this.setState({token: token}, () => this.loadData())
    }

    refreshToken() {
        let refresh = this.state.refresh

        axios.post(getUrl(TOKEN_REFRESH_URL), {refresh: refresh}).then(response => {
            let token = response.data['access']
            console.log(`New token: ${token}`)
            this.setTokenData(token)
        }).catch(error => {
            console.log(error)
        })
    }

    getDataFromCookies() {
        this.setState({token: cookies.get('token'), refresh: cookies.get('refresh')}, () => {
            console.log(`Current token: ${this.state.token ? this.state.token : "None"}`)
            console.log(`Current refresh: ${this.state.refresh ? this.state.refresh : "None"}`)
            this.tokenAliveCheck()
        })
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    tokenAliveCheck() {
        let token = this.state.token

        if (this.state.token) {
            let decoded_token = jwt_decode(token)
            let current_date = new Date()

            if (decoded_token.exp * 1000 < current_date.getTime()) {
                console.log('Token is expired')
                this.refreshToken()
            } else {
                console.log('Token is alive')
                this.loadData()
            }
        }
    }

    logOut() {
        this.setTokenData('', '')
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

        this.setState({username: localStorage.getItem('username')})
    }

    componentDidMount() {
        this.getDataFromCookies()
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
                                   element={this.isAuthenticated() ? <WelcomePage/> :
                                       <Navigate to="/login"/>}/>
                            <Route path='/login'
                                   element={this.isAuthenticated() ? <Navigate to="/"/> :
                                       <LoginForm
                                           getAuthData={(username, password) =>
                                               this.getAuthData(username, password)}/>}/>
                            <Route path='/users'
                                   element={this.isAuthenticated() ?
                                       <UsersPage page={this.state.users}/> :
                                       <Navigate to="/login"/>}/>
                            <Route path='/projects'
                                   element={this.isAuthenticated() ?
                                       <ProjectsPage page={this.state.projects}
                                                     deleteProject={(id) => this.deleteProject(id)}/> :
                                       <Navigate to="/login"/>}/>
                            <Route path='/projects/create'
                                   element={this.isAuthenticated() ?
                                       <ProjectForm users={this.state.users.results}
                                                    createProject={(name,
                                                                    description,
                                                                    deadline_timestamp,
                                                                    users, rep_url
                                                    ) => this.createProject(name,
                                                        description,
                                                        deadline_timestamp,
                                                        users,
                                                        rep_url)}/> :
                                       <Navigate to="/login"/>}/>
                            <Route path='/project/:id' element={this.isAuthenticated() ?
                                <ProjectDetail getProject={(id) => this.getProject(id)}
                                               project={this.state.project}/> : <Navigate to="/login"/>}/>
                            <Route path='/todos'
                                   element={this.isAuthenticated() ?
                                       <TodosPage page={this.state.todos}/> :
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
