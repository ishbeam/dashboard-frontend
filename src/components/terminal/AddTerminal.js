import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

import DirectionsMap from '../elements/DirectionsMap';
import Map from '../elements/Map';

import { AddressInput } from '../elements/AddressInput';
import { Select, TYPE } from 'baseui/select';

import { create } from '../../api/terminals';

const fuels = [{ type: 'Regular' }, { type: 'Plus' }, { type: 'Premium' }, { type: 'Diesel' }]

class AddTerminal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            terminal: {
                name: '',
                address: '',
                location: { type: 'Point', coordinates: [] },
                suppliers: []
            }
        }
    }

    componentDidMount() {

    }

    addSupplier = () => {
        this.state.terminal.suppliers.push({ name: '', coId: '', fuels: [] })
        this.setState({ terminal: this.state.terminal })
    }

    editTerminal(key, value) {
        this.setState({
            terminal: {
                ...this.state.terminal,
                [key]: value
            }
        })
    }

    editSupplier = (key, value, index) => {
        let { terminal } = this.state
        terminal.suppliers[index][key] = value;

        console.log(terminal)
        this.setState({ terminal })
    }

    onChangeAddress = (address, coords) => {
        this.setState({
            terminal: {
                ...this.state.terminal,
                address: address,
                location: {
                    type: 'Point',
                    coordinates: [coords.lng, coords.lat]
                }
            }
        })
    }

    onSubmit = () => {
        const { terminal } = this.state;
        console.log(terminal)

        for(let i = 0; i < terminal.suppliers.length; i++) {
            terminal.suppliers[i].fuels = terminal.suppliers[i].fuels.map(f => f.type)
        }
        create(terminal).then(({ data }) => {
            console.log(data)
            this.props.history.goBack()
        }).catch(e => console.log(e))
    }


    render() {
        const { terminal } = this.state;
        console.log(terminal.address)

        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Add Terminal</h1>
                    </div>
                </div>

                <div className="container">

                    <Input placeholder="Terminal Name" onChange={(evt) => this.editTerminal('name', evt.target.value)} name="Name" />
                    {/* <Input placeholder="Address" onChange={(evt) => this.editTerminal('address', evt.target.value)} name="Address" /> */}
                    <h3>Google Maps here</h3>

                    <AddressInput
                        placeholder={'Address'}
                        onChange={(val) => console.log(val)}//this.editTerminal('address', val)}
                        defaultValue={terminal.address}
                        onSelectSuggest={this.onChangeAddress}
                    />
                    {terminal.address != '' && <Map lat={terminal.location.coordinates[1]} lng={terminal.location.coordinates[0]} />}


                    <h1>Suppliers (different from Supplier as we know it, they call them suppliers, they're basically the same as "brands of fuel")</h1>



                    {terminal.suppliers.map((s, i) => (
                        <div className="container">
                            <Input placeholder="Name" onChange={(evt) => this.editSupplier('name', evt.target.value, i)} name="Name" />
                            <Input placeholder="Company Id (internal reference)" onChange={(evt) => this.editSupplier('coId', evt.target.value, i)} name="CompanyId" />

                            <Select
                                placeholder={'Select Fuels for this Brand (supplier whatever)'}
                                options={fuels}
                                labelKey={'type'}
                                valueKey={'type'}
                                type={TYPE.search}
                                onChange={({ value }) => this.editSupplier('fuels', value, i)}
                                value={s.fuels}
                                multi
                            />

                        </div>
                    ))}

                    <Button className="primary button" onClick={this.addSupplier}>Add Supplier</Button>
                </div>

                <Button className="secondary button" onClick={this.props.history.goBack} >Cancel</Button>
                <Button className="primary button" onClick={this.onSubmit}>Submit</Button>
            </div>
        )
    }
}

export default withRouter(AddTerminal)