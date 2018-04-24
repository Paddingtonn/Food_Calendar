import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import Home from './home.jsx';
import AppCalendar from './appCalendar.jsx';
import LogInForm from './login.jsx';
import Sample from './sample.jsx';
import "../css/style.css";
import "../css/firstPage.css";
import "../css/form.css";

document.addEventListener('DOMContentLoaded', function() {


    class Navigation extends React.Component{
        render(){
            return <div className="home_list">
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/diet'>Diet Calendar</Link>
                    </li>
                    <li>
                        <Link to='/login'>LogIn Form</Link>
                    </li>
                </ul>
            </div>
        }
    }

    class App extends React.Component {
        render() {
            return <HashRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/diet' component={Sample}/>
                        <Route path='/appCalendar/:user' component={AppCalendar}/>
                        <Route path='/login' component={LogInForm}/>
                    </Switch>
                </div>
            </HashRouter>
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});