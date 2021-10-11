import React from 'react';
import DirectionsMap from '../elements/DirectionsMap';

const HaulDetails = ({ terminal, site }) => {

  let start, end;
  try {
    start = { lat: terminal.location.coordinates[1], lng: terminal.location.coordinates[0] }
  } catch(e) {
    start = { lat: 0, lng: -0 }
  }
  
  try {
    end = { lat: site.location.coordinates[1], lng: site.location.coordinates[0] }
  } catch(e) {
    
    end = { lat: 0, lng: -0 }
  }


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

export default HaulDetails