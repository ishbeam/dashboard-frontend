import React, { Component, useState } from 'react';
import { withRouter, Redirect, Link, Route } from 'react-router-dom';
import { withContext } from '../../context/provider';
import Switcher from '../elements/Switcher';
import { formatDate } from '../../util/datetime';

import OrderProgress from '../elements/OrderProgress';
import { Button, SIZE, SHAPE, KIND } from 'baseui/button'

import { get } from '../../api/orders';

import CreateOrder from '../retailer/CreateOrder'
import OrderItem from '../order/OrderItem';


const OPIS = 1.17

// let options = [
//     { name: "Open" },
//     { name: "Fulfilled" }
// ]

// function parseAddress(addy) {
//     if(typeof (addy) != 'string') return ''

//     const chunks = addy.split(',')

//     return chunks[1] + ', ' + chunks[2]
// }

class Orders extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: 0,
            orders: [],
            total: 0
        }

        console.log('props', props)

        this.getOrders = get.bind(this)
    }

    componentDidMount() {
        this.getOrders('active').then(({ data }) => {

            console.log('ORDERS retail', data)
            this.setState({ orders: data.reverse() })
        }).catch(e => console.log(e))
    }

    render() {
        const { orders, activeTab } = this.state;
        const { user } = this.props.context
        console.log('USER', user)
        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Orders</h1>
                        <div className="distribute distribute-between">

                            <div>
                                <Button
                                    onClick={() => this.setState({ activeTab: 0 })}
                                    kind={(activeTab == 0) ? KIND.secondary : KIND.primary}
                                    size={SIZE.large}
                                    shape={SHAPE.pill}>Active</Button>
                                <Button
                                    onClick={() => this.setState({ activeTab: 1 })}
                                    style={{ marginLeft: '0.5em' }}
                                    kind={(activeTab == 0) ? KIND.primary : KIND.secondary}
                                    size={SIZE.large}
                                    shape={SHAPE.pill}>Fulfilled</Button>

                            </div>

                            {(user?.company?.type == 'retailer') &&
                                <Link to={'/retailer/create-order'} >
                                    <Button kind={KIND.secondary} size={SIZE.large} shape={SHAPE.pill}>Create Order</Button>
                                </Link>
                            }

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
                        return (
                            <OrderItem companyType={this.props.context.user.company.type} order={d} />
                        )
                    })}

                </div>

                {(user?.company?.type == 'retailer') &&
                    <Route exact path='/retailer/create-order' render={({ match }) => (
                        <div>
                            <CreateOrder match={match} />
                        </div>
                    )} />
                }


            </div>
        )
    }
}

export default withContext(Orders);
