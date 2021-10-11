import React, { Component } from 'react';
import { Link, withRouter  } from "react-router-dom";


import { Input } from 'baseui/input';

class EditAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...JSON.parse(localStorage.getItem('user')),
      pw1: '',
      pw2: ''
    }
    
    // this.createTherapist = createTherapist.bind(this);

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
  }
  

  onUpdateTherapist = () => { 

  }

  onUpdatePassword() {
    const { pw1, pw2 } = this.state;
    const MIN_LENGTH = 0;
    if(pw1.length > MIN_LENGTH && pw2.length > MIN_LENGTH) return;

    if(pw1 !== pw2) return;

  }

  handleChangeFirstName(event) {
    console.log(event.target.value)
    this.setState({first_name: event.target.value, input1: false});
  }

  handleChangeLastName(event) {
    this.setState({last_name: event.target.value, input1: false});
    console.log(this.state)
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value, input1: false});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value, input1: false});
    console.log(this.state)
  }

  handleChangeConfirmPassword(event) {
    // this should check to see if password and confirm password match
    // also consider not setting password here and sending the user an email with link to password set form

    // console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <header id="form-nav">
          <div className="distribute-inline distribute-between full-width">
            <Link to="/client" >
              <button className="reset close-btn js-drawer__close" onClick={this.Close}>
                <svg className="icon" viewBox="0 0 16 16" > 
                  <title>Close drawer panel</title>
                  <g strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                    <line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line>
                  </g>
                </svg>
              </button>
            </Link>

            {/* <Link to="/client">  */}
            <div>
              <button className="submit-btn" onClick={this.onUpdateTherapist}> 
                Save
              </button>
            </div>
            {/* </Link> */}
          </div>
        </header>



        <div className="container--sm offset-nav pb-8 pt-8">
          <h1 className="fontBold fontSize4 mt-8">Edit Account</h1> 
          
          <h2 className="fontSemiBold fontSize1 pb-1">Personal Details</h2>
          <div className="formGroup pb-2 block clearfix">
            <div className="grid1of2">
              <label>First Name</label>
              <Input
                onChange={this.handleChangeFirstName}
                placeholder="First Name"
                value={this.state.first_name}
              />
            </div>

            <div className="grid1of2">
              <label>Last Name</label>
              <Input
                onChange={this.handleChangeLastName}
                placeholder="Last Name"
                value={this.state.last_name}
              />
            </div>
          </div>

          <div className="pt-6">
            <h2 className="fontSemiBold fontSize1 pb-1">Account Details</h2>
            <div className="formGroup pb-2 block clearfix">
              <div className="grid1of1">
                <label>Email</label>
                <Input
                  onChange={this.handleChangeEmail}
                  placeholder="Email"
                  value={this.state.email}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <h2 className="fontSemiBold fontSize1 pb-1">Change Password</h2>
            <div className="formGroup pb-2 block clearfix">
              <div className="grid1of1">
                <label>Password</label>
                <Input
                  onChange={(e) => this.setState({ pw1: e.target.value })}
                  placeholder=""
                  value={this.state.pw1}
                  type="password"
                />
              </div>
            </div>
            <div className="formGroup pb-2 block clearfix">
              <div className="grid1of1">
                <label>Confirm Password</label>
                <Input
                  onChange={(e) => this.setState({ pw2: e.target.value })}
                  placeholder=""
                  value={this.state.pw2}
                  type="password"
                />
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default withRouter(EditAccount);
