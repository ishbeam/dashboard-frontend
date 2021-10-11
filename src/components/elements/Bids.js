import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';
import { s } from '../../data/standingPricing';

import { parseAddress } from '../../util'

import Badge from '../elements/Badge';
import Dropdown from '../elements/Dropdown';
import Switcher from '../elements/Switcher';
import Input from '../elements/Input';



function formatDate(date) {
  // console.log(date)
  var date = new Date(date);
  var month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  var day = ((date.getDate()) < 10) ? `0${date.getDate()}` : date.getDate();
  var year = date.getFullYear().toString().substr(-2);

  let formattedDate = month + "/" + day + "/" + year;

  return formattedDate;
}

function formatTime(date) {
  const d = new Date(date)

  let hours = d.getHours()
  const mins = d.getMinutes()
  console.log(hours, ' ', mins)
  let ampm = 'AM';

  if(hours >= 13) {
    hours -= 12;
    ampm = 'PM';
  }

  return hours + ':' + mins + ampm;

}

function timeLeft(date) {
  var d = new Date(date)
  var now = new Date()
  const diff = d.getTime() - now.getTime()
  const mins = diff / (1000 * 60)

  return Math.floor(mins).toFixed(0)
}

class Bids extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
      pricing: s
    }
  }

  componentDidMount() {
    console.log(this.props)
  }


  handleUpdatePrice(d) {
    console.log(d)
  }

  handleUpdateOverUnder(d) {
    console.log(d)
  }

  handleUpdateRange(d) {
    console.log(d)
  }

  _calcTotalGallons(products) {
    let total = 0;
    products.forEach(p => total += p.quantity)
    return total;
  }

  _formatProducts(products) {
    let product = '';
    products.forEach(p => product += p.fuel_type + '/')
    return product.substr(0, product.length - 1)
  }

  _formatDate(date) {
    var d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  render() {

    const { orders } = this.props;
    // let orders = [
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    //   { _id: 'abc123456789', products: [{ quantity: 2000, fuel_type: 'Octane 87' }], deadline: Date.now(), expires: new Date().setMinutes(50) },
    // ]

    return (
      <div className="container">
        <div id="table" className="card">
          <div className="table-header bids-active">
            <ul>
              <li>Ordr #</li>
              <li>Gal</li>
              <li>Product / Grade</li>
              <li>Drop Date & Time</li>
              <li>Location</li>
              <li>Status</li>
            </ul>
          </div>
          <div className="table-body bids-active">
            {orders.map((d, i) => {
              return (
                <Link to={'/supplier/bids/' + d._id} >
                  <div className="row full-width pb-1 pt-1">
                    <ul>
                      <li>{d._id.substr(d._id.length - 7, d._id.length - 1)}</li>
                      <li>{this._calcTotalGallons(d.products).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                      <li>{this._formatProducts(d.products)}</li>
                      {/* <li>
                        <div className="distribute-column distribute-between">
                          <h3>bruh</h3>
                          <h3>bruh</h3>
                          <h3>bruh</h3>
                        </div>
                      </li> */}
                      <li>
                        <span className="pr-2">{formatDate(d.deadline)}</span>
                        <span>{formatTime(d.deadline)}</span>
                      </li>
                      <li>
                        {/* <span className="pr-2">{(Math.random() * 100).toFixed(1).toString()} miles</span> */}
                        <span className="pr-2">{parseAddress(d.dropoff.address)}</span>

                      </li>
                      <li>
                        {/* <span className="pr-2">9/1/20</span> */}
                        <Badge
                          minsLeft={timeLeft(d.expires)}
                        />
                      </li>
                    </ul>

                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div >
    )
  }
}

export default Bids;
