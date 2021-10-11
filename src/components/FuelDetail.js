import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { withContext } from '../context/provider';

class FuelDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <div className='full-width bg-black'>
                    <div className='container pt-4 pb-8'>
                        <h1 className='fontSize5 fontRegular white'>Fuel Detail</h1>
                    </div>
                </div>

            </div>
        )
    }
}

export default withContext(withRouter(FuelDetail))