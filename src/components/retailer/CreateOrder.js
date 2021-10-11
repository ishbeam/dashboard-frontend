import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';

import { ORIENTATION, StatefulCalendar } from 'baseui/datepicker';
import { TimePicker } from "baseui/timepicker";
import Dropdown from '../elements/Dropdown';
// import Input from '../elements/Input';
import AddLocation from './AddLocation';
import AddProduct from './AddProduct';

import { RadioGroup, Radio, ALIGN } from 'baseui/radio'
import { Button, SIZE } from 'baseui/button';
import { Input } from 'baseui/input';
import OInput from '../inputs/input';

import { create } from '../../api/orders';
import { list as listSites } from '../../api/sites';


import { times } from '../../data/times';

import { formatDate, formatTime } from '../../util/datetime';


let types = [
  { option: 'Regular', selected: false },
  { option: 'Premium', selected: false },
  { option: 'Super', selected: false },
  { option: 'Disel', selected: false }
]

class CreateOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 0,
      location: '',
      date: '',
      time: '',
      sites: [],
      selectedSite: {},
      deadline: null,
      // locations: locations,
      // types,
      products: [
        { type: '', gallons: '' }
      ],
      showAddLocation: false,
      showAddProduct: false
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.getSites()
  }

  getSites() {
    listSites().then(({ data }) => {
      this.setState({ sites: data })
    }).catch(e => console.log(e))
  }

  updateType = (type) => {
    console.log(type)
    let p = this.state.products;
    p[0].type = type.option;

    this.setState({ products: p })
  }

  updateGallons = (e) => {
    this.state.products[0].gallons = e.target.value;
    this.setState({ products: this.state.products })
  }

  // handleUpdateLocation = (location, i) => {
  //   this.setState({ location: location, selectedLocation: i })
  // }

  handleChangeStep = (step) => {
    this.setState({ step: step })
  }

  handleChangeDate = (date) => {
    this.setState({ date: date })
  }

  handleChangeTime = (time) => {
    console.log(time)
    this.setState({ time: time })
  }

  updateNewLocations = (location) => {
    let locations = this.state.locations;
    locations.push(location)
    this.setState({ locations: locations, showAddLocation: false })
  }

  updateNewProduct = (product) => {
    let products = this.state.products;

    console.log(products)
    console.log(product)
    products.push(product)
    this.setState({ products: products, showAddProduct: false })
  }


  submit = () => {

    // Parse out the deadline 
    let { date, time } = this.state;
    time = time.option;
    time = time.substr(0, time.length - 2)
    const timeParts = time.split(':')
    date.setHours(Number(timeParts[0]))
    date.setMinutes(Number(timeParts[1]))

    console.log(date)

    const { selectedSite: site } = this.state

    const order = {
      type: 'auction',
      deadline: date,
      products: this.state.products.map(p => { return { fuel_type: p.type, quantity: p.gallons } }),
      dropoff: site._id
      // dropoff: { site: site._id, type: 'Point', coordinates: site.location.coordinates, address: site.address },
    }

    create(order).then((o) => {
      console.log('Order created', o)
      this.props.history.push('/retailer/orders')
    }).catch(e => console.log(e))

  }

  render() {


    let { step, sites, products } = this.state;
    //   const [twelveHourTime, setTwelveHourTime] = useState(null);
    // const [twentyFourHourTime, setTwentyFourHourTime] = useState(
    //   null,
    // );
    // const [creatableTime, setCreatableTime] = useState(null);

    return (
      <div>
        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontMedium white">Create Bid</h1>
          </div>
        </div>

        <div className="container">
          <div className="full-width clearfix">
            <div id="table" className="card mb-6 pb-6">
              <div className="mb-6 pb-6 clearfix">
                <section>
                  <nav>
                    <ol className="multi-steps text-top">
                      {(step > 0) ?
                        <li className="visited" onClick={() => this.handleChangeStep(0)}><div className="fontSize0">Fuel Type</div></li>
                        : <li className={(step === 0) ? "current" : ''}><span className="fontSize0">Fuel Type</span></li>}

                      {(step > 1) ?
                        <li className="visited" onClick={() => this.handleChangeStep(1)}><div className="fontSize0">Gallons</div></li>
                        : <li className={(step === 1) ? "current" : ''}><span className="fontSize0">Gallons</span></li>}

                      {(step > 2) ?
                        <li className="visited" onClick={() => this.handleChangeStep(2)}><div className="fontSize0">Location</div></li>
                        : <li className={(step === 2) ? "current" : ''}> <span className="fontSize0">Location</span></li>}

                      {(step > 3) ?
                        <li className="visited" onClick={() => this.handleChangeStep(3)}><div className="fontSize0">Date & Time</div></li>
                        : <li className={(step === 3) ? "current" : ''}><span className="fontSize0">Delivery Date</span></li>}

                      {(step > 4) ?
                        <li className="visited" onClick={() => this.handleChangeStep(4)}><div className="fontSize0">Confirm Bid</div></li>
                        : <li className={(step === 4) ? "current" : ''}><span className="fontSize0">Confirm Bid</span></li>}
                    </ol>
                  </nav>
                </section>


                <div className="full-width mb-2 clearfix">
                  <div className="inner_3">

                    {(step === 0) ?
                      <div className="container--sm">
                        <div className="full-width clearfix">
                          <div className="distribute distribute-center">
                            <div className="grid1of2">
                              <h2 className="fontSize2 fontSemiBold">Select Product Type</h2>
                              {/* <RadioGroup
                                value={}
                                onChange={e => this.updateType(e.target.value)}
                                align={ALIGN.vertical}
                              >
                                <Radio value="1">One</Radio>
                                <Radio
                                  value="2"
                                  description="This is a radio description"
                                >
                                  Two
                                  </Radio>
                                <Radio value="3">Three</Radio>
                              </RadioGroup> */}
                              {types.map((d, i) => {
                                return (
                                  <div className="compact radio distribute distribute-between pb-2 pt-2 border-bottom" onClick={() => this.updateType(d)} key={i}>
                                    <label style={{ paddingBottom: 16 }}>{d.option}</label>
                                    <div className={"icon " + ((d.option == this.state.products[0].type) ? 'active' : '')} >
                                      <div className="icon_inner"></div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      : ''}


                    {(step === 1) ?
                      <div className="container--sm">
                        <div>
                          <h2 className="fontSize2 fontSemiBold">How many gallons?</h2>
                          <p>Enter the number of gallons you want delivered to your location. Can not exceed 10,000 gallons</p>
                        </div>
                        {/* 
                        <Input
                          onChange={this.updateGallons}
                          value={this.state.products[this.state.products.length - 1].gallons}
                          name={"Gallons"}
                          type="gallons"
                          id={"gallons"}
                          placeholder="10,000"
                          defaultValue={this.state.gallons}
                        /> */}

                        <OInput
                          placeholder={'10,000 gallons'}
                          type={'number'}
                          onChange={(value) => console.log('VALUEEEE', value)}
                          rule={function(prev, current) {
                            // If over 10000 gallons dont allow
                            if(Number(prev) > 10000)
                              return prev
                            return current
                          }}
                        />
                      </div>
                      : ''}

                    {(step === 2) ?
                      <div className="container--sm">
                        <div className="distribute distribute-between mb-4">
                          <h2 className="fontSize2 fontSemiBold mb-0 mt-0">Select Delivery Location</h2>
                        </div>


                        <div className="full-width clearfix">
                          {/* <div className="grid1of2">
                            <button className="button secondary" onClick={this.toggleShowAddLocation}>Add New Tank</button>
                          </div> */}

                          <div className="grid1of2">
                            <ul>
                              {sites.map((d, i) => {
                                return (
                                  <li className="compact radio distribute distribute-between" onClick={() => this.setState({ selectedSite: d })} key={i}>
                                    <div>
                                      <label className="bold">{d.name}</label>
                                      <p>{d.address}</p>
                                    </div>
                                    <div className={"icon " + ((d._id == this.state.selectedSite._id) ? 'active' : '')} >
                                      <div className="icon_inner"></div>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      : ''}


                    {(step === 3) ?
                      <div className="container--sm">
                        <div className="distribute distribute-between mb-2">
                          <div>
                            <h2 className="fontSize2 fontSemiBold">Select Delivery Date & Time</h2>
                            <div>
                              <p>Must be at least one delivery day out</p>
                            </div>
                          </div>
                        </div>

                        <div className="full-width">
                          <div className="grid1of2">
                            <div className="mr-2 clearfix">
                              <Dropdown
                                placeholder={"Select Time"}
                                options={times}
                                select={this.handleChangeTime}
                              />
                            </div>
                          </div>

                          <div className="grid1of2">
                            <StatefulCalendar
                              onChange={({ date }) => this.handleChangeDate(date)}
                              orientation={ORIENTATION.horizontal}
                              monthsShown={1}
                            />
                          </div>
                        </div>


                      </div>
                      : ''}


                    {(step === 4) ?
                      <div className="container--sm">
                        <h2 className="fontSize2 fontSemiBold">Confirm Bid Details</h2>

                        <div className="mb-4 clearfix">
                          <h3 className="fontSize1 fontSemiBold">Products</h3>

                          <div className="mb-2">
                            {products.map((d, i) => {
                              return (
                                <div>
                                  <div className="compact">
                                    <label>Type</label>
                                    <p>{d.type}</p>
                                  </div>
                                  <div className="compact border-bottom">
                                    <label>Quantity</label>
                                    <p>{d.gallons}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>



                          <div className="compact">
                            <label>Location</label>
                            <p className="mb-0 pb-0">{this.state.selectedSite.name}</p>
                            <p className="mt-0 pt-0">{this.state.selectedSite.address}</p>
                          </div>
                          <div className="compact">
                            <label>Drop Date / Time</label>
                            <p>{formatDate(this.state.date)} {this.state.time.option}</p>
                          </div>
                        </div>


                        <Button kind={'secondary'} className="full-width" onClick={() => this.setState({ showAddProduct: !this.state.showAddProduct })}>Add Another Product</Button>

                        <div className="mt-4 clearfix">
                          <Button kind={'primary'} className="full-width" onClick={() => this.submit()}>Submit</Button>
                        </div>

                      </div>

                      : ''}
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>

        <AddProduct
          isOpen={this.state.showAddProduct}
          update={this.updateNewProduct}
          close={() => this.setState({ showAddProduct: !this.state.showAddProduct })}
        />


        {(this.state.showAddLocation) ?
          <AddLocation
            update={this.updateNewLocations}
            close={this.toggleShowAddLocation}
          />
          : ''}

        {(step < 4) ?
          <footer class="builder-footer step-1">
            <div class="selected-product">
              <div class="tot-price">
                <span>Total</span>
                <span class="total">$<b>0</b></span>
              </div>
            </div>
            <div className="distribute distribute-between mt-4">
              <div></div>
              {(step === 0) ?
                <Button size={SIZE.large} className="primary button mt-4" disabled={(this.state.products[0].type != "") ? false : true} onClick={() => this.handleChangeStep(step + 1)}>Next</Button>
                : ''}
              {(step === 1) ?
                <Button size={SIZE.large} className="primary button mt-4" /*disabled={(this.state.products[0].gallons != "") ? false : true}*/ onClick={() => this.handleChangeStep(step + 1)}>Next</Button>
                : ''}
              {(step === 2) ?
                <Button size={SIZE.large} className="primary button mt-4" disabled={(this.state.selectedSite._id != null) ? false : true} onClick={() => this.handleChangeStep(step + 1)}>Next</Button>
                : ''}
              {(step === 3) ?
                <Button size={SIZE.large} className="primary button mt-4" disabled={(this.state.date != "" && this.state.time != "") ? false : true} onClick={() => this.handleChangeStep(step + 1)}>Next</Button>
                : ''}

            </div>
          </footer>


          : ''}

      </div>
    )
  }
}

export default withRouter(CreateOrder);
