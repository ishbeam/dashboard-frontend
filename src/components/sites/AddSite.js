import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import Input from '../elements/Input';
import DirectionsMap from '../elements/DirectionsMap';
import Map from '../elements/Map';

import { AddressInput } from '../elements/AddressInput';

import { Button, TYPE } from 'baseui/button';
import { Input } from 'baseui/input';

import { create } from '../../api/sites';

const fuels = [{ type: 'Regular' }, { type: 'Plus' }, { type: 'Premium' }, { type: 'Diesel' }]

class AddSite extends Component {

    constructor(props) {
        super(props)

        this.state = {
            site: {
                name: '',
                address: '',
                location: { type: 'Point', coordinates: [] }

            }
        }
    }

    componentDidMount() {

    }



    editSite(key, value) {
        this.setState({
            site: {
                ...this.state.site,
                [key]: value
            }
        })
    }


    onChangeAddress = (address, coords, geo) => {
        console.log('ADDY', geo)
        this.setState({
            site: {
                ...this.state.site,
                address: address,
                location: {
                    type: 'Point',
                    coordinates: [coords.lng, coords.lat]
                }
            }
        })
    }

    onSubmit = () => {
        const { site } = this.state;
        console.log(site)

        // for(let i = 0; i < terminal.suppliers.length; i++) {
        //     terminal.suppliers[i].fuels = terminal.suppliers[i].fuels.map(f => f.type)
        // }
        create(site).then(({ data }) => {
            console.log(data)
            this.props.history.goBack()
        }).catch(e => console.log(e))
    }


    render() {
        const { site } = this.state;
        console.log(site.address)

        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Add Site</h1>
                    </div>
                </div>

                <div className="container">

                    <Input placeholder="Site Name" onChange={(evt) => this.editSite('name', evt.target.value)} name="Name" />
                    {/* <Input placeholder="Address" onChange={(evt) => this.editTerminal('address', evt.target.value)} name="Address" /> */}
                    <h3>Google Maps here</h3>

                    <AddressInput
                        placeholder={'Address'}
                        onChange={(val) => console.log(val)}//this.editTerminal('address', val)}
                        defaultValue={site.address}
                        onSelectSuggest={this.onChangeAddress}
                    />
                    {site.address != '' && <Map lat={site.location.coordinates[1]} lng={site.location.coordinates[0]} />}


                    {/* <h1>Suppliers (different from Supplier as we know it, they call them suppliers, they're basically the same as "brands of fuel")</h1> */}





                </div>

                <Button onClick={this.props.history.goBack} >Cancel</Button>
                <Button onClick={this.onSubmit}>Submit</Button>
            </div>
        )
    }
}

export default withRouter(AddSite)