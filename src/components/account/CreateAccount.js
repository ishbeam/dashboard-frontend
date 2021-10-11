import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";

import { states } from '../../data/states';

// import Input from '../elements/Input';

import { create as createRetailer } from '../../api/retailer'
import { create as createSupplier } from '../../api/supplier'

import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Select } from 'baseui/select'

import Selector from '../inputs/selector';

import Logo from '../elements/Logo';
import Dropdown from '../elements/Dropdown';

const companies = [{
  type: 'Retailer', index: 0
}, {
  type: 'Supplier', index: 1
}]

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      company: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      step: 0,
      companyType: [],
      isRetailer: true
    }


  }


  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state)

  }

  sendConfirmation = () => {
    const user = {
      company: this.state.company,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email.toLowerCase(),
      password: this.state.password
    }

    console.log(user)
    this.next();
    // this.createAccount(user).then((newUser) => {
    //     console.log(newUser)
    //   })
    //   .catch(e => console.log(e))
  }

  handleUpdateInput = (field, value) => {
    this.setState({ [field]: value })
  }

  handleUpdateConfirmationInput = (field, value) => {
    this.setState({ [field]: value })
    if(field != "5") {
      console.log(field)
      let next = parseInt(field) + 1;
      let nextField = next.toString();
      this.refs[nextField].focus()
    } else {
      let confirmationCode = this.state["0"] + this.state["1"] + this.state["2"] + this.state["3"] + this.state["4"] + this.state["5"]
      console.log(confirmationCode)
      // this.next()
      this.createAccount()
    }


  }

  next = () => {
    this.setState({ step: this.state.step + 1 })
  }

  handleUpdateInviteEmail = (e) => {
    let re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]/;
    let validEmail = re.test(String(this.state.value).toLowerCase());
    console.log(validEmail)
    this.setState({ value: e.toLowerCase() })
  }

  createAccount = async () => {
    // let supplier = {
    //   company: this.state.supplier_company,
    //   firstName: this.state.supplier_firstName,
    //   lastName: this.state.supplier_lastName,
    //   email: this.state.supplier_email,
    //   phone: this.state.supplier_phone,
    //   address1: this.state.supplier_address1,
    //   address2: this.state.supplier_address2,
    //   city: this.state.supplier_city,
    //   state: this.state.supplier_state,
    // }

    // let billing = {
    //   company: this.state.billing_company,
    //   firstName: this.state.billing_firstName,
    //   lastName: this.state.billing_lastName,
    //   email: this.state.billing_email,
    //   phone: this.state.billing_phone,
    //   address1: this.state.billing_address1,
    //   address2: this.state.billing_address2,
    //   city: this.state.billing_city,
    //   state: this.state.billing_state,
    // }


    const { firstName, lastName, email, password, company, isRetailer } = this.state;
    // insert that API CALL

    const type = (isRetailer) ? 'retailer' : 'supplier'

    const account = {
      user: {
        name: firstName + ' ' + lastName,
        email,
        password
      },
      company: {
        type,//: companyType[0].type,
        name: company
      }
    }

    console.log(account)
    // return
    if(account.company.type == 'retailer') {
      await createRetailer(account)
    } else {
      await createSupplier(account)
    }


    this.props.history.push('/login')
  }

  handleUpdateStateSupplierSelect = (state) => {
    this.setState({ supplier_state: state.abbreviation })
    console.log(state)
  }

  handleUpdateStateBillingSelect = (state) => {
    this.setState({ billing_state: state.abbreviation })
    console.log(state)
  }

  handleUserType = (type) => {
    console.log(type.option)
  }


  render() {
    let { step, tags, therapists, value, isRetailer } = this.state;

    let userTypes = [
      { option: 'Supplier' },
      { option: 'Retailer' },
      { option: 'Carrier' },
    ];

    // let account = {
    //   first_name: this.state.firstName,
    //   last_name: this.state.lastName,
    //   email: this.state.email,
    //   is_admin: true,
    //   office_location: "placeholder",
    //   password: this.state.password,
    //   type: "placeholder",
    //   phone: "",
    //   provider_id:  this.state.providerId
    // }

    return (
      <div className="bg-grey2" style={{ height: '100vh' }}>
        <div className="pl-4 pt-4">
          <Logo
            fill={"#F78700"}
          />
        </div>
        <div className="container--sm">
          <div className="mt-3">
            {(step === 0) ?
              <div>
                <h2 className="mt-0 mb-1 fontSize4 fontSemiBold">Sign Up</h2>


                <div className="full-width mb-2 clearfix">
                  <div className="grid3of4">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("company", e.target.value)}
                      value={this.state.company}
                      id={"company"}
                      placeholder="Company Name"
                      defaultValue={"Company Name"}
                    />
                  </div>
                  <div className="grid1of4">
                    {/* <Dropdown 
                      placeholder={"Account Type"}
                      options={userTypes}
                      select={this.handleUserType}
                    /> */}
                    {/* <Select 
                      options={companies}
                      value={this.state.companyType}
                      placeholder={'Select'}
                      labelKey={'type'}
                      onChange={({ value }) => {
                        console.log(value)
                        this.setState({ companyType: value })
                      }}
                    /> */}
                    {/* <div className="distribute distribute-inline distribute-between">
                      <div className="mr-1">
                      <Button shape={'pill'} kind={isRetailer ? 'primary' : 'secondary'} onClick={() => this.setState({ isRetailer: true })}>Retailer</Button>

                      </div>
                      <Button shape={'pill'} kind={!isRetailer ? 'primary' : 'secondary'} onClick={() => this.setState({ isRetailer: false })}>Supplier</Button>
                    </div> */}

                    <div >
                      <Selector options={[{ label: 'Retailer', id: 'retailer' }, { label: 'Supplier', id: 'supplier' }]} placeholder='Company' onSelect={(value) => console.log('value', value)} />
                    </div>
                  </div>

                </div>

                <div className="full-width mt-2 clearfix">
                  <div className="grid1of2">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("firstName", e.target.value)}
                      value={this.state.firstName}
                      placeholder="First Name"
                      defaultValue={"First Name"}
                    />
                  </div>
                  <div className="grid1of2">
                    <Input
                      onChange={(e) => this.handleUpdateInput("lastName", e.target.value)}
                      value={this.state.lastName}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="full-width mt-2 clearfix">
                  <Input
                    onChange={(e) => this.handleUpdateInput("email", e.target.value)}
                    value={this.state.email}
                    placeholder="john@gmail.com"
                    defaultValue={"Email"}
                  />
                </div>

                <div className="full-width mt-2 clearfix">
                  <div className="grid1of2">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("password", e.target.value)}
                      value={this.state.password}
                      type="password"
                      placeholder="********"
                    />
                  </div>
                  <div className="grid1of2">
                    <Input
                      onChange={(e) => this.handleUpdateInput("confirmPassword", e.target.value)}
                      value={this.state.confirmPassword}
                      placeholder="*******"
                      type="password"
                    />
                  </div>
                </div>
                <div className="full-width mt-2">
                  <div className="full-width distribute distribute-between">
                    <div className="distribute distribute-start mt-2">
                      <p className="mt-0 pt-0 mr-1">Already have an account?</p>
                      <Link to="/login" className="underline black ">Log in</Link>
                    </div>
                    <div>
                      <Button onClick={() => this.sendConfirmation()}>Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
              : null}


            {(step === 1) ?
              <div>
                <h2 className="mt-0 mb-1 fontSize4 fontSemiBold">Check your email</h2>
                <p>We've sent a 6-digit confirmation code to {this.state.email}.</p>
                <p>Enter the code below</p>

                <div className="mt-6 mb-6">
                  <div className="confirmation">
                    <div className="section">
                      <input
                        autoComplete="nope"
                        ref="0"
                        maxLength="1"
                        onChange={(e) => this.handleUpdateConfirmationInput("0", e.target.value)}
                      />
                      <input
                        autoComplete="nope"
                        ref="1"
                        maxLength="1"
                        onChange={(e) => this.handleUpdateConfirmationInput("1", e.target.value)}
                      />
                      <input
                        autoComplete="nope"
                        ref="2"
                        maxLength="1"
                        onChange={(e) => this.handleUpdateConfirmationInput("2", e.target.value)}
                      />
                    </div>
                    <div className="section">
                      <input
                        autoComplete="nope"
                        ref="3"
                        maxLength="1"
                        onChange={(e) => this.handleUpdateConfirmationInput("3", e.target.value)}
                      />
                      <input
                        autoComplete="nope"
                        ref="4"
                        maxLength="1"
                        onChange={(e) => this.handleUpdateConfirmationInput("4", e.target.value)}
                      />
                      <input
                        autoComplete="nope"
                        ref="5"
                        maxLength="1"
                        onChange={(e) => this.handleUpdateConfirmationInput("5", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <p>Keep this window open while checking for your confirmation email. If an email doesn't arrive in minutes, check your spam folder.</p>
              </div>
              : ''}

            {(step === 2) ?
              <div className="mb-8 pb-8 clearfix">
                <h2 className="mt-0 mb-1 fontSize4 fontSemiBold">Details</h2>
                <h3 className="mt-0 mb-1 fontSize2 fontRegular">Contact Info</h3>


                <div className="full-width mt-2 clearfix">
                  <div className="grid1of2">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("sales_firstName", e.target.value)}
                      value={this.state.supplier_firstName}
                      name={"First Name"}
                      id={"firstName"}
                      placeholder=""
                      defaultValue={"First Name"}
                    />
                  </div>
                  <div className="grid1of2">
                    <Input
                      onChange={(e) => this.handleUpdateInput("supplier_lastName", e.target.value)}
                      value={this.state.supplier_lastName}
                      name={"Last Name"}
                      id={"lastName"}
                      placeholder=""
                      defaultValue={"Last Name"}
                    />
                  </div>
                </div>

                <div className="full-width mt-2 clearfix">
                  <div className="grid1of2">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("supplier_email", e.target.value)}
                      value={this.state.supplier_email}
                      name={"Email"}
                      id={"supplier_email"}
                      placeholder=""
                      defaultValue={"Email"}
                    />
                  </div>
                  <div className="grid1of2">
                    <Input
                      onChange={(e) => this.handleUpdateInput("supplier_phone", e.target.value)}
                      value={this.state.supplier_phone}
                      name={"Phone"}
                      id={"supplier_phone"}
                      placeholder=""
                      defaultValue={"Phone"}
                    />
                  </div>
                </div>

                <div className="full-width mt-2 clearfix">
                  <Input
                    onChange={(e) => this.handleUpdateInput("supplier_address1", e.target.value)}
                    value={this.state.supplier_address1}
                    name={"Address"}
                    id={"address1"}
                    placeholder=""
                    defaultValue={"Address"}
                  />
                </div>

                <div className="full-width mt-2 clearfix">
                  <Input
                    onChange={(e) => this.handleUpdateInput("supplier_address2", e.target.value)}
                    value={this.state.supplier_address2}
                    name={"Address 2"}
                    id={"address2"}
                    placeholder=""
                    defaultValue={"Address 2"}
                  />
                </div>

                <div className="full-width mt-2 clearfix">
                  <div className="grid3of4">
                    <Input
                      onChange={(e) => this.handleUpdateInput("supplier_city", e.target.value)}
                      value={this.state.supplier_city}
                      name={"City"}
                      id={"supplier_city"}
                      placeholder=""
                      defaultValue={"City"}
                    />
                  </div>
                  <div className="grid1of4">
                    <Dropdown
                      placeholder={"Select State"}
                      options={states}
                      select={this.handleUpdateStateSupplierSelect}
                    />
                  </div>
                </div>



                {/* <h3 className="mt-6 mb-1 fontSize2 fontRegular">Billing Contact</h3>
                <div className="full-width mt-2 clearfix">
                  <div className="grid1of2">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("billing_firstName", e.target.value)}
                      value={this.state.billing_firstName}
                      name={"First Name"} 
                      id={"firstName"}
                      placeholder=""
                      defaultValue={"First Name"}
                    />  
                  </div>
                  <div className="grid1of2">
                    <Input
                      onChange={(e) => this.handleUpdateInput("billing_lastName", e.target.value)}
                      value={this.state.billing_lastName}
                      name={"Last Name"} 
                      id={"lastName"}
                      placeholder=""
                      defaultValue={"Last Name"}
                    />  
                  </div>
                </div>

                <div className="full-width mt-2 clearfix">
                  <div className="grid1of2">
                    <Input
                      // onChange={this.updateEmail}
                      onChange={(e) => this.handleUpdateInput("billing_email", e.target.value)}
                      value={this.state.billing_email}
                      name={"Email"} 
                      id={"billing_email"}
                      placeholder=""
                      defaultValue={"Email"}
                    />  
                  </div>
                  <div className="grid1of2">
                    <Input
                      onChange={(e) => this.handleUpdateInput("billing_phone", e.target.value)}
                      value={this.state.billing_phone}
                      name={"Phone"} 
                      id={"billing_phone"}
                      placeholder=""
                      defaultValue={"Phone"}
                    />  
                  </div>
                </div>

                <div className="full-width mt-2 clearfix">
                  <Input
                    onChange={(e) => this.handleUpdateInput("billing_address1", e.target.value)}
                    value={this.state.billing_address1}
                    name={"Address"} 
                    id={"address1"}
                    placeholder=""
                    defaultValue={"Address"}
                  />  
                </div>

                <div className="full-width mt-2 clearfix">
                  <Input
                    onChange={(e) => this.handleUpdateInput("billing_address2", e.target.value)}
                    value={this.state.billing_address2}
                    name={"Address 2"} 
                    id={"address2"}
                    placeholder=""
                    defaultValue={"Address 2"}
                  />  
                </div>

                <div className="full-width mt-2 clearfix">
                  <div className="grid3of4">
                    <Input
                      onChange={(e) => this.handleUpdateInput("billing_city", e.target.value)}
                      value={this.state.billing_city}
                      name={"City"} 
                      id={"billing_city"}
                      placeholder=""
                      defaultValue={"City"}
                    />  
                  </div>
                  <div className="grid1of4">
                    <Dropdown 
                      placeholder={"Select State"}
                      options={states}
                      select={this.handleUpdateStateBillingSelect}
                    />
                  </div>
                </div> */}

                <div className="distribute distribute-end mt-2 mb-8 pb-8">
                  <Button onClick={() => this.createAccount()}>Submit</Button>
                </div>
              </div>
              : ''}


          </div>
        </div>
      </div>
    );
  }
}



export default withRouter(CreateAccount);
