import './components/css/Navigation.css';
import './components/css/Footer.css'
import './components/css/Users.css'
import './App.css';
import React from "react";
import UserList from "./components/Users";
import axios from "axios";
import NavigationBar from "./components/Navigation";
import Footer from "./components/Footer";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const getUrl = (url) => {
  return `${DOMAIN}${url}`
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
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
                <div className={'navigation-bar'}>
                    <NavigationBar/>
                </div>
                <div className={'context'}>
                    <UserList users={this.state.users}/>
                </div>
                <div className={'footer'}>
                    <Footer/>
                </div>
            </>
        )
    }
}

export default App;
