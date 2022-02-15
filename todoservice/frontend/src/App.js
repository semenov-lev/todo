import './components/css/Navigation.css';
import './components/css/Footer.css'
import './components/css/Users.css'
import './App.css';
import React from "react";
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import TodosList from "./components/Todos";
import axios from "axios";
import NavigationBar from "./components/Navigation";
import Footer from "./components/Footer";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const USERS_URL = 'users/'
const PROJECTS_URL = 'projects/'
const TODO_URL = 'todos/'
const getUrl = (url) => {
    return `${DOMAIN}${url}`
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'page': 'menu',
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

        axios.get(getUrl(TODO_URL)).then(response => {
            const todos = response.data
            this.setState({
                'todos': todos,
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <>
                <div className={'navigation-bar'}>
                    <NavigationBar/>
                </div>
                <div className={'context'}>
                    <UserList users={this.state.users}/>
                    <ProjectList projects={this.state.projects}/>
                    <TodosList todos={this.state.todos}/>
                </div>
                <div className={'footer'}>
                    <Footer/>
                </div>
            </>
        )
    }
}

export default App;
