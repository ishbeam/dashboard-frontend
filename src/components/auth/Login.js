import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { login, signup } from '../../api/auth';
import { withContext } from '../../context/provider';
// import Input from '../elements/Input';
import Logo from '../elements/Logo';

import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
 

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: ''
    }

    this.onLogin = this.onLogin.bind(this)
    this.login = login.bind(this)
  }

  componentDidMount(){
    if(this.props.context.isAuthenticated) {
      let route = `/${this.props.context.user.type}`;
        const { from } = this.props.location.state || { from: { pathname: route }}
        this.props.history.push(from)
      }

    document.addEventListener('keyup', (e) => {
      if (e.code === "Enter"){
        this.onLogin()
      }
    });
  }

  // From onLogin(), wait for props to be updated, then push to /client
  componentDidUpdate(prevProps, prevState) {
    if(this.props.context.isAuthenticated && this.props.context.user) {
      console.log('context', this.props.context.user)
      if(this.props.context.user.company.type == 'retailer') {
        this.props.history.push('/retailer')
      }
      if(this.props.context.user.company.type == 'supplier') {
        this.props.history.push('/supplier')
      }

    }
  }
  
  updateEmail = (e) => {
    this.setState({email: e.target.value.toLowerCase()})
    // console.log(this.state)
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value})
    // console.log(this.state)
  }

  validateEmail = () => {
      const re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validEmail = re.test(String(this.state.email).toLowerCase());

      if (this.state.email === "") {
        this.setState({errorEmail: true})
        return false;
        
      }
      else if(validEmail === false){
        this.setState({errorEmail: true})
        return false;
      }
      else{
        this.setState({errorEmail: false})
        return true;
      }
  }

  validatePassword = () => {
      if (this.state.password === "") {
        this.setState({errorPassword: true})
        return false;
      }
      else{
        this.setState({errorPassword: false})
        return true;
      }
  }

  validation = () => {
      let email = this.validateEmail();
      let password = this.validatePassword();

      if(email && password){
        console.log('good to go')
        return true;
      }
  }

  
  onLogin() {
    login(this.state.email, this.state.password).then(({ data }) => {
      console.log(data)
      this.props.context.setUser(data.user)
    }).catch(e => console.log(e))
  }

  render() {
    let {emailError, passwordError} = this.state;
    
    // ie fallback 
    let width = window.innerWidth;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    
    return (
      <div id="login" style={{width: ((msie > -1) ? width : "100vw")}} className="bg-orange">
        {/*<label>Username but for now put in an _id of a user and it will login</label>*/}
        <div className="full-width clearfix pt-2 pl-2">
          
        </div>
        <div className="distribute distribute-center full-height">

          <div className="container--sm"> 
            <Logo
              fill={"#fff"}
            />
            <div className="card bg-white inner_3 mt-3 br-1">
              <div className="formGroup block mb-2  clearfix">
                {(this.state.isError) ?
                  <div className="error-msg mb-2">{this.state.message}</div>
                : ''}

                <div className="grid1of1 mb-2">
                  
                  <Input
                    onChange={this.updateEmail}
                    value={this.state.email}
                    name={"email"} 
                    id={"email"}
                    placeholder="john@gmail.com"
                    defaultValue={""}
                  />    
                </div>
                
                <div className="grid1of1 mb-1">
                  <Input
                    onChange={this.updatePassword}
                    value={this.state.password}
                    name={"password"} 
                    type="password"
                    id={"password"} 
                    placeholder="********"
                    defaultValue={""}
                  />    
                </div>
                
              </div>
              
              
              <div className="distribute distribute-between ">
                <Link className="link pull-right blue pt-0" tabIndex="-1" to={'/forgot-password'}>Forgot Password?</Link>
                <Button onClick={this.onLogin}>Submit</Button>
              </div>
            </div>
            <div className="">
              <p className="inline-block white mt-2 mr-1">Don't have an account?</p><Link to="/sign-up" className="inline-block white underline">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withContext(withRouter(Login))
