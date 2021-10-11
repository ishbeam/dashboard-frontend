import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { find as findDrivers } from '../../api/users';

class Drivers extends Component {

    constructor(props) {
        super(props)

        this.state = {
            drivers: []
        }
    }

    async componentDidMount() {

        const { data } = await findDrivers({ 'company.role': 'driver' })

        this.setState({ drivers: data })
    }

    render() {
        const { drivers } = this.state;

        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Drivers</h1>
                    </div>
                </div>

                <div className="container ">
                    {drivers.map((d) => (
                        <div onClick={(e) => console.log('navigate to driver detail')}>
                            <h1 style={{color: 'red'}} >{d.name}</h1>
                        </div>
                    ))}
                </div>
                <button className="primary button" onClick={() => this.props.history.push('/supplier/drivers/add')}>Add Drivers</button>
            </div>
        )
    }
}

export default withRouter(Drivers)