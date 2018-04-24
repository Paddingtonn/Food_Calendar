import React from 'react';

import {
    Link,
    Redirect,
} from 'react-router-dom';

class Form extends React.Component{
    state = {
        name: '',
        placeholderName: 'User name',
        email: '',
        placeholderEmail: 'Email',
        pass: '',
        placeholderPass: 'Password',
        error_name: '',
        error_email: '',
        error_pass: '',
        user: null,
        login: false,
    };
    onFocusName = ()=> {
        this.setState({
            placeholderName: '',
        })
    };
    onBlurName = ()=> {
        this.setState({
            placeholderName: 'User name',
        })
    };
    onFocusEmail = ()=> {
        this.setState({
            placeholderEmail: '',
        })
    };
    onBlurEmail = ()=> {
        this.setState({
            placeholderEmail: 'Email',
        })
    };
    onFocusPass = ()=> {
        this.setState({
            placeholderPass: '',
        })
    };
    onBlurPass = ()=> {
        this.setState({
            placeholderPass: 'Password',
        })
    };
    handleChange = (e)=> {
        this.setState({
            name: e.target.value,
        })
    };
    handleChange_1 = (e)=> {
        this.setState({
            email: e.target.value,
        })
    };
    handleChange_2 = (e)=> {
        this.setState({
            pass: e.target.value,
        })
    };

    handleSubmit = (e)=> {
        e.preventDefault();

        const errors= {error_name: '',
                error_email: '',
                error_pass: '',};

        if(this.state.name.length <= 0) {
                errors.error_name =  'State your name, please';

        }if(this.state.email.match('@') === null || this.state.email.length <= 4){

                errors.error_email = 'Wrong email address';

        }if(this.state.pass.length < 4 || this.state.pass.length > 10){
                errors.error_pass = 'Either too long or too short password';
        }


        if(errors.error_name.length ===0 && errors.error_email.length===0 && errors.error_pass.length ===0){

            const user = {name: this.state.name, email: this.state.email, password: this.state.pass};

            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json()
                }else{
                    throw new Error('Error!');
                }
            }).then(data => {
                this.setState({
                    login: true,
                    user: user,
                })
            }).catch(err => console.log('Error!!'))
        }else{
            this.setState(errors)
        }
    };

    render(){

        if(this.state.login){
            return <Redirect to={'/appCalendar/' + this.state.user.name}/>
        }

        return <section className="body">
            <div className="form">
                <form method='post' onSubmit={this.handleSubmit}>
                    <div id="head">Member Login</div>

                    <p style={{color:'white'}}>{this.state.error_name}</p>
                    <input name="name" value={this.state.name} placeholder={this.state.placeholderName} onFocus={this.onFocusName} onBlur={this.onBlurName} onChange={this.handleChange}/>


                    <p style={{color:'white'}}>{this.state.error_email}</p>
                    <input name="email" value={this.state.email} placeholder={this.state.placeholderEmail} onFocus={this.onFocusEmail} onBlur={this.onBlurEmail} onChange={this.handleChange_1}/>


                    <p style={{color:'white'}}>{this.state.error_pass}</p>
                    <input name="password" type="password" placeholder={this.state.placeholderPass} onFocus={this.onFocusPass} onBlur={this.onBlurPass} onChange={this.handleChange_2}/>
                    <input id="submit" name="submit" type="submit" value="Login"/>
                    <input id="checkbox" type="checkbox"/><span>Remember me</span>

                </form>
            </div>
        </section>
    }
}
class LogInForm extends React.Component{
    render(){
        return <Form/>
    }
}

export default LogInForm;