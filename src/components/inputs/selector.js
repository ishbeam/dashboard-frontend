import React, { useState, useEffect } from 'react';

import { Select } from 'baseui/select';

export default ({ options=[], placeholder='', onSelect, labelKey='label', valueKey='id' }) => {
    const [value, setValue] = useState([]);

    useEffect(() => {
        onSelect(value)
    }, [value])

    return (
        <div className='selector'>

            <Select
            
              options={options}
              value={value}
              placeholder={placeholder}
              labelKey={labelKey}
              valueKey={valueKey}
              onChange={params => setValue(params.value)}
            />
        </div>
    );
  }