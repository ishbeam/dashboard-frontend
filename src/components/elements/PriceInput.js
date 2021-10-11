import React, { useState, useEffect } from 'react';
import { Input } from 'baseui/input';


export default function PriceInput({ index, update }) {

    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    function onSetPrice(e) {        
        const p = e.target.value;

        // if all numbers
        if(/^[0-9]*$/.test(p)) {
            setPrice(p)
            setStatus('positive')
            update(index, { price: p, description })
        }
    }

    function onSetDescription(e) {
        setDescription(e.target.value)
        update(index, { price, description: e.target.value })
    }

    // function onBlur(e) {
    //     if(price == '' || price == 0) {
    //         setStatus('error')
    //     }
    // }

    return(
        <div key={index} className="grid1of1 mr-0 mb-1 inline-block"> 
            <div className="distribute distribute-center distribute-horizontal">
                <div className="fontRegular fontSize1 mr-2">{index + 1}.</div>
                <div className="grid5of12">
                    <Input
                    onChange={onSetPrice}
                    placeholder='10'
                    startEnhancer="$"
                    endEnhancer=".00"
                    value={price}
                    />
                </div>
                <div className="grid7of12">
                    <Input
                    className="grid1of4"
                    onChange={onSetDescription}
                    placeholder='Baby food'
                    value={description}  
                    />    
                </div>
            </div>
        </div> 
    )
}