import React, { Component } from 'react';
import { Link, Redirect, Route, withRouter } from 'react-router-dom';


import Nav from '../Nav';
import Fuels from '../Fuels';
import FuelDetail from '../FuelDetail';
// import Orders from './Orders';
import Orders from '../order/Orders';
import OrderDetails from './OrderDetails';
import CreateOrder from './CreateOrder';
import Sites from '../sites/Sites'
import AddSite from '../sites/AddSite'

import { withContext } from '../../context/provider';


class Retailer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: 0
        }

        this.handleSelectSwitcher = this.handleSelectSwitcher.bind(this)
    }
    componentDidMount() {
        // const { context, location } = this.props;
        // console.log('we litttt', context.user)

        // if (context.isAuthenticated) {
        //     this.props.history.push('/retailer/orders')
        // }

        const { context, location } = this.props;
        console.log('location', this.props.location)
        if (context.isAuthenticated) {
            // console.log('pathname ', )
            let route = this.props.location.pathname || '/retailer/orders';
            if (route == '/retailer') route = '/retailer/orders';

            this.props.history.push(route)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.context.user.isAuthenticated && this.props.context.user.isAuthenticated) {
            this.props.history.push(`/retailer/orders`)
        }
    }

    handleSelectSwitcher(activeTab) {
        this.setState({ activeTab })
    }

    render() {
        const { activeTab } = this.state;
        const { user, isAuthenticated } = this.props.context;

        // if(!isAuthenticated) {
        //     return(
        //         <div></div>
        //     )
        // }

        return (
            <div>



                <Route exact path='/retailer/fuels' render={({ match }) => (
                    <div>
                        <Nav />
                        <Fuels match={match} />
                    </div>
                )} />

                <Route exact path='/retailer/fuels/:id' render={({ match }) => (
                    <div>
                        <FuelDetail match={match} />
                    </div>
                )} />

                <Route exact path='/retailer/orders' render={({ match }) => (
                    <div>
                        <Nav />
                        <Orders match={match} url={'urlbro'} />
                    </div>
                )} />

                <Route exact path='/retailer/orders/:id' render={({ match }) => (
                    <div>
                        <Nav />
                        <OrderDetails orderId={match.params.id} />
                    </div>
                )} />

                <Route exact path='/retailer/create-order' render={({ match }) => (
                    <div>
                        <Nav />
                        <CreateOrder match={match} />
                    </div>
                )} />
                
                <Route exact path='/retailer/sites' render={({ match }) => (
                    <div>
                        <Nav />
                        <Sites />
                    </div>
                )} />
                
                <Route exact path='/retailer/sites/add' render={({ match }) => (
                    <div>
                        <Nav />
                        <AddSite />
                    </div>
                )} />


                <Route exact path='/retailer/ghi' render={() => (
                    <div>
                        <h1>DEF ROUTE</h1>
                    </div>
                )} />

                {/* <Redirect to='/retailer/def'/> */}

            </div>
        )
    }
}

export default withContext(withRouter(Retailer))