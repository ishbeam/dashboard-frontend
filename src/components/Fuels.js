import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { prices } from '../data/fuel-prices';


class Fuels extends Component {



    render() {
        return (
            <div>
                <div className='full-width bg-black'>
                    <div className='container pt-4 pb-8'>
                        <h1 className='fontSize5 fontRegular white'>Prices</h1>
                    </div>

                </div>
                <div className="container">
                    <div id="table" className="card">
                        <div className='table-header prices-active'>
                            <ul>
                                <li>Fuel Type</li>
                                <li>Price</li>
                                <li>Trend</li>
                            </ul>
                        </div>
                        <div className='table-body prices-active'>
                            {prices.map((p, i) => {
                                return (
                                    <Link to={'/retailer/fuel/' + p.id} key={i}>
                                        <div className='row full-width pb-1 pt-1'>
                                            <ul>
                                                <li>{p.fuel_type}</li>
                                                <li>${p.price}</li>
                                                <li>{p.trend}</li>
                                            </ul>
                                        </div>

                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Fuels)