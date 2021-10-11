import React, { Component } from 'react';
import { Switch, Route, matchPath,Redirect  } from "react-router-dom";
// import {Helmet} from "react-helmet";
import { login, authenticate } from './api/auth';
import { withCookies } from 'react-cookie';
import Cookies from 'js-cookie'

import {Table} from 'baseui/table';



class Home extends Component {
  constructor(props) {
      super(props);
      console.log('yuppp', props)
      this.state = {
        data: '',
        loading: true,
        user: {
          _id: ''
        }
      }
  }

  componentDidMount() {

    // this.auth()
    return

    
    login('5d213daf624f625c90d29bf4', (err, user) => {
      if(err) {
        console.log(err)
      } else {
        console.log(this.props)
        this.setState({ user: user.data })
      }
    })
  }

  auth() {
    authenticate((err, user) => {
      if(err) {
        console.log(err)
        alert('u gay dawg')
      } else {
        console.log('USER', user)
        this.setState({ user: user })
      }
    })
  }

  render() {
    const DATA = [
      ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
      ['Jane Smith', 32, '100 Market st. San Francisco, California'],
      ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
    ];

    const COLUMNS = ['Name', 'Age', 'Address'];

    return (
      <div className="container pt-8">
        <Table columns={COLUMNS} data={DATA} />
        <div>
          <label>{this.state.user._id}</label>
        </div>
      </div>
    );
  }
}


export default withCookies(Home);
