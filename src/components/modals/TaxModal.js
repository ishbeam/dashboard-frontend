import React from 'react';

const TaxModal = ({ isOpen }) => {


    if(!isOpen) {
        return (
            <div className="full-width distribute distribute-between">
                <p>Taxes</p>
                <a><img src="https://i.pinimg.com/474x/53/fa/bf/53fabf5ac9ed557319a2a0fa5ae535d8.jpg" height='32px' width='auto' /></a>
            </div>

        )
    }

    return (
        <div>

            <div className="full-width mb-1 pt-1 clearfix">
                <div className="grid1of3 fontSemiBold">Fed Lust Tax</div>
                <div className="grid1of3 text-center">.184/gallon</div>
                <div className="grid1of3 fontSemiBold text-right">$1,230.50</div>
            </div>

            <div className="full-width mb-1 clearfix">
                <div className="grid1of3 fontSemiBold">CA Excise Tax</div>
                <div className="grid1of3 text-center">.475/gallon</div>
                <div className="grid1of3 fontSemiBold text-right">$4,123.50</div>
            </div>

            <div className="full-width mb-1 clearfix">
                <div className="grid1of3 fontSemiBold">CA Other Fees</div>
                <div className="grid1of3 text-center">184/gallon</div>
                <div className="grid1of3 fontSemiBold text-right">$1230.50</div>
            </div>
        </div>



    )
}

export default TaxModal