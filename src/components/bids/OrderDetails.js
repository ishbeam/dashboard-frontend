import React from 'react';

const OrderDetails = () => {


    return (
        <div id="table" className="card grid1of3">
            <div className="inner_3">
                <h2 className="mt-0 pt-0 fontSemiBold">Order Details</h2>

                <div className="compact">
                    <label>Quantity</label>
                    <p>1000 Gallons</p>
                </div>
                <div className="compact">
                    <label>Product / Grade</label>
                    <p>Regular</p>
                </div>
                <div className="compact">
                    <label>Drop Date / Time</label>
                    <p>November 4, 2019 4-8pm</p>
                </div>
            </div>



        </div>
    )
}

export default OrderDetails