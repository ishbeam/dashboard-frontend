import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';

import DirectionsMap from '../elements/DirectionsMap';
import ProgressBar from '../elements/ProgressBar';

import { pay } from '../../api/payments';

// import HaulDetails from './HaulDetails';

import { getOne, setDriver } from '../../api/orders';
import { formatDate } from '../../util/datetime';
import { Button } from 'baseui/button';
import { getDistanceLatLng } from '../../util/latlng';

import Map from '../elements/Map'


let start = { lat: 47.658393, lng: -117.428120 }
let end = { lat: 47.654657, lng: -117.417982 }

class OrderDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      order: { products: [] },
      bid: b[0],
      hasCarrier: false,
      driverSelected: false,
      distance: 0,
      driver: { name: '' }
    }
  }

  componentDidMount() {
    console.log('we in here right')
    getOne(this.props.orderId).then(({ data }) => {
      console.log('ORDER', data)
      this.setState({ order: data }, () => {
        this.calculateHaulDetails()
      })

    }).catch(e => {
      console.log(e)
    })
  }

  calculateHaulDetails() {
    const { pickup, dropoff } = this.state.order;
    const p = pickup.location.coordinates
    const d = dropoff.location.coordinates

    const distance = getDistanceLatLng(p[1], p[0], d[1], d[0])

    this.setState({ distance })
    console.log('PD', pickup, dropoff)
  }

  onPayNow = async() => {
    const payment = await pay(this.state.order._id)
    console.log(payment)
    this.props.history.goBack()
    alert('Thanks for paying')
  }

  render() {
    const { bid, hasCarrier, driverSelected, order } = this.state;
    const { driver } = order;

    return (
      <div>



        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontMedium white">Order Details</h1>
            <p className="white">Ordr # {this.props.orderId}</p>
          </div>
        </div>

        <div className="container">
          <div className="full-width clearfix">
            <div id="table" className="card grid1of3">
              <div className="inner_3">
                <h2 className="mt-0 pt-0 fontSemiBold">Order Details</h2>

                {/* <div className="distribute distribute-between mb-1">
                  <span style={{ fontSize: 20 }}>Product</span>
                  <span style={{ fontSize: 20 }}>Quantity</span>
                </div>

                {(order.products.map((o, i) => (
                  <div className="distribute distribute-between row" key={i} >
                    <p style={{ fontSize: 14, margin: 0, padding: 2 }}>{o.fuel_type}</p>
                    <p style={{ fontSize: 14, margin: 0, padding: 2 }}>{o.quantity}</p>
                  </div>

                )))} */}
                <div className="compact">
                  <label>Product / Quantity</label>
                  {(order.products.map((p) => (
                    <div><p>{p.fuel_type}</p><p>{p.quantity} gallons</p></div>
                  )))}



                </div>
                <div className="compact">
                  <label>Drop Date / Time</label>
                  <p>{formatDate(order.deadline)} 4-8pm</p>
                </div>
                {/* </div> */}
                {/* <div className="compact">
                  <label>Quantity</label>
                  <p>{bid.gallons.toLocaleString()}</p>
                </div>
                <div className="compact">
                  <label>Product / Grade</label>
                  <p>{bid.product}</p>
                </div>
                <div className="compact">
                  <label>Drop Date / Time</label>
                  <p>November 4, 2019 4-8pm</p>
                </div> */}
              </div>
            </div>

            <div id="table" className="card grid2of3">
              {/* <HaulDetails terminal={order.pickup} site={order.dropoff} /> */}
              {/*{this.props.match.params.id}*/}

              <div className="full-width">
                <div className="grid1of3">
                  <div className="inner_3">
                    <h2 className="mt-0 pt-0 fontSemiBold">Haul Details</h2>

                    <div className="compact">
                      <label>Distance from Terminal</label>
                      <p>{this.state.distance} miles</p>
                    </div>
                    <div className="compact">
                      <label>Fixed Haul Rate</label>
                      <p>$1.11/mi</p>
                    </div>
                    <div className="compact">
                      <label>Notes / Instructions</label>
                      <p>Enter off Main Street</p>
                    </div>
                  </div>
                </div>

                <div className="grid2of3">
                  {order._id && order.pickup.location.coordinates.length > 0
                    ? <DirectionsMap
                      startCoords={{ lat: order.pickup.location.coordinates[1], lng: order.pickup.location.coordinates[0] }}
                      endCoords={{ lat: order.dropoff.location.coordinates[1], lng: order.dropoff.location.coordinates[0] }}
                    />
                    : <Map lat={47} lng={-122} />
                  }
                </div>
              </div>
            </div>
          </div>



          <div className="full-width clearfix mt-4">
            <div id="table" className="card grid1of3">
              <div className="full-width">
                <div className="inner_3">
                  <h2 className="mt-0 pt-0 fontSemiBold">Price Details</h2>

                  <div className="full-width ">

                    {order?.awarded_bid?.products.map((p) => (
                      <div className="full-width mb-1 clearfix">
                        <div className="distribute distribute-center distribute-inline pb-2">
                          <div className="fontSemiBold pr-2 ">{p.fuel_type}</div>
                          <div>{p.quantity} gallons @ {p.plusminus} {p.price}</div>
                        </div>
                      </div>

                    ))}
                    {/* <div className="full-width mb-1 clearfix">
                      <div className="distribute distribute-center distribute-inline pb-2">
                        <div className="fontSemiBold pr-2 ">Sub Total</div>
                        <div>x9,500 gallons</div>
                      </div>
                    </div> */}
                    {/* 
                    <div className="full-width mb-1 pt-1 clearfix">
                      <div className="grid1of3 fontSemiBold">Fed Lust Tax</div>
                      <div className="grid1of3 text-center">.184/gallon</div>
                      <div className="grid1of3 fontSemiBold text-right">$1,230.50</div>
                    </div>

                    <div className="full-width mb-1 clearfix">
                      <div className="grid1of3 fontSemiBold">CA Excise Tax</div>
                      <div className="grid1of3 text-center">.475/gallon</div>
                      <div className="grid1of3 fontSemiBold text-right">$4,123.50</div>
                    </div>

                    <div className="full-width mb-1 clearfix">
                      <div className="grid1of3 fontSemiBold">CA Other Fees</div>
                      <div className="grid1of3 text-center">184/gallon</div>
                      <div className="grid1of3 fontSemiBold text-right">$1230.50</div>
                    </div> */}

                    <div className="full-width mt-2 clearfix border-top">
                      <div className="distribute distribute-between pt-2">
                        <div className="fontSemiBold pr-2 ">Order Total</div>
                        <div className="fontSemiBold">${order?.awarded_bid?.total_price}</div>
                      <Button onClick={this.onPayNow}>Pay Now</Button>
                      </div>
                    </div>
                    {/* <div className="mt-2 mb-2 pull-right"> */}

                    {/* </div> */}

                  </div>

                </div>
              </div>
            </div>



            <div className="grid2of3">
              <div id="table" className="card ">
                <div className="full-width">
                  <div className="inner_3">
                    <div className="block full-width clearfix">
                      <h2 className="mt-0 pt-0 fontSemiBold">Carrier Details</h2>
                    </div>

                    {(driver) ?
                    <div className="full-width pb-1 clearfix">
                      <div className="grid1of2">
                        <div className="compact">
                          <label>Company</label>
                          <p>Supplier Company</p>
                        </div>

                        <div className="compact">
                          <label>Address</label>
                          <p>123 Front Street, Portland ME</p>
                        </div>
                      </div>

                      <div className="grid1of2">
                        <div className="compact">
                          <label>Driver</label>
                          {(driver) ?
                            <p>{driver.name}</p>
                            : <p className="blue underline inline-block" onClick={() => this.toggleSelectDriver()}>Select Driver</p>}

                        </div>

                        <div className="compact">
                          <label>Rating</label>
                          <p>A+ Outstanding Dude</p>
                        </div>
                      </div>
                    </div>

                    : <div className="block full-width clearfix">
                      <div className="inner_3 clearfix">
                        <div className="carrier-loader" href="#">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                          </span>
                        </div>
                      </div>
                      <h3 className="full-width fontSize0 fontSemiBold text-center mt-0">Looking for carriers...</h3>
                          </div> }


                  </div>
                </div>
              </div>



              <div id="table" className="card mt-2">
                <div className="inner_3 clearfix">
                  <div className="full-width">
                    <h2 className="mt-0 pt-0 fontSemiBold">Buyer Rating</h2>
                    <div className="grid1of3">
                      <div className="compact">
                        <label>Previous Orders</label>
                        <p>37</p>
                      </div>
                      <div className="compact">
                        <label>Ratings</label>
                        <p>4.4 - Based on 26 Ratings</p>
                      </div>
                    </div>

                    <div className="grid2of3">
                      <div className="full-width clearfix">
                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block pr-2">5 Stars</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#7f7f7f" progress="17" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>1717</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block pr-2">4 Stars</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#7f7f7f" progress="5" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block pr-2">3 Stars</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#7f7f7f" progress="2" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block pr-2">2 Stars</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#7f7f7f" progress="1" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block pr-2">1 Stars</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#7f7f7f" progress="1" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                          </div>
                        </div>
                      </div>


                      <div className="full-width mt-4">
                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block">Site Availability</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#41ba4d" progress="12" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                            <span>17</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3" >
                            <span className="relative block">Ease of Truck Access</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#41ba4d" progress="17" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                            <span>17</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3" >
                            <span className="relative block">Site Tanks Access</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#41ba4d" progress="14" total="20" />
                          </div>
                          <div className="grid1of4">
                            <span>17</span>
                            <span>17</span>
                          </div>
                        </div>

                        <div className="distribute distribute-between mb-1">
                          <div className="grid1of3">
                            <span className="relative block">Equipment Condition</span>
                          </div>
                          <div className="grid1of2">
                            <ProgressBar color="#f68500" progress="6" total="20" />
                          </div>
                          <div className="grid1of4">

                            <span>17</span>
                            <span>17</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(OrderDetails);
