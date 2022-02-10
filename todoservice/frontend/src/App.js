import './App.css';
import './components/Menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import UserList from "./components/Users";
import axios from "axios";
import NavMenuBar from "./components/Menu";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const getUrl = (url) => {
  return `${DOMAIN}${url}`
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'navItems': []
        }
    }

    componentDidMount() {
        axios.get(getUrl('users/')).then(response => {
            const users = response.data
            this.setState({
                'users': users,
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <>
                <div className={'NavMenuBar'}>
                    <NavMenuBar/>
                </div>
                <div className={'Container'}>
                    <UserList users={this.state.users}/>
                </div>
            </>
        )
    }
}

export default App;
