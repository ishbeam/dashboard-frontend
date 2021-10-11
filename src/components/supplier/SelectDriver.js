import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';

import Dropdown from '../elements/Dropdown';
import Input from '../elements/Input';

import { Button } from 'baseui/button';

import { find } from '../../api/users';
import { setDriver } from '../../api/orders';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

// let drivers = [
//   {name: "Mike Miller"},
//   {name: "Ron Swanson"},
//   {name: "Ron Swanson"},
//   {name: "Ron Swanson"},
//   {name: "Ron Swanson"},
//   {name: "Ron Swanson"},

// ]

class SelectDriver extends Component {

  constructor(props) {
    super(props)

    this.state = {
        selectedDriverIndex: -1,
        drivers: []
    }
  }

  componentDidMount() {
    this.getDrivers()
  }

  getDrivers() {

    find({ 'company.role': 'driver' }).then(({ data }) => {
      console.log('DRIVERS', data)
      this.setState({ drivers: data })

    }).catch(e => { console.log('bruh', e)})
  }

  handleSelectDriver = (driver, i) =>{
      this.setState({selectedDriver: driver, selectedDriverIndex: i})
  }

  submit = () => {
    this.props.onSelect(this.state.selectedDriver)
    this.props.close()
    console.log("submitting time")
  }

  render() {
    let { selectedDriverIndex } = this.state;
    const { drivers } = this.state;
    return (
      <div>
        <React.Fragment>
          <Modal isOpen={true} onClose={this.props.close}> 
            <ModalHeader>Select Driver</ModalHeader>
            <ModalBody>
              {drivers.map((d,i) => {
                return(
                  <div className="compact radio distribute distribute-between pb-2 pt-2 border-bottom" onClick={() => this.handleSelectDriver(d, i)} key={i}>
                    <label style={{paddingBottom: 16}}>{d.name}</label>
                    <div className={"icon " + ((i == selectedDriverIndex) ? 'active' : '' )} >
                      <div className="icon_inner"></div>
                    </div>
                  </div> 
                )
              })}

            

            </ModalBody>
            <ModalFooter>
              <Button className="full-width" onClick={() => this.submit()}>Done</Button> 
            </ModalFooter>
          </Modal>
        </React.Fragment>
        
        
      </div>
    )
  }
}

export default SelectDriver;
