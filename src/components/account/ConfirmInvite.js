import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';

import { withRouter, Redirect } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { confirm, getInvite } from '../../api/accounts';
import { login } from '../../api/auth';
import { Input } from 'baseui/input';

// for testing
import axios from 'axios';

class ConfirmInvite extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      submitting: false,
      passwordError: false,
      confirmPasswordError: false,
      confirmationError: false,
      firstNameError: false,
      lastNameError: false,

      user: {
        first_name: '',
        last_name: '',
        address: ''
      },

      password: '',
      confirmPassword: ''
    }
    this.submit = this.submit.bind(this);
    this.confirmAccount = confirm.bind(this);
    this.getInvite = getInvite.bind(this);
    this.login = login.bind(this);
  }

  componentDidMount() {
    
    Cookies.remove('wizard-auth')
    Cookies.remove('user')
    Cookies.remove('active_tab')
    // window.location = '/login';
    

    console.log(this.props.match.params.token)
    // Cookies.set('wizard-auth', this.props.match.params.token)

    this.getUser()
  }

  getUser() {
    this.getInvite(this.props.match.params.token)
    .then(({ data }) => {
      const { user, invite } = data;
      console.log(data)
      this.setState({ user })
    })
    .catch(e => console.log(e))
  }

  handleUpdatePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleUpdateConfirmPassword = (e) => {
    this.setState({confirmPassword: e.target.value})
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  submit(){
    if(this.state.user.first_name === ''){
      this.setState({nameError: true, errorMessageName: 'First Name is a required field'})
    }
    if(this.state.user.first_name != ''){
      this.setState({nameError: false})
    }
    if(this.state.password === ''){
      this.setState({passwordError: true, errorMessagePassword: 'Password is a required field'})
      return
    }
    if(this.state.confirmPassword === ''){
      this.setState({confirmPasswordError: true, errorMessageConfirmPassword: 'Confirm password is a required field'})
      return
    }

    if (this.state.password != this.state.confirmPassword){
      this.setState({confirmationError: true, errorMessageConfirmation: 'Password and password confirmation do not match'})
      return
    }

    if(this.state.password != ''){
      this.setState({passwordError: false})
    }
    
    if(this.state.confirmPassword != ''){
      this.setState({confirmPasswordError: false})
    }

    if(this.state.user.first_name == '') {
      this.setState({ firstNameError: true })
      return
    }
    
    if(this.state.user.last_name == '') {
      this.setState({ lastNameError: true })
      return
    }
    
    if(this.state.password === this.state.confirmPassword && !this.state.passwordError && !this.state.confirmPasswordError && !this.state.nameError){
      this.setState({submitting: true})
      this.confirmAccount(this.state.password, this.state.user, this.props.match.params.token).then(({ data }) => {
        login(data.user.email, this.state.password).then(({ data }) => {
          this.props.context.setUser(data.user)
          this.props.history.push('/client/0')
        }).catch((e) => { 
          console.log(e) 
        })
      }).catch(e => console.log(e))
    }


    // if(this.state.password === this.state.confirmPassword && !this.state.passwordError && !this.state.confirmPasswordError && !this.state.nameError){
    //   //SEND IT
    //   this.setState({submitting: true})
    //   this.confirmAccount(this.state.password, this.state.user, this.props.match.params.token).then(({ data }) => {

    //       // COMBAK 
    //       // FOR TESTING add test case "boyd" to newly created user
          
    //       let id = this.props.match.params.token;
    //       let payload ={
    //         "from":data.user.email,
    //         "content":"\n\n\nCHILDREN'S ADMINISTRATION\nSERVICE REFERRAL\nfor Family Preservation Services\n"+id+"Service Referral Id:\n11/07/2018Referral Date:\nPROVIDER AND SERVICE INFORMATION\nCase:Boyd, Doug ("+id+")\nIf the selected provider is required by CA to have a contract, they must have a contract with CA to provide the service being referred in order\nfor the service provided pursuant to this referral to be reimbursed.  Rates must be as agreed to in the provider's contract with CA.\nSERVICE PROVIDER\nFAMILY IMPACT NETWORK- Collaborators (0000)\nREASON FOR REFERRAL\nParent-Child Interaction/Bond\nSERVICE AUTHORIZED UNTIL\nFREQUENCY & DURATION\nservice timeline\nSERVICE CATEGORY & TYPE\nPromoting First Relationships /**Promoting\nFirst Relationships\nSERVICE GOAL(S)\nDenise is a 3 year old girl. The father, Mr Boyd, was recently established as the father through paternity testing. Mr.\nBoyd reports he has three other children; two of which are not in his care and he reports not having regular contact with\nthem. He reports having an existing relationship with Haley but has not been allowed to have contact with her since she\nwas 1 years old and is known as her uncle.\n\nMr. Wilson hasn't had the opportunity to spend time on bonding and/or attachment with Haley as her father. The\nDepartment is recommending PFR to help establish a strong and healthy bond/attachment; as well as give Mr. Boyd the\ntools to be successful for future reunification.\nREFERRER INFORMATION\nCA WORKER\nTim, K (321)\nPROGRAM TYPE\nCFWS (Child Family Welfare\nServices)\nCA WORKER OFFICE\nSpokane North\nTELEPHONE NUMBER\n(000) 000-0000\nE-MAIL ADDRESS\t@dshs.wa.gov\nFAX NUMBER\n(000) 000-0000\nCA SUPERVISOR\nFannie Mae (111)\nCA SUPERVISOR TELEPHONE NUMBER\n(000) 000-0000\nSERVICE PARTICIPANTS\n* Instructions to Provider: If WI (Warning Indicator) displays with “Yes”, please clarify the WI reason with the CA\nWorker prior to the first contact with the family.\nWI*NAME (ID)\nMary Boyd (1)\nDOB\n09/15/2014\nETHNICITY\nNot\nHispanic/Latino\nRACE\nWhite/Caucasian\nADDRESS\n123 1st St\nCITY\nSeattle\nSTATE\nWA\nZIP CODE\n99999\nPHONE NUMBER\n(000) 000-0000\nLANGUAGE\nEnglish\nGENDER\nFemale\nSCHOOLPLACED\nYes\nCAREGIVER NAME\nMisses Boyd J\nWI*NAME (ID)\nBaby Boyd (102977798)\nDOB\n01/11/1911\nETHNICITY\nNot\nHispanic/Latino\nRACE\nWhite/Caucasian; American Indian/Alaskan\nNative\nADDRESS\n123 W. 6th \nCITY\nSeattle\nSTATE\nWA\nZIP CODE\n99999\nPHONE NUMBER\n(000) 000-0000\nLANGUAGE\nEnglish\nGENDER\nMale\nSCHOOLPLACED\nNo\nCAREGIVER NAME\nADDITIONAL FAMILY INFORMATION\nCHILDREN’S ADMINISTRATION APPROVAL\nFINAL ELECTRONIC APPROVAL\nName, Name Social and Health Program Consultant, 11/09/2011, Approved\nDSHS 00-0000 (rev. 08/2017)Case Name: Test, Test (00000)Page 1 of5\nService Referral\n\n\nSUPERVISOR NAME AND SIGNATURE (May be needed if no electronic approval)Date\nGATEKEEPER NAME AND SIGNATURE (May be needed if no electronic approval)Date\nAREA ADMINISTRATOR NAME AND SIGNATURE (May be needed if no electronic approval)Date\nREGIONAL ADMINISTRATOR/DESIGNEE NAME AND SIGNATURE (May be needed if no electronic approval)Date\nDSHS 00-000 (rev. 08/2017)Case Name: Test, Test L (00xx)Page 2 of5\nService Referral\n\n\nCURRENT ASSESSMENT INFORMATION\nNATURE AND EXTENT OF MALTREATMENT OR FAMILY SITUATION\nBoyd is caring, but not a suitable caregiver\ndue to her CPS history and history of child neglect.\nDSHS 00-000 (rev. 00/000)Case Name: Boyd ("+id+")Page 5 of5\nService Referral"
    //       }

    //       axios.post('https://api.hovihealth.com/api/referral/ingest', payload).then(res => { 
    //         if(data.user) {
    //           login(data.user.email, this.state.password).then(({ data }) => {
    //             this.props.context.setUser(data.user)
    //             this.props.history.push('/client/0')
    //           }).catch((e) => { 
    //             console.log(e) 
    //           })
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });

          
    //   }).catch(e => alert(e.message))

    // }
    
  }

  render(){

    const { user, submitting } = this.state;

    return (
      
        <div className="distribute distribute-center full-height">
          <div className="container--sm"> 
            <div className="">
              <h1>Create Account</h1>
            </div>

            <div className="formGroup mb-2 clearfix">
              <div className="grid1of1 block">
                <div className="grid1of2 mb-2">
                  <label>First Name</label>
                  <Input
                    onChange={e => this.setState({ user: { ...user, first_name: e.target.value }, firstNameError: false })}
                    placeholder="First Name"
                    value={user.first_name}
                    error={this.state.firstNameError}
                  />
                </div>  
                
                <div className="grid1of2 mb-2">
                  <label>Last Name</label>
                  <Input
                    onChange={e => this.setState({ user: { ...user, last_name: e.target.value }, lastNameError: false })}
                    placeholder="Last Name"
                    value={user.last_name}
                    error={this.state.lastNameError}
                  />
                </div>
              </div>

              {(this.state.nameError) && 
                <div className="error-msg mt-1" tabIndex="-1">
                  {this.state.errorMessageName}
                </div>
              }
            </div> 
             

              
            <div className="grid1of1">
              <div className="grid1of2 mb-2">
                <label>Password</label>
                <Input
                  onChange={value => this.handleUpdatePassword(value)}
                  placeholder=""
                  defaultValue={''}
                  type="password"
                  value={this.state.password}
                  tabIndex="0"
                />
                {(this.state.passwordError) && 
                  <div className="error-msg mt-1" tabIndex="-1">
                    {this.state.errorMessagePassword}
                  </div>
                }
              </div>  
              <div className="grid1of2 mb-2">
                <label>Confirm Password</label>
                <Input
                  onChange={value => this.handleUpdateConfirmPassword(value)}
                  placeholder=""
                  defaultValue={''}
                  type="password"
                  value={this.state.confirmPassword}
                  tabIndex="0"
                />
                {(this.state.confirmationError) && 
                  <div className="error-msg mt-1" tabIndex="-1">
                    {this.state.errorMessageConfirmation}
                  </div>
                }

                {(this.state.confirmPasswordError) &&
                  <div className="error-msg mt-1" tabIndex="-1">
                    {this.state.errorMessageConfirmPassword}
                  </div>
                }
              </div>
             </div>

             <div className="grid1of1 mt-2 text-right">
              {/*<button className="full-width" onClick={this.submit}>Sign Up</button>*/}
              {(submitting) ? 
                  <button className="primary loading">
                    <div className="loader start-icon mr-1">
                      <svg viewBox="0 0 150 150" id="load" x="0px" y="0px"><circle cx="75" cy="75" r="60" id="loader-inner"></circle></svg>
                    </div>
                    Sign Up
                  </button>
                  : <button className="primary" onClick={this.submit}>Sign Up</button>}
            </div>
          </div>
        </div>
      
    )
  }
}

export default withContext(withRouter(ConfirmInvite))
