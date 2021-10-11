import React, { Component } from 'react';
import { Link, Redirect, Route, Switch, BrowserRouter, withRouter } from 'react-router-dom';

// import { prices } from '../../data/fuel-prices';

// import PrivateRoute from '../auth/PrivateRoute';

import Nav from '../Nav';

import Bids from '../bids/Bids';
import BidDetails from '../bids/BidDetails';
// import Orders from './Orders';
import Orders from '../order/Orders';
import OrderDetails from './OrderDetails';
import Terminals from '../terminal/Terminals';
import AddTerminal from '../terminal/AddTerminal';
import Drivers from '../drivers/Drivers'
import AddDriver from '../drivers/AddDriver'


import { withContext } from '../../context/provider';

// const NavBar = new Nav()

class Supplier extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: 0
        }

    }

    componentDidMount() {
        const { context, location } = this.props;

        if (context.isAuthenticated) {
            let route = this.props.location.pathname || '/supplier/bids';
            if(route == '/supplier') route = '/supplier/bids';

            this.props.history.push(route)
        } else {
            // this.props.history.push('/login')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.context.user.isAuthenticated && this.props.context.user.isAuthenticated) {
            this.props.history.push(`/supplier/bids`)
        }
    }

    render() {

        return (
            <div >
                <Route exact path='/supplier/orders' render={({ match }) => (
                    <div>
                        <Nav />
                        <Orders match={match} />
                    </div>
                )} />

                <Route exact path='/supplier/orders/:id' render={({ match }) => (
                    <div>
                        <Nav />
                        <OrderDetails orderId={match.params.id} />
                    </div>
                )} />

                <Route exact path='/supplier/bids' render={({ match }) => (
                    <div>
                        <Nav />
                        <Bids match={match} />
                    </div>
                )} />

                <Route exact path='/supplier/bids/:id' render={({ match }) => (
                    <div>
                        <Nav />
                        <BidDetails orderId={match.params.id} />
                    </div>
                )} />
                
                <Route exact path='/supplier/terminals' render={({ match }) => (
                    <div>
                        <Nav />
                        <Terminals />
                    </div>
                )} />
                
                <Route exact path='/supplier/terminals/add' render={({ match }) => (
                    <div>
                        <Nav />
                        <AddTerminal />
                    </div>
                )} />
                
                <Route exact path='/supplier/drivers' render={({ match }) => (
                    <div>
                        <Nav />
                        <Drivers />
                    </div>
                )} />
                
                <Route exact path='/supplier/drivers/add' render={({ match }) => (
                    <div>
                        <Nav />
                        <AddDriver />
                    </div>
                )} />


                {/* <Redirect to='/retailer/def'/> */}
            </div>
        )
    }
}

export default withContext(withRouter(Supplier))