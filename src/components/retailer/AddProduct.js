import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';

import Dropdown from '../elements/Dropdown';
// import Input from '../elements/Input';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Select } from 'baseui/select'

let types = [
  { option: 'Regular' },
  { option: 'Premium' },
  { option: 'Super' },
  { option: 'Diesel' }
]

const AddLocation = ({ isOpen, close, update }) => {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     activeTab: 0,
  //     showStandingBids: false,
  //     gallons: '',
  //     type: null
  //     // types: [
  //     //   { option: 'Octane 89', selected: false },
  //     //   { option: 'Octane 91', selected: false },
  //     //   { option: 'Octane 93', selected: false },
  //     //   { option: 'Diesel', selected: false }
  //     // ]
  //   }
  // }

  const [type, setType] = useState('')
  const [gallons, setGallons] = useState('')


  function submit() {
    console.log("SUBMIT TO API", type)

    const product = {
      gallons: gallons,
      type: type[0].option
    }
    update(product)
  }

  return (
    <div>
      <React.Fragment>
        <Modal isOpen={isOpen} onClose={close}>
          <ModalHeader>Add Product</ModalHeader>
          <ModalBody>

            <Select
              options={types}
              value={type}
              placeholder={'Choose Fuel'}
              onChange={({ value }) => setType(value)}
              labelKey={'option'}
              valueKey={'option'}
            />
            {/* <Dropdown 
                placeholder={"Select Type"}
                options={types}
                select={this.handleChangeType}
              /> */}
            <div className="mt-2 clearfix">
              <Input
                onChange={(e) => setGallons(e.target.value)}
                value={gallons}
                placeholder="Gallons"
                type="number"
              />
            </div>






          </ModalBody>
          <ModalFooter>
            <Button className="primary full-width" onClick={submit}>Add Product</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>


    </div>
  )
}

export default AddLocation;
