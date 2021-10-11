import React, { useState, useEffect, Component } from 'react';
import { Input } from 'baseui/input';

import { Select } from 'baseui/select';
import { Button } from 'baseui/button';


const OPIS = 1.17

const SubmitBid = ({ products, onUpdateProducts, onSubmit }) => {

    const [total, setTotal] = useState(0.00)

    function updateProducts(key, value, index) {
        if(Array.isArray(value.value)) {
            value = value.value[0].plusminus
        }

        products[index][key] = value


        let mult = 0;
        let _total = 0
        // for(let i = 0; i < products.length; i++) {
        // if(products[i].plusminus.includes('+')) mult = 1;
        // else if(products[i].plusminus.includes('+')) mult = -1
        // debugger
        const TOTAL = (OPIS + Number(products[index].price)) * Number(products[index].quantity)
        console.log(TOTAL)
        // products[i].total = OPIS + products[i].
        if(TOTAL != NaN)
            _total += TOTAL
        // }
        setTotal(_total)

        onUpdateProducts(products)
    }

    console.log('PRODCTS O JERE', products)



    return (
        <div id="table" className="card grid1of3 mt-4">
            <div className="full-width">
                <div className="inner_3">
                    <h2 className="mt-0 pt-0 fontSemiBold">Submit Bid</h2>

                    <div className="distribute-vertical mb-2">
                        {products.map((p, i) => (
                            <div>
                                <div className="distribute distribute-between">
                                    <p>{p.fuel_type} x {p.quantity} gallons</p>
                                    <p>OPIS = ~ $1.17</p>
                                </div>
                                <div className="distribute-inline">
                                    <Input
                                        onChange={(e) => updateProducts('price', e.target.value, i)}
                                        value={p.price}
                                        type="text"
                                        placeholder="0.02"
                                        startEnhancer={'$'}
                                    />
                                    <Select
                                        options={[{ plusminus: 'OPIS +' }, { plusminus: 'OPIS -' }]}
                                        value={[p]}
                                        labelKey={'plusminus'}
                                        valueKey={'plusminus'}
                                        onChange={(value) => updateProducts('plusminus', value, i)}
                                    />
                                </div>
                            </div>

                        ))}
                    </div>


                    <div className="full-width">
                        {/* <p>instead of all the taxes here, how about Total Fees line and you can click it to pop up a toast to view all taxes</p> */}

                        {/* <Select
                            options={terminals}
                            labelKey='name'
                            valueKey='name'
                            value={[selectedTerminal]}
                            onChange={({ value }) => selectTerminal(value[0])}
                        /> */}

                        <div className="full-width clearfix border-top">
                            <div className="distribute distribute-between pt-2 ">
                                <div className="fontSemiBold pr-2 ">Order Total</div>
                                <div className="fontSemiBold">${total.toFixed(0)}</div>
                                <Button onClick={onSubmit}>Submit Bid</Button>
                            </div>
                        </div>


                    </div>


                    {/* {(isBidSubmit) ?
                        <h3 style={{ textAlign: 'right', color: 'rgb(0,200, 40)', fontSize: 16, opacity: 0.5 }}>You bid ${this.state.price}</h3>
                        : <button className="primary button" onClick={this.onSubmitBid}>Submit</button> */}

                    {/* } */}
                </div>
            </div>
        </div>
    )
}

export default SubmitBid