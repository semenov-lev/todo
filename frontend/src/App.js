import React from "react"
import axios from "axios"
import {BrowserRouter, Navigate, Route, Routes, useParams} from "react-router-dom"
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
import ToDoForm from "./components/ToDoForm";
import ToDoDetail from "./components/ToDo";


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
            project_id: '',
            todos: {},
            todo: {},
            todo_id: '',
            token: '',
            refresh: '',
            username: '',
            user_id: '',
            search_field: ''
        }
    }

    handleChange(event) {
        this.setState(
            {
                search_field: event.target.value
            }
            // , () => console.log(event.target.value)
        )
    }

    handleSubmit(event) {
        if (this.state.search_field) {
            let project_page = this.state.projects
            project_page.results = this.state.projects.results.filter((project) =>
                project.name.toLowerCase().includes(this.state.search_field.toLowerCase()))
            this.setState({projects: project_page}
                // , () => console.log("Успешно отфильтровалось")
            )
            event.preventDefault();
        }
    }

    handleCancel(event) {
        this.loadData()
        event.preventDefault();
    }

    setCurrentProject(id) {
        if (this.state.project_id !== id) {
            this.setState({project_id: id}, () => this.loadData())
        }
    }

    setCurrentToDo(id) {
        if (this.state.todo_id !== id) {
            this.setState({todo_id: id}, () => this.loadData())
        }
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(getUrl(`projects/${id}/`), {headers})
            .then(response => {
                this.loadData()
                alert("Успешно удалено!")
            }).catch(error => {
                console.log(error)
                alert("Произошло что-то непонятное!\nГде-то допущена ошибка!")
                this.setState({projects: {}})
            }
        )
    }

    deleteToDo(id) {
        const headers = this.getHeaders()
        axios.delete(getUrl(`todos/${id}/`), {headers})
            .then(response => {
                this.loadData()
                alert("Успешно удалено!")
            }).catch(error => {
                console.log(error)
                alert("Произошло что-то непонятное!\nГде-то допущена ошибка!")
                this.setState({todos: {}})
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
            alert("Успешно создано!")
        }).catch(error => {
                console.log(error)
                alert("Произошло что-то непонятное!\nГде-то допущена ошибка!")
            }
        )
    }

    updateProject(name, description, deadline_timestamp, users, rep_url, status) {
        const headers = this.getHeaders()
        const data = {
            name: name,
            description: description,
            deadline_timestamp: deadline_timestamp,
            users: users,
            rep_url: rep_url,
            status: status
        }
        axios.put(getUrl(`projects/${this.state.project_id}/`), data, {headers}).then(response => {
            this.loadData()
            alert("Успешно обновлено!")
        }).catch(error => {
                console.log(error)
                alert("Произошло что-то непонятное!\nГде-то допущена ошибка!")
            }
        )
    }

    createToDo(name, description, created_by, project) {
        const headers = this.getHeaders()
        const data = {
            name: name,
            description: description,
            created_by: created_by,
            project: project
        }
        axios.post(getUrl(TODOS_URL), data, {headers}).then(response => {
            this.loadData()
            alert("Успешно создано!")
        }).catch(error => {
                console.log(error)
                alert("Произошло что-то непонятное!\nГде-то допущена ошибка!")
            }
        )
    }

    updateToDo(name, description, created_by, project) {
        const headers = this.getHeaders()
        const data = {
            name: name,
            description: description,
            created_by: created_by,
            project: project
        }
        axios.put(getUrl(`todos/${this.state.todo_id}/`), data, {headers}).then(response => {
            this.loadData()
            alert("Успешно обновлено!")
        }).catch(error => {
                console.log(error)
                alert("Произошло что-то непонятное!\nГде-то допущена ошибка!")
            }
        )
    }

    getAuthData(username, password) {
        axios.post(getUrl(TOKEN_URL), {username: username, password: password}).then(response => {
            this.setTokenData(response.data['access'], response.data['refresh'])
        }).catch(error => alert('Неверный логин или пароль'))
        this.setState({username: username}, () => localStorage.setItem('username', username))
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
            // console.log(`New token: ${token}`)
            this.setTokenData(token)
        }).catch(error => {
            console.log(error)
        })
    }

    getDataFromCookies() {
        this.setState({token: cookies.get('token'), refresh: cookies.get('refresh')}, () => {
            // console.log(`Current token: ${this.state.token ? this.state.token : "None"}`)
            // console.log(`Current refresh: ${this.state.refresh ? this.state.refresh : "None"}`)
            this.tokenAliveCheck()
        })
    }

    isAuthenticated() {
        return this.state.token
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
                }, () =>
                    this.setState({username: localStorage.getItem('username')},
                        () => this.state.username ?
                            this.setState({user_id: this.state.users.results.filter(user => user.username === this.state.username)[0].id}) :
                            this.setState({user_id: null}))
            )
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

        if (this.state.project_id) {
            axios.get(getUrl(`projects/${this.state.project_id}/`), {headers}).then(response => {
                const project = response.data
                this.setState({project: project}
                    // , () => console.log("Обновилось состояние проекта")
                )
            }).catch(error => {
                console.log(error)
                error.response.status === 403 ? this.tokenAliveCheck() : this.setState({project: {}})
            })
        }

        if (this.state.todo_id) {
            axios.get(getUrl(`todos/${this.state.todo_id}/`), {headers}).then(response => {
                const todo = response.data
                this.setState({todo: todo}
                    // , () => console.log("Обновилось состояние заметки")
                )
            }).catch(error => {
                console.log(error)
                error.response.status === 403 ? this.tokenAliveCheck() : this.setState({todo: {}})
            })
        }

    }

    componentDidMount() {
        this.getDataFromCookies()
    }

    render() {
        const ToDoWrapper = (props) => {
            const params = useParams();
            return <ToDoForm user_id={this.state.user_id}
                             createToDo={(name,
                                          description,
                                          created_by,
                                          project
                             ) => this.createToDo(name,
                                 description,
                                 created_by,
                                 project)}
                             updateToDo={(name,
                                          description,
                                          created_by,
                                          project
                             ) => this.updateToDo(name,
                                 description,
                                 created_by,
                                 project)}
                             currentToDo={this.state.todo}
                             setCurrentToDo={(id) => this.setCurrentToDo(id)}
                             projects={this.state.projects.results}
                             users={this.state.users.results}
                             extra_props={params}/>
        }

        const ProjectWrapper = (props) => {
            const params = useParams();
            return <ProjectForm users={this.state.users.results}
                                setCurrentProject={(id) => this.setCurrentProject(id)}
                                currentProject={this.state.project}
                                updateProject={(name,
                                                description,
                                                deadline_timestamp,
                                                users, rep_url, status
                                ) => this.updateProject(name,
                                    description,
                                    deadline_timestamp,
                                    users,
                                    rep_url,
                                    status)}
                                extra_props={params}/>
        }
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
                                                     handleChange={(event) => this.handleChange(event)}
                                                     handleSubmit={(event) => this.handleSubmit(event)}
                                                     search_field={this.state.search_field}
                                                     handleCancel={(event) => this.handleCancel(event)}
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

                            <Route path='/project/update/:id'
                                   element={this.isAuthenticated() ?
                                       <ProjectWrapper/> :
                                       <Navigate to="/login"/>}/>

                            <Route path='/todos/create/:id'
                                   element={this.isAuthenticated() ?
                                       <ToDoWrapper/> :
                                       <Navigate to="/login"/>}/>

                            <Route path='/todo/update/:id'
                                   element={this.isAuthenticated() ?
                                       <ToDoWrapper/> :
                                       <Navigate to="/login"/>}/>

                            <Route path='/project/:id' element={this.isAuthenticated() ?
                                <ProjectDetail setCurrentProject={(id) => this.setCurrentProject(id)}
                                               project={this.state.project}/> : <Navigate to="/login"/>}/>

                            <Route path='/todo/:id' element={this.isAuthenticated() ?
                                <ToDoDetail setCurrentToDo={(id) => this.setCurrentToDo(id)}
                                            todo={this.state.todo}/> : <Navigate to="/login"/>}/>

                            <Route path='/todos'
                                   element={this.isAuthenticated() ?
                                       <TodosPage page={this.state.todos}
                                                  deleteToDo={(id) => this.deleteToDo(id)}/> :
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


export default App;
