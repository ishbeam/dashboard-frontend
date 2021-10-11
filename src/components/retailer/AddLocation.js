import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';

import Dropdown from '../elements/Dropdown';
import Input from '../elements/Input';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

 // {
    //   tank: { 
    //     fuel_type: string,
    //     capacity: number
    //     units: string (always in gallons)
    //     above_below: boolean (above or below ground tank)
    //     location: {
    //       address: { street, city, state, zip }
    //       coordinates: [] (we can get these from addres tho of course
    //     } 
    //   }
    // }

function formatDate(date) {
    // console.log(date)
    var date = new Date(date);
    var month = ( (date.getMonth() + 1) < 10 ) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    var day = ((date.getDate()) < 10 ) ? `0${date.getDate()}` : date.getDate();
    var year = date.getFullYear().toString().substr(-2);

    let formattedDate = month + "/" + day + "/" + year;
    
    return formattedDate;
  }

class AddLocation extends Component {

  constructor(props) {
    super(props)

    this.state = {
        activeTab: 0,
        showStandingBids: false
    }
  }

  handleUpdateInput = (field, value) => {
    this.setState({[field]: value}) 
  }

  submit = () => {
    console.log("SUBMIT TO API")
    
    let location = {
      name: this.state.name,
      address: this.state.address
    }
    this.props.update(location)

  }

  render() {
    return (
      <div>
        <React.Fragment>
          <Modal isOpen={true} onClose={this.props.close}> 
            <ModalHeader>Add Tank</ModalHeader>
            <ModalBody>
              <div className="mb-2 clearfix">
                <Input
                  onChange={(e) => this.handleUpdateInput("name", e.target.value)}
                  value={this.state.name}
                  name={"Location Name"} 
                  id={"name"}
                  placeholder=""
                  type=""
                  defaultValue={""}
                />
              </div>

              <Input
                onChange={(e) => this.handleUpdateInput("address", e.target.value)}
                value={this.state.address}
                name={"Address"} 
                id={""}
                placeholder=""
                type=""
                defaultValue={""}
              />


            

            </ModalBody>
            <ModalFooter>
              <button className="button primary full-width" onClick={() => this.submit()}>Add Tank</button> 
            </ModalFooter>
          </Modal>
        </React.Fragment>
        
        
      </div>
    )
  }
}

export default AddLocation;
