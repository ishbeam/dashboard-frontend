import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link, Route } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';
import Switcher from '../elements/Switcher';
import { formatDate } from '../../util/datetime';

import CreateOrder from './CreateOrder';
import OrderProgress from '../elements/OrderProgress';
import { Button, SIZE, SHAPE, KIND } from 'baseui/button'

import { get } from '../../api/orders';


const OPIS = 1.17

let options = [
  { name: "Open" },
  { name: "Fulfilled" }
]

function parseAddress(addy) {
  if(typeof (addy) != 'string') return ''

  const chunks = addy.split(',')

  return chunks[1] + ', ' + chunks[2]
}

class Orders extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
      orders: [],
      total: 0
    }

    this.getOrders = get.bind(this)
  }

  componentDidMount() {
    this.getOrders('active').then(({ data }) => {

      console.log('ORDERS retail', data)
      this.setState({ orders: data })
    }).catch(e => console.log(e))
  }


  handleSelectSwitcher = (i) => {
    console.log(i)
    this.setState({ activeTab: i })
  }

  render() {
    const { orders } = this.state;

    return (
      <div>
        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontMedium white">Orders</h1>
            <div className="distribute distribute-between">
              <Switcher
                options={options}
                active={this.state.activeTab}
                toggle={this.handleSelectSwitcher}
              />

              <Link to={'/retailer/create-order'} >
                <Button kind={KIND.secondary} size={SIZE.large} shape={SHAPE.pill}>Create Order</Button>
              </Link>

            </div>
          </div>
        </div>

        <div className="container">
          {/* 

            each order has a single card even if there are multiple products being picked up

            "now getting 87 octane"

            same trucker for an order
            
            https://hovi-team.slack.com/files/UUBNXTDJ6/F01732F9CDS/screen_shot_2020-07-10_at_10.32.35_am.png



            also need a switcher between AWARDED VS FULFILLED

            */}

          {orders.map((d, i) => {
            if(!d.awarded_bid) {
              return (
                <div className="card mb-2" key={i}>
                  <Link to={'/retailer/orders/' + d._id}>
                    <div className="row full-width mb-2 inner_3 clearfix">
                      <div className="grid1of4">
                        <div className="order-progress">
                          {/* <label>Distributor</label> */}
                          <div className="distribute-start">
                            <h3>{d.supplier?.name}</h3>

                            <h4>{d.quantity} Gallons</h4>

                            <h3>${d.total}</h3>
                            <div className='pt-2'>

                            </div>
                            <p>{formatDate(d.deadline)}</p>

                          </div>
                        </div>
                      </div>
                      <div className="grid1of4">
                        <OrderProgress
                          label="Status"
                          title="Pending Bids"
                          progress="0.7"
                          description="Out for Bid"
                          date={formatDate(d.deadline)}
                        />
                      </div>
                      {/* <div className="grid1of4">
                      <OrderProgress
                        label="Customer Number"
                        title={d._id.substr(5, 9)}
                        progress="0"
                        description="Alt Origin"
                        date="Sep 1 - 1:20PM"
                      />
                    </div> */}
                      <div className="grid1of4">
                        <OrderProgress
                          label="Pickup Location"
                          location="pickup"
                          title={''}
                          progress="0"
                          description="Pickup 1 of 4"
                          date={formatDate(d.deadline)}
                        />
                      </div>
                      <div className="grid1of4">
                        <OrderProgress
                          label="Dropoff Location"
                          location="dropoff"
                          title={''}
                          progress="0"
                          description="Final Destination"
                          date=""
                        />
                      </div>

                    </div>
                  </Link>
                </div>
              )
            }
            return (
              <div className="card mb-2" key={i}>
                <Link to={'/retailer/orders/' + d._id}>
                  <div className="row full-width mb-2 inner_3 clearfix">
                    <div className="grid1of4">
                      <div className="order-progress">
                        {/* <label>Distributor</label> */}
                        <div className="distribute-start">
                          <h3>{d.supplier.name}</h3>

                          <h4>{d.awarded_bid.total_quantity} Gallons</h4>

                          <h3>${d.awarded_bid.total_price}</h3>
                          <div className='pt-2'>

                          </div>
                          <p>{formatDate(d.deadline)}</p>

                        </div>
                      </div>
                    </div>

                    <div className="grid1of4">
                      <OrderProgress
                        label="Customer Number"
                        title={d._id.substr(5, 9)}
                        progress="1"
                        description="Alt Origin"
                        date={formatDate(d.deadline)}
                      />
                    </div>
                    <div className="grid1of4">
                      <OrderProgress
                        label="Pickup Location"
                        location="pickup"
                        title={parseAddress(d.pickup?.address)}
                        progress="0.75"
                        description="Pickup 2 of 4"
                        date={formatDate(d.deadline)}
                      />
                    </div>
                    <div className="grid1of4">
                      <OrderProgress
                        label="Dropoff Location"
                        location="dropoff"
                        title={d.dropoff ? parseAddress(d.dropoff?.address) : ''}
                        progress="0"
                        description="Final Destination"
                        date=""
                      />
                    </div>

                  </div>
                </Link>
              </div>
            )
          })}

        </div>

        {/* <Route exact path='/retailer/create-order' render={({ match }) => (
          <div>
            <CreateOrder match={match} />
          </div>
        )} /> */}

      </div>
    )
  }
}

export default Orders;
