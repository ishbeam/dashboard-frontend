import React, { Component } from 'react';
import DirectionsMap from '../elements/DirectionsMap';
import Map from '../elements/Map';

import { getDistanceLatLng } from '../../util/latlng';

import { Select } from 'baseui/select';

class HaulDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    getDistance() {
        const { selectedTerminal, dropoff } = this.props

        if(selectedTerminal.location.coordinates.length < 1) return ''
        if(!dropoff || dropoff.location.coordinates.length < 1) return ''

        return getDistanceLatLng(
            selectedTerminal.location.coordinates[1],
            selectedTerminal.location.coordinates[0],
            dropoff.location.coordinates[1],
            dropoff.location.coordinates[0]
        ) + ' miles'
    }


    render() {
        const { terminals, selectedTerminal, dropoff } = this.props;

        return (

            <div className="full-width">
                <div className="grid1of3">
                    <div className="inner_3">
                        <h2 className="mt-0 pt-0 fontSemiBold">Haul Details</h2>

                        <div className="compact">
                            <label>Distance from Terminal</label>
                            <p>{this.getDistance()}</p>

                        </div>

                        <div className="compact">
                            <label>Haul Rate</label>
                            <p>$0.00</p>
                        </div>
                        <div className="compact">
                            <p >Pickup Terminal</p>
                            <Select
                                options={terminals}
                                labelKey='name'
                                valueKey='name'
                                value={[selectedTerminal]}
                                onChange={({ value }) => this.props.onSelectTerminal(value[0])}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid2of3">
                    {selectedTerminal.location.coordinates.length > 0
                        ? <DirectionsMap
                            startCoords={{ lat: selectedTerminal.location.coordinates[1], lng: selectedTerminal.location.coordinates[0] }}
                            endCoords={{ lat: dropoff.location.coordinates[1], lng: dropoff.location.coordinates[0] }}
                        />
                        : <Map lat={47} lng={-122} />
                    }

                </div>
            </div>
        )
    }
}

export default HaulDetails