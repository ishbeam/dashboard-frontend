import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

class ShowMore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      	showModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);    
  }


  toggleModal(){ 
    console.log('show me them details') 
    this.setState({showModal: !this.state.showModal})
  }
 
 
  
  render() {
    return (
        <div className="case-card">
	        <div className="case-card_toggle" onClick={this.toggleModal}>
	            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
	              <circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>
	              <circle cx="5" cy="12" r="1"></circle>
	            </svg>
	        </div>

          	<React.Fragment>
	          <Modal isOpen={this.state.showModal} onClose={this.toggleModal}> 
	            <ModalHeader>Therapist Profile</ModalHeader>
	            <ModalBody>
	              <p>Insert all the options (password, profile, account type, delete)</p>
	              <button className="tertiary">Action Button</button>
	            </ModalBody>
	            <ModalFooter>
	             	
	            </ModalFooter>
	          </Modal>
	        </React.Fragment>
        </div>
    );
  }
}


export default ShowMore;  
