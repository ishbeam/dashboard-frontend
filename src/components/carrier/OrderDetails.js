import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';

import DirectionsMap from '../elements/DirectionsMap';
import ProgressBar from '../elements/ProgressBar';
import Input from '../elements/Input';

let start = {lat: 47.658393, lng: -117.428120}
let end = {lat: 47.654657, lng: -117.417982}
 
class OrderDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bid: b[0]
    }
  }

  componentDidMount(){
    console.log(this.props) 
  }
 


  render() {
    let { bid } = this.state;
    
    return (
      <div>
        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontMedium white">Order Details</h1>
            <p className="white">Ordr # {this.props.orderId}</p>
          </div>
        </div>

        <div  className="container">
          <div className="full-width clearfix">
            <div id="table" className="card grid1of3">
              <div className="inner_3">
                <h2 className="mt-0 pt-0 fontSemiBold">Order Details</h2>

                <div className="compact">
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
                </div>
              </div>
            </div>

            <div id="table" className="card grid2of3">
                {/*{this.props.match.params.id}*/}

              <div className="full-width">
                <div className="grid1of3">
                  <div className="inner_3">
                    <h2 className="mt-0 pt-0 fontSemiBold">Haul Details</h2>

                    <div className="compact">
                      <label>Distance from Terminal</label>
                      <p>17.6 miles</p>
                    </div>
                    <div className="compact">
                      <label>Fixed Haul Rate</label>
                      <p>17.6 miles</p>
                    </div>
                    <div className="compact">
                      <label>Notes / Instructions</label>
                      <p>Enter off Main Street</p>
                    </div>
                  </div>
                </div>

                <div className="grid2of3">
                   <DirectionsMap 
                    startCoords={start}
                    endCoords={end}
                  />  
                </div>
              </div>
            </div>
          </div>

          <div className="full-width clearfix">
            <div id="table" className="card grid1of3">
              <div className="full-width">
                <div className="inner_3">
                  <h2 className="mt-0 pt-0 fontSemiBold">Price Details</h2>

                  <div className="full-width ">
                    <div className="full-width mb-1 clearfix border-bottom">
                      <div className="distribute distribute-center distribute-inline pb-2">
                        <div className="fontSemiBold pr-2 ">Sub Total</div>
                        <div>x9,500 gallons</div>
                      </div>
                    </div>

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
                    </div>

                    <div className="full-width mt-2 clearfix border-top">
                      <div className="distribute distribute-between pt-2">
                        <div className="fontSemiBold pr-2 ">Order Total</div>
                        <div className="fontSemiBold">$12,786</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div id="table" className="card grid2of3 mt-2">
              <div className="inner_3 clearfix">
                <div className="full-width">
                  <h2 className="mt-0 pt-0 fontSemiBold">Seller Rating</h2>
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
    )
  }
}

export default OrderDetails;
