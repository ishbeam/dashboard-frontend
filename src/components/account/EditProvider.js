import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import {  withRouter  } from "react-router-dom";
import { get, update } from '../../api/provider'
import { withContext } from '../../context/provider'

import { Input } from 'baseui/input';

class EditProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      _id: '',
      provider_id: '',
      name: '',
      address: '',
      phone: ''
    }
    
    this.get = get.bind(this);
    this.update = update.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
  }

  componentDidMount(){
    // let user = JSON.parse(localStorage.getItem('user'));
    console.log(this.props)
    let provider = this.props.context.user.provider_id;
    console.log(provider)
    this.get(provider).then(({ data }) => {
      console.log(data)
      let p = data.provider;
      this.setState({name: p.name, address: p.address, phone: p.phone, id: p.provider_id, _id: p._id, loading: false})  
    }).catch(e => console.log(e));
  }

  onUpdateProvider = () => { 
    const data = {
      _id: this.state._id,
      provider_id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
    }

    this.update(data, (err, data) => {
      if(err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  handleChangeName(event) {

    this.setState({name: event.target.value});
  }

  handleChangeAddress(event) {
    this.setState({address: event.target.value});
    console.log(this.state)
  }

  handleChangePhone(event) {
    this.setState({phone: event.target.value}); 
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

            <Link to="/client"> 
              <button className="submit-btn" onClick={this.onUpdateProvider}>
                Save
              </button>
            </Link>
          </div>
        </header>


        {(this.state.loading === false ) ? 
          <div className="container--sm offset-nav pb-8 pt-8">
            <h1 className="fontBold fontSize4 mt-8">Edit Provider</h1> 
            
            <h2 className="fontSemiBold fontSize1 pb-1">Account Profile</h2>
            <div className="formGroup pb-2 block clearfix">
              <div className="grid1of1">
                <label>Name</label>
                <Input
                  onChange={this.handleChangeName}
                  placeholder="Provider Name"
                  value={this.state.name}
                />
              </div>
            </div>

            <div className="formGroup pb-2 block clearfix">
              <div className="grid1of2">
                <label>Address</label>
                <Input
                  onChange={this.handleChangeAddress}
                  placeholder="Address"
                  value={this.state.address}
                />
              </div>
              
              <div className="grid1of2">
                <label>Phone</label>
                <Input
                  onChange={this.handleChangePhone}
                  placeholder="First Name"
                  value={this.state.phone}
                />
              </div>
            </div>
          </div>


        : ''}
        
      </div>
    );
  }
}


// var mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.user,
//   }
// }

export default withContext(withRouter(EditProvider));
