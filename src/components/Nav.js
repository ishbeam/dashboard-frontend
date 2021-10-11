import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { withContext } from '../context/provider';
import { logout } from '../api/auth';
import Logo from './elements/Logo';


class Nav extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showNav: false
    }
    this.onLogOut = this.onLogOut.bind(this);
    this.logout = logout.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
  }

  onLogOut() {
    // this.logout().finally(() => {
    Cookies.remove('ordr-dev')
    Cookies.remove('user')
    localStorage.clear()
    window.location = '/';
    // })
  }

  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav })
  }

  render() {
    let user = this.props.context.user;
    console.log('USER IN NAV', user)
    let { showNav } = this.state;

    if(!user._id) {
      return <div></div>//<Redirect to='/login' />
    }

    return (
      <div className="full-width bg-black">
        <div className="container pt-2 pb-2">
          <div className="distribute distribute-between">
            <Logo
              fill="#fff"
            />
            <div>
              <ul className="list-style-none inline-block">

                {(user.company.type == 'retailer')
                  ? <NavLink to="/retailer/fuels" className="inline-block pb-1 mr-3 white" activeClassName="underline">Fuels</NavLink>
                  : null
                }


                {(user.company.type != 'retailer')
                  ? <NavLink to="/supplier/bids" className="inline-block pb-1 mr-3 white" activeClassName="underline">Bids</NavLink>
                  : null
                }


                <NavLink to={`/${user.company.type}/orders`} className="inline-block pb-1 mr-3 white" activeClassName="underline">Orders{/* has both awarded and fulfulled */}</NavLink>

                {(user.company.type != 'retailer')
                  ? <NavLink to="/supplier/terminals" className="inline-block pb-1 mr-3 white" activeClassName="underline">Terminals</NavLink>
                  : null
                }

                {/* {(user.type != 'retailer') 
                  ? <NavLink to="/supplier/drivers" className="inline-block pb-1 mr-3 white" activeClassName="underline">Drivers</NavLink>
                  : null
                } */}

                {(user.company.type == 'retailer')
                  ? <NavLink to="/retailer/sites" className="inline-block pb-1 mr-3 white" activeClassName="underline">Sites</NavLink>
                  : null
                }

                {/* <NavLink to={`/${user.company.type}/payments`} className="inline-block pb-1 mr-3 white" activeClassName="underline">Payments</NavLink> */}
              </ul>


              <div className="user-toggle" onClick={this.toggleNav}>
                <div className="distribute distribute-between">
                  <div className="pl-2 white mr-1 ml-1">
                    {user.name}
                  </div>
                  <img className="avatar" src="/img/2.png" />
                  <div className="ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>

                {(showNav) ?
                  <div className="user-modal">
                    <ul>
                      <li>Edit Profile</li>
                      
                      {/* Supplier Drivers button */}
                      {(user.company.type == 'supplier') &&
                        <li onClick={() => this.props.history.push('/supplier/drivers')}>Drivers</li>
                      }
                      <li onClick={() => this.props.history(`/${user.company.type}/payments`)}>Payments</li>
                      <li>Settings</li>
                      <li onClick={this.onLogOut}>Log Out</li>
                    </ul>
                  </div>
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withContext(withRouter(Nav))
