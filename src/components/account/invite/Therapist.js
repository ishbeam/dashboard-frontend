import React, { Component } from 'react';

import Avatar from '../../elements/Avatar';

class Therapist extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      showUserType: false,
      showAccountStatus: false
      
    }
    this.toggleUserType = this.toggleUserType.bind(this);
    this.toggleAccountStatus = this.toggleAccountStatus.bind(this);
  };

  componentDidMount() {
    console.log(this.props)

  }

  toggleUserType(){ 
    console.log('show me them details') 
    this.setState({showUserType: !this.state.showUserType})
  }

  toggleAccountStatus(){ 
    this.setState({showAccountStatus: !this.state.showAccountStatus})
  }
  
  render() {
    let t = this.props.data;
    return (
      <div className="distribute distribute-between mb-1">
        
          <div className="distribute distribute-start">
            <Avatar 
              firstName={t.first_name}
              lastName={t.last_name}
            />
            <div className="ml-2">
              <p className="mt-0 mb-0 dark-blue">{t.first_name} {t.last_name} {(this.props.isCreator) ? "(You)" : ''}</p>
              <p className="mt-0 mb-0 grey3">{t.email}</p>
            </div>
          </div>


          <div className="user-controls">
            <div className="distribute distribute-center">
              <div>
                <div className="dark-blue mr-3" onClick={this.toggleUserType}>
                  <div className="distribute distribute-center user-controls_trigger">
                    <p>{(t.is_admin) ? 'Admin' : 'Member'}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className={"options-button_options " + ((this.state.showUserType) ? 'is-visible' : 'is-hidden' )}>
                  <span>
                    <ul className="options user-type">
                      <li className={(!t.is_admin) ? 'selected' : ''}>
                        <p className="type distribute distribute-start">{(!t.is_admin) ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> : ''} Member</p>
                        <p>Can view, edit, delete and save cases</p>
                      </li>
                      <li className={(t.is_admin) ? 'selected' : ''}>
                        <p className="type distribute distribute-start">{(t.is_admin) ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> : ''} Admin</p>
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
                      <li>Delete</li>
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

export default Therapist;
