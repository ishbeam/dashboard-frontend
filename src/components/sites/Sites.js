import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'baseui/button';

import { list as listSites } from '../../api/sites';

class Sites extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sites: []
        }
    }

    componentDidMount() {
        listSites().then(({ data }) => {
            console.log('SITES', data)
            this.setState({ sites: data })
        })
    }

    render() {
        const { sites } = this.state;

        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Sites</h1>
                    </div>
                </div>

                <div className="container ">
                    {sites.map((s) => (
                        <div className="card inner_2 mb-2" onClick={(e) => console.log('navigate to site detail')}>
                            <h1>{s.name}</h1>
                        </div>
                    ))}
                    <Button onClick={() => this.props.history.push('/retailer/sites/add')}>Add Site</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Sites)