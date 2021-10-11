import React, { useState, useEffect } from 'react';
import { Input } from 'baseui/input';

/**
 * @rules on onChange, run it thru the rules and prevent the change
 * The structure of a "rule" passes previous and current value to the user to calculate with
 */

export default ({ type, placeholder, onChange, rule, ...rest }) => {

    const [text, setText] = useState('')

    function _onChange(e) {
        const { value } = e.target;
        const previous = text;

        let textToShow = value

        debugger
        if(rule) {
            textToShow = rule(previous, value)
        }
        
        setText(textToShow)
    }

    function getType() {
        // switch(type) {
        //     case 'number':
                
        // }
    }

    useEffect(() => {
        onChange(text)
    }, [text])

    return (
        <Input
            type={''}
            onChange={_onChange}
            placeholder={placeholder}
            {...rest}
        />
    )

}