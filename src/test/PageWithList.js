import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withContext } from '../context/provider';

import Accordion from './AccordionTable';
// import { b } from '../../data/bids';
// import { s } from '../../data/standingPricing';

// import Badge from '../elements/Badge';
// import Bids from '../elements/Bids';


class PageWithList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.onOpenRow = this.onOpenRow.bind(this)
    }

    componentDidMount() {


    }

    onOpenRow() {

    }


    render() {

        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontRegular white">Page With List</h1>


                    </div>
                </div>

                <div className="container">
                    <div  className="accordion-table card">

                        <div className="table-header bids-active">
                            <ul>
                                <li>Ordr #</li>
                                <li>Gal</li>
                                <li>Product / Grade</li>
                                <li>Drop Date & Time</li>
                                <li>Haul Dist & Rate</li>
                                <li>Status</li>
                            </ul>
                        </div>


                       {(['', '', ''].map((d) => {
                           return(
                               <Accordion />
                           )
                       }))}



                        {/* <div className="table-body bids-active">
                            {['', '', ''].map((d, i) => {
                                return (
                                    <Link to={'/supplier/bids/' + d._id}>
                                        <div className="row">
                                            <ul>
                                                <li>
                                                    <div><h1>bruhhhh</h1></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div> */}

                    </div>
                </div>

            </div>
        )
    }
}

export default PageWithList;
