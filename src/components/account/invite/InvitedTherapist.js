import React, { Component } from 'react';

import Avatar from '../../elements/Avatar';

import { deleteTherapist, updateIsAdmin } from '../../../api/users';

class InvitedTherapist extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      showUserType: false,
      showAccountStatus: false,
      isAdmin: this.props.is_admin
      
    }
    this.toggleUserType = this.toggleUserType.bind(this);
    this.toggleAccountStatus = this.toggleAccountStatus.bind(this);
    this.deleteTherapist = deleteTherapist.bind(this);
    this.updateIsAdmin = updateIsAdmin.bind(this);

  };

  componentDidMount() {
    console.log(this.props.data)

  }

  toggleUserType(){ 
    this.setState({showUserType: !this.state.showUserType})
  }

  toggleAccountStatus(){ 
    this.setState({showAccountStatus: !this.state.showAccountStatus})
  }

  handleChangeIsAdmin = () => {

    console.log(this.props.data.id)
    this.setState({showUserType: false})
    this.updateIsAdmin(this.props.data.id, !this.state.isAdmin).then(({ data }) => {
      console.log(data)
      this.setState({isAdmin: !this.isAdmin})

    })
    .catch(e => {
      console.log(e)
    })
  }

  delete(){
    console.log(this.props.data.id)
    
    // this.deleteTherapist(this.props.data.id).then(({ data }) => {
    //   console.log(data)
    //   this.props.removeInvite()
    // })
    // .catch(e => {
    //   console.log(e)
    // })

    this.deleteTherapist(this.props.data.id, (err, user) => {
        if(err) {
          console.log(err)
        } else {
          this.props.removeInvite()
          console.log(user)
        }
      })
  }
  
  render() {
    let t = this.props.data;
    return (
      <div className="distribute distribute-between mb-1">
        
          <div className="distribute distribute-start">
            <div className="avatar uppercase mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="ml-2">
              <p className="mt-0 mb-0 dark-blue">{t.email} - Invited</p>
              <p className="mt-0 mb-0 grey3">{t.email}</p>
            </div>
          </div>

        
          <div className="user-controls">
            <div className="distribute distribute-center">
              <div>
                <div className="dark-blue mr-3" onClick={this.toggleUserType}>
                  <div className="distribute distribute-center user-controls_trigger">
                    <p>{(this.state.isAdmin) ? 'Admin' : 'Member'}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className={"options-button_options " + ((this.state.showUserType) ? 'is-visible' : 'is-hidden' )}>
                  <span>
                    <ul className="options user-type">
                      <li className={(!this.state.isAdmin) ? 'selected' : ''} onClick={() => this.handleChangeIsAdmin()}>
                        <p className="type distribute distribute-start">{(!this.state.isAdmin) ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> : ''} Member</p>
                        <p>Can view, edit, delete and save cases</p>
                      </li>
                      <li className={(this.state.isAdmin) ? 'selected' : ''}>
                        <p className="type distribute distribute-start" onClick={() => this.handleChangeIsAdmin()}>{(this.state.isAdmin) ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> : ''} Admin</p>
                        <p>Member, but can invite and manage team members</p>
                      </li>
                    </ul>
                  </span>
                  <span>
                    <div className="options-button_overlay" onClick={this.toggleUserType}></div>
                  </span>
                </div>
              </div>

              <div>
                <div className="user-controls_trigger-status" onClick={this.toggleAccountStatus}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </div>
                <div className={"options-button_options " + ((this.state.showAccountStatus) ? 'is-visible' : 'is-hidden' )}>
                  <span>
                    <ul className="options">
                      <li onClick={() => this.delete()}>Delete</li>
                    </ul>
                  </span>
                  <span>
                    <div className="options-button_overlay" onClick={this.toggleAccountStatus}></div>
                  </span>
                </div>

              </div>
            </div>
          </div>
        
      </div>
    );
  }
}

export default InvitedTherapist;
