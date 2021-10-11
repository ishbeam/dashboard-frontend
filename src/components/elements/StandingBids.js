import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../../context/provider';
import { b } from '../../data/bids';
import { s } from '../../data/standingPricing';

import { Button } from 'baseui/button';
import Badge from '../elements/Badge';
import Dropdown from '../elements/Dropdown';
import Switcher from '../elements/Switcher';
import Input from '../elements/Input';

 
let options = [
  {name: "Active"},
  {name: "Standing"}
];

let overUnder = [
  {option: "At"},
  {option: "Below"}
];

let range = [
  {option: "Low Average"},
  {option: "Average"},
  {option: "High Average"}
]

function formatDate(date) {
    // console.log(date)
    var date = new Date(date);
    var month = ( (date.getMonth() + 1) < 10 ) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    var day = ((date.getDate()) < 10 ) ? `0${date.getDate()}` : date.getDate();
    var year = date.getFullYear().toString().substr(-2);

    let formattedDate = month + "/" + day + "/" + year;
    
    return formattedDate;
  }

class Bids extends Component {

  constructor(props) {
    super(props)

    this.state = {
        activeTab: 0,
        pricing: s,
        show: props.show
    }
  }

  componentDidMount(){
    console.log(this.props) 

  }

  componentDidUpdate(){
    console.log(this.props)
    console.log(this.state) 
    if(this.props.show != this.state.show){
      this.setState({show: this.props.show})
    }

  }
 
  handleSelectSwitcher = (i) => {
    console.log(i)
    this.setState({activeTab: i})
  }

  handleUpdatePrice(d){
    console.log(d)
  }

  handleUpdateOverUnder(d){
    console.log(d)
  }

  handleUpdateRange(d){
    console.log(d)
  }

  render() {
    let { activeTab, pricing } = this.state;

    return (
      
        

        
          <div className={"standing-bids " + this.state.show}>

            <div className="container">
              <div className="standing-bids_container clearfix">
                <div className="header">
                  <div className="distribute distribute-end">
                    <div className="pt-1 pb-2 pr-2" onClick={this.props.close}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                  </div>
                </div>
                <div id="table" className="grid1of3 card">
                  <div className="table-header bids">
                    <div class="inner_4">
                      <h2 className="mt-0 mb-0 fontSize3 fontSemiBold">Set Standing Pricing</h2>
                      <div className="mb-4 clearfix">
                        <p className="grey4">Activated bids are a firm offer price for goods described and contractually valid until revised.</p>
                        <p className="grey4">All federal and state taxes, other fees and delivery charges are calculated separately.</p>
                      </div>

                      <Button shape={'pill'} size={'large'} class="button">Activate</Button>
                    </div>
                  </div>
                </div>

                <div id="table" className="grid2of3 card">
                  <div className="table-header bids">
                    <ul>
                      <li>Product Name</li>
                      <li>Price</li>
                      <li>Range</li>
                      <li>Range</li>
                    </ul>
                  </div>
                  <div className="table-body bids">
                    
                      {pricing.map((d,i) => {
                        return (
                          <ul>
                            <li>
                              <span class="type">{d.type} </span>
                              {(d.desc != "") ? <span className="desc">/ {d.desc}</span> : ""}
                            </li>
                            <li>
                              <div className="mr-3">
                                <Input
                                  onChange={this.handleUpdatePrice}
                                  value={d.price}
                                  name={"Price"} 
                                  id={"price-"+i}
                                  placeholder="0.000"
                                  defaultValue={"0.000"}
                                />  
                              </div>
                            </li>
                            <li>
                              <div className="mr-3">
                                <Dropdown 
                                  placeholder="Select"
                                  options={overUnder}
                                  select={this.handleUpdateOverUnder}
                                />
                              </div>
                            </li>
                            <li>
                              <div>
                                <Dropdown 
                                  placeholder="Select"
                                  options={range}
                                  select={this.handleUpdateRange}
                                />
                              </div>
                            </li>
                          </ul>            
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="overlay" onClick={this.props.close}></div>
        </div>
    )
  }
}

export default Bids;
