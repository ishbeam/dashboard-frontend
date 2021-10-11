import React, { Component } from 'react';
import Login from '../components/auth/Login';

import { authenticate } from '../api/auth';

const Context = React.createContext()


const STATUS = {
    PENDING: 'pending',
    ERROR: 'error',
    SUCCESS: 'success'
}


const user = {
    _id: Date.now(),
    type: 'supplier'
}

export default class Provider extends Component {
    constructor() {
        super()

        this.state = {
            isAuthenticated: false,
            status: STATUS.PENDING,
            user: {}//user,
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        authenticate().then(({ data }) => {
            if(!data.user) {
                return this.setState({ status: STATUS.ERROR, isAuthenticated: false })
            }
            return this.setState({ user: data.user, isAuthenticated: true, status: STATUS.SUCCESS })
        }).catch(e => {
            console.log(e)
            this.setState({ status: STATUS.ERROR, isAuthenticated: false })
        })
    }

    setUser(user) {
        if(!user) return;

        // TEST ------------ If you want to test as a retailer, uncomment this line below
        // user.type = 'retailer';
        // TEST ------------
        this.setState({ user, isAuthenticated: true })
    }

    render() {
        const value = {
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            setUser: user => this.setUser(user),
        }

        // if(!this.state.isAuthenticated && this.state.status === STATUS.ERROR) {
        //     return (
        //         <Context.Provider>
        //             <Login />
        //         </Context.Provider>
        //     )
        // }
        /**
         * By setting this isReady state var, we can ensure that we check if the user
         * is authenticated BEFORE any components are rendered. 
         * In other words, we only render components AFTER we check if the user is authenticated
         */
        return (
            <Context.Provider value={value} >
                {this.props.children}
                {/* {(this.state.status === STATUS.PENDING)
                    ? null
                    : this.props.children
                } */}
            </Context.Provider>
        )
    }
}

// export default withRouter(Provider)

export const Consumer = Context.Consumer;


export function withContext(Component) {
    return function UserManager(props) {
        return (
            <Context.Consumer >
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}