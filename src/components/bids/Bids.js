import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';
import { s } from '../../data/standingPricing';

import Badge from '../elements/Badge';
import Bids from '../elements/Bids';
import StandingBids from '../elements/StandingBids';
import Dropdown from '../elements/Dropdown';
import Switcher from '../elements/Switcher';
import Input from '../elements/Input';

import { Button } from 'baseui/button';

import { getOrdersForBid, listOpen } from '../../api/orders';


let options = [
  { name: "Active" },
  { name: "Open" }
];

let overUnder = [
  { option: "At" },
  { option: "Below" }
];

let range = [
  { option: "Low Average" },
  { option: "Average" },
  { option: "High Average" }
]

function formatDate(date) {
  // console.log(date)
  var date = new Date(date);
  var month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  var day = ((date.getDate()) < 10) ? `0${date.getDate()}` : date.getDate();
  var year = date.getFullYear().toString().substr(-2);

  let formattedDate = month + "/" + day + "/" + year;

  return formattedDate;
}

class SupplierBids extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
      orders: [],
      showStandingBids: false
    }
  }

  componentDidMount() {
    console.log(this.props)

    listOpen().then(({ data }) => {
      console.log('ORDERS', data)
      this.setState({ orders: data.reverse() })
    }).catch(e => {
      console.log(e)
    })
  }

  handleSelectSwitcher = (i) => {
    console.log(i)
    this.setState({ activeTab: i })
  }

  toggleStandingBids = () => {
    this.setState({ showStandingBids: !this.state.showStandingBids })
  }

  render() {
    let { activeTab, pricing, showStandingBids } = this.state;

    return (
      <div>
        <div className="full-width bg-black">
          <div className="container pt-4 pb-8">
            <h1 className="fontSize5 fontRegular white">Bids</h1>

          </div>
        </div>

        <Bids orders={this.state.orders} />

        <StandingBids
          show={this.state.showStandingBids}
          close={this.toggleStandingBids}
        />

        {(!showStandingBids) &&
          <div className="fixed-button">
            <Button size='large' shape={'pill'} className="primary button" onClick={() => this.toggleStandingBids()}>Set Standing Bids</Button>
          </div>
        }

      </div>
    )
  }
}

export default SupplierBids;
