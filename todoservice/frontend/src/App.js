import React from "react";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import WelcomePage from "./components/Welcome";
import UsersPage from "./components/Users";
import NavigationBar from "./components/Navigation";
import Footer from "./components/Footer";
import NotFound404 from "./components/Page404";
import ProjectsPage from "./components/Projects";
import TodosPage from "./components/Todos";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const USERS_URL = 'users/'
const PROJECTS_URL = 'projects/'
const TODOS_URL = 'todos/'
const getUrl = (url) => {
    return `${DOMAIN}${url}`
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get(getUrl(USERS_URL)).then(response => {
            const users = response.data
            this.setState({
                'users': users,
            })
        }).catch(error => console.log(error))

        axios.get(getUrl(PROJECTS_URL)).then(response => {
            const projects = response.data
            this.setState({
                'projects': projects,
            })
        }).catch(error => console.log(error))

        axios.get(getUrl(TODOS_URL)).then(response => {
            const todos = response.data
            this.setState({
                'todos': todos,
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <>
                <BrowserRouter forceRefresh={false}>
                    <div className={'navigation-bar'}>
                        <NavigationBar/>
                    </div>
                    <div className={'context'}>
                        <Routes>
                            <Route path='/' element={<WelcomePage/>}/>
                            <Route path='/users' element={<UsersPage page={this.state.users}/>}/>
                            <Route path='/projects' element={<ProjectsPage page={this.state.projects}/>}/>
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

export default App;
