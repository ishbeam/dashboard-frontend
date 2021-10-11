import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput, MaskedInput } from 'baseui/input';

import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

const MY_API_KEY = ""

const types = {
    email: {
        type: 'email',
        isValid: (text) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]/.test(text)
    },
    phone: {
        type: 'phone',
        isValid: (text) => /^[0-9]{10}/.test(text)
    },
    password: {
        type: 'password',
        isValid: (text) => /^[a-zA-Z0-9]/.test(text)
    },
    text: {
        type: 'text',
        isValid: (text) => true
    },
    none: {
        type: 'none',
        isValid: (text) => true
    }
}

export function Input({ value, type, ...rest }) {

    // const { value, type } = props;
    let _isValid = types[type].isValid(value);

    // If user hasnt entered anything, its not an error
    if(value.length < 1) {
        _isValid = true;
    }

    const [isValid, setIsValid] = useState(_isValid)

    // Check validation onBlur
    function onBlur() {
        setIsValid(types[type].isValid(value))
    }

    if(type === 'phone') {
        return(
            <MaskedInput 
                error={!isValid}
                value={value}
                mask='(999) 999-9999'
                onBlur={onBlur}
                {...rest}
            />
        )
    }

    return(
        <BaseInput 
            {...rest}
            error={!isValid}
            value={value}
            onBlur={onBlur}
        />
    )
}

export function AddressInput({ defaultValue='', placeholder, onChange, onSelectSuggest, ...rest }) {

    const [address, setAddress] = useState(defaultValue)

    const [isValid, setIsValid] = useState(true)

    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    function _onSelectSuggest(geoPrediction, originalPrediction) {
        const coords = {
            lat: geoPrediction.geometry.location.lat(),
            lng: geoPrediction.geometry.location.lng()
        }

        setAddress(geoPrediction.formatted_address)
        onSelectSuggest(geoPrediction.formatted_address, coords, geoPrediction)

        setIsSelected(true)
        setIsValid(true)
    }

    function _onChangeText(e) {
        setIsSelected(false)
        setShowSuggestions(true)
        setAddress(e.target.value)
        onChange(e.target.value)
    }

    // Suggestions are shown, which means suggestion is NOT selected
    function _onFocus() {
        setShowSuggestions(true)
    }

    function _onBlur() {
        // if blurred and suggestion wasnt selected, then its not valid
        if(!isSelected) {
            setIsValid(false)
        }
        setTimeout(() => {
            setShowSuggestions(false)
        }, 250)
    }

    // NOTE error is based on isSelected being true, but need to account for if
    // address doesnt show up and needs to be overridden
    return(
        <div>
            <BaseInput
                onChange={_onChangeText}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={address} 
                autoComplete="off"
                type="text"
                error={!isValid}
                onFocus={_onFocus}
                onBlur={_onBlur}
            />

            {showSuggestions && 
              <ReactGoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                  googleMaps && (
                    <ReactGooglePlacesSuggest
                      googleMaps={googleMaps}
                      autocompletionRequest={{
                          input: address,
                          // Optional options
                          // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                      }}
                      {...rest}
                      onSelectSuggest={_onSelectSuggest}
                      textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                      customRender={prediction => (
                          <div className="search-result">
                              {prediction
                                  ? prediction.description
                                  : ""}
                          </div>
                      )}
                    >
                    </ReactGooglePlacesSuggest>
                  )}
                />
              }
        </div>
    )
}

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.oneOf(['email', 'phone', 'text', 'password', 'none']),
    onChange: PropTypes.func
}

Input.defaultProps = {
    value: '',
    placeholder: '',
    defaultValue: '',
    type: 'none'
}