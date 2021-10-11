import React from 'react';
import PropTypes from 'prop-types';


const Input = ({ name, type, defaultValue, onChange }) =>
    <div class="input-group">      
        <input 
            type={type}
            onChange={onChange}
            defaultValue={defaultValue}
            required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
    </div>;
export default Input;
