import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';
import Switcher from '../elements/Switcher';
import OrderProgress from '../elements/OrderProgress';

let options = [
  {name: "Open"},
  {name: "Fulfilled"}
]

class Orders extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0
    }
  }

  componentDidMount(){
    console.log(this.props) 
  }
 
  handleSelectSwitcher = (i) => {
    console.log(i)
    this.setState({activeTab: i})
  }

  render() {
    return (
      <div>
        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontMedium white">Orders</h1>
            <Switcher
              options={options}
              active={this.state.activeTab}
              toggle={this.handleSelectSwitcher}
            />
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
            
            {b.map((d,i) => {
              return(
                <div className="card mb-2">
                  <Link to={'/retailer/orders/'+d.number}>
                    <div className="row full-width mb-2 inner_3 clearfix">
                      <div className="grid1of4">
                        <OrderProgress
                          label="Status"
                          title="In Transit"
                          progress="1"
                          description="Driver Assigned"
                          date="Nov 10 - 10:00AM"
                        />
                      </div>
                      <div className="grid1of4">
                        <OrderProgress
                          label="Customer Number"
                          title={d.number}
                          progress="1"
                          description="Alt Origin"
                          date="Nov 11 - 1:20PM"
                        />
                      </div>
                      <div className="grid1of4">
                        <OrderProgress
                          label="Pickup Location"
                          location="pickup"
                          title="Columbus, OH"
                          progress="0.75"
                          description="Pickup 2 of 4"
                          date="Nov 12 - 2:36PM"
                        />
                      </div>
                      <div className="grid1of4">
                        <OrderProgress
                          label="Dropoff Location"
                          location="dropoff"
                          title="Chicago"
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
      </div>
    )
  }
}

export default Orders;
