import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderProgress from '../elements/OrderProgress';

import OrderProgressItem from '../order/OrderProgressItem';

import { formatDate } from '../../util/datetime'
import { getDistanceLatLng } from '../../util/latlng'
import { getStatus } from '../../api/payments';

function parseAddress(addy) {
    if(typeof (addy) != 'string') return ''

    const chunks = addy.split(',')

    return chunks[1] + ', ' + chunks[2]
}

export default class OrderItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            order: props.order,
            paymentStatus: ''
        }
    }

    async componentDidMount() {
        if(!this.props.order.awarded_bid) {
            this.setState({ paymentStatus: 'At Auction' })
        } else {
            this.getPaymentStatus()
        }
    }

    async getPaymentStatus() {
        const { data } = await getStatus(this.props.order._id)
        console.log(data)

        this.setState({ paymentStatus: data })
    }


    render() {
        const { paymentStatus, order: d } = this.state;
        const { companyType } = this.props;

        console.log('THE ORDER', d)
        if(!d._id) {
            return <div></div>
        }

        return (
            <div className="card mb-2" >
                <Link to={`/${this.props.companyType}/orders/` + d._id}>
                    <div className="row full-width mb-2 inner_3 clearfix">
                        <div className="grid1of4">
                            <div className="order-progress">
                                {/* <label>Distributor</label> */}
                                <div className="distribute-start">
                                    <h3>{(companyType == 'retailer') ? d.supplier?.name : d.retailer?.name}</h3>

                                    <h4>{d.awarded_bid?.total_quantity} Gallons</h4>

                                    <h3>${d.awarded_bid?.total_price}</h3>
                                    <div className='pt-2'>

                                    </div>
                                    <p>{formatDate(d.deadline)}</p>

                                </div>
                            </div>
                        </div>

                        <div className="grid1of4">
                            <OrderProgressItem
                                label="Payment Status"
                                title={paymentStatus}
                                type='payment'
                                description="   "
                                date={formatDate(d.deadline)}
                                isBidAwarded={d.awarded_bid != null}
                                orderProgress={d.progress}
                            />
                        </div>
                        <div className="grid1of4">
                            <OrderProgressItem
                                label="Pickup Location"
                                title={parseAddress(d.pickup?.address)}
                                // subtext={parseAddress(d.pickup?.address)}
                                date={formatDate(d.deadline)}
                                type='pickup'
                                isBidAwarded={d.awarded_bid != null}
                                orderProgress={d.progress}
                            />
                        </div>
                        <div className="grid1of4">
                            <OrderProgressItem
                                label="Dropoff Location"
                                type='dropoff'
                                // subtext={parseAddress(d.dropoff?.address)}
                                title={parseAddress(d.dropoff?.address)}
                                isBidAwarded={d.awarded_bid != null}
                                date={formatDate(d.deadline)}
                                orderProgress={d.progress}
                            />
                        </div>

                    </div>
                </Link>
            </div>
        )
    }
}