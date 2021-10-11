import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';
import { Select } from 'baseui/select';

import { formatDate } from '../../util/datetime';

import DirectionsMap from '../elements/DirectionsMap';
import ProgressBar from '../elements/ProgressBar';
import Input from '../elements/Input';

import { submitBid, getOne } from '../../api/orders';
import { get as getOpis } from '../../api/opis';
import { list as listTerminals } from '../../api/terminals';
import SubmitBid from './SubmitBid';
import HaulDetails from './HaulDetails';

let start = { lat: 47.658393, lng: -117.428120 }
let end = { lat: 47.654657, lng: -117.417982 }

class BidDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bid: b[0],
      order: { products: [] },
      price: '',
      isBidSubmit: false,
      terminals: [],
      selectedTerminal: { name: '', location: { coordinates: [] } },
      opis: {},

    }
  }

  async componentDidMount() {
    console.log(this.props)
    // this.setState({
    //   order: { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Premium' }, { quantity: 2000, fuel_type: 'Plus' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    // })

    await this.init()

    getOne(this.props.orderId).then(({ data }) => {

      console.log('supplier bid order', data)
      this.setState({ order: data })
    }).catch(e => console.log(e))
  }

  async init() {
    try {
      const { data: opis } = await getOpis()
      const { data: terminals } = await listTerminals()

      this.setState({ opis, terminals })
    } catch(e) {
      console.log(e)
    }
  }

  _onUpdateProducts(products) {
    this.setState({ order: { ...this.state.order, products: products }})
    console.log(products)
  }


  onSubmit = () => {
    console.log(this.state.order.products)
    console.log('t', this.state.selectedTerminal)
    debugger
    submitBid(this.props.orderId, this.state.selectedTerminal._id, this.state.order.products).then(({ data }) => {
      console.log(data)
      this.setState({ isBidSubmit: true })
      this.props.history.push('/supplier/orders')
    }).catch(e => {
      console.log(e)
      this.props.history.push('/supplier/orders')
    })
  }

  render() {
    let { bid, order, isBidSubmit, terminals, selectedTerminal } = this.state;
    return (
      <div>
        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontMedium white">Bid Request Details</h1>
            <p className="white">Ordr # {this.props.orderId}</p>
          </div>
        </div>

        <div className="container">
          <div className="full-width clearfix">
            <div id="table" className="card grid1of3">
              <div className="inner_3">
                <h2 className="mt-0 pt-0 fontSemiBold">Order Details</h2>

                {/* <div className="compact">
                  <label>Quantity</label>
                  <p>{bid.gallons.toLocaleString()}</p>
                </div> */}
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
              </div>



            </div>
            <div id="table" className="card grid2of3">
              <HaulDetails
                onSelectTerminal={(terminal) => this.setState({ selectedTerminal: terminal })}
                terminals={terminals}
                selectedTerminal={selectedTerminal}
                dropoff={order.dropoff}
              />

              {/* <div className="full-width">
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
              </div> */}
            </div>
          </div>

          <div className="full-width clearfix">
            <SubmitBid
              products={order.products}
              onUpdateProducts={(products) => this._onUpdateProducts(products)}
              onSubmit={this.onSubmit}
            />
            {/* <div id="table" className="card grid1of3">
              <div className="full-width">
                <div className="inner_3">
                  <h2 className="mt-0 pt-0 fontSemiBold">{isBidSubmit ? 'Costs' : 'Submit Bid'}</h2>

                  {(!isBidSubmit) ?
                    <div className="distribute distribute-inline distribute-center mb-4">
                      <div className="fontSize3 fontSemiBold mr-1">$</div>
                      <div style={{ display: 'flex' }}>
                        <Select
                          options={[{ label: '+' }, { label: '-' }]}
                          labelKey='label'
                          valueKey='label'
                          value={}
                        />
                        <Input
                          onChange={(e) => this.setState({ price: e.target.value })}
                          value={this.state.price}
                          name={"Price"}
                          type="text"
                          id={"price"}
                          placeholder=""
                          defaultValue={""}
                        />
                      </div>
                      <div class="ml-2">Total</div>
                    </div>

                    : null

                  }

                  <div className="full-width mb-4">
                    <div className="full-width mb-1 clearfix border-bottom">
                      <div className="distribute distribute-center distribute-inline pb-2">
                        <div className="fontSemiBold pr-2 ">Sub Total</div>
                        <div>x0 gallons</div>
                      </div>
                    </div>

                    <div className="full-width mb-1 pt-1 clearfix">
                      <div className="grid1of3 fontSemiBold">Fed Lust Tax</div>
                      <div className="grid1of3 text-center">.184/gallon</div>
                      <div className="grid1of3 fontSemiBold text-right">$0.00</div>
                    </div>

                    <div className="full-width mb-1 clearfix">
                      <div className="grid1of3 fontSemiBold">CA Excise Tax</div>
                      <div className="grid1of3 text-center">.475/gallon</div>
                      <div className="grid1of3 fontSemiBold text-right">0.00</div>
                    </div>

                    <div className="full-width mb-1 clearfix">
                      <div className="grid1of3 fontSemiBold">CA Other Fees</div>
                      <div className="grid1of3 text-center">184/gallon</div>
                      <div className="grid1of3 fontSemiBold text-right">$0.00</div>
                    </div>

                    <div className="full-width mt-2 clearfix border-top border-bottom">
                      <div className="distribute distribute-between pt-2 pb-2">
                        <div className="fontSemiBold pr-2 ">Order Total</div>
                        <div className="fontSemiBold">$0.00</div>
                      </div>
                    </div>


                  </div>

                  {(isBidSubmit) ?
                    <h3 style={{ textAlign: 'right', color: 'rgb(0,200, 40)', fontSize: 16, opacity: 0.5 }}>You bid ${this.state.price}</h3>
                    : <button className="primary button" onClick={this.onSubmit}>Submit</button>

                  }
                </div>
              </div>
            </div> */}

            <div className="grid2of3 mt-2 clearfix">
              {/* <div id="table" className="card">
                <div className="full-width">
                  <div className="inner_3">
                    <h2 className="mt-0 pt-0 fontSemiBold">Carrier Details</h2>

                   
                   
                  </div>
                </div>
              </div> */}


              <div id="table" className="card mt-2">
                <div className="full-width">
                  <div className="inner_3 clearfix">
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
      </div>
    )
  }
}

export default withRouter(BidDetails);
