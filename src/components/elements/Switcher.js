import React from 'react';
import PropTypes from 'prop-types';


const Switcher = ({ options, active, toggle }) =>
    <div className="switcher">
        <div className="fieldset">
           <ul>
            {options.map((d,i) => {
                return(
                    <li className={(i === active) ? "active" : ''} onClick={() => toggle(i)} key={i}>{d.name}</li>
                );
            })}
            <div className="switch" style={{left: ((active/options.length) * 100)+"%", marginLeft: ((active == 0) ? "4px" :'') }}></div>
            </ul>
        </div>
    </div>;
export default Switcher;
