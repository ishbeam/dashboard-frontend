import React from 'react';
import ProgressBar from '../elements/ProgressBar';

const OrderProgressItem = ({ orderProgress, subtext='', label, title='', type, date, isBidAwarded }) => {


    function getIcon0() {
        if(type == 'pickup') return 'feather feather-arrow-up'
        if(type == 'dropoff') return 'feather feather-arrow-down'
        if(type == 'payment') return 'feather feather-arrow-up'
    }

    function getIcon() {
        if(type == 'pickup') return <span className="pickup"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></span>
        if(type == 'dropoff') return <span className="dropoff"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></span>
        if(type == 'payment') return <span className="payment mr-1"><h3 style={{height: 26, width: 26, backgroundColor: 'green', borderRadius: 13, textAlign: 'center', color:'white'}}>$</h3></span> //<span className="payment" color={'red'}><img color={'red'} style={{backgroundColor: 'red', color: 'white', borderRadius: 12, stroke: 'white', fill: 'white'}} height={26} width={26} fill='white' stroke='white' src={'https://www.flaticon.com/svg/vstatic/svg/74/74742.svg?token=exp=1610603257~hmac=bf4e67881e8ed86e7a9d088995e2da34'}/></span>
        
    }

    function getColor() {
        if(type == 'pickup' || type == 'dropoff') return '#2367e6'
        // return '#1faa00'
        return '#2367e6'
    }

    function getProgress() {
        if(type == 'payment') {
            if(!isBidAwarded) return { progress: 0, description: 'At Auction', title: 'At Auction' }
            if(!title || title.toLowerCase() == '') return { progress: 0.1, subtext: 'Waiting for Payment', title: 'Waiting' }
            if(title.toLowerCase() == 'pending') return { progress: 0.25, subtext: 'Pending', title: 'Pending' }
            if(title.toLowerCase() == 'funds approved') return { progress: 1, subtext: 'Funds Approved', title: 'In Escrow' }
        } else if(type == 'pickup') {
            if(orderProgress.pickup.enroute == 0) return { progress: 0.1, subtext: 'Awaiting Dispatch', title }
            if(orderProgress.pickup.arrived == 0) return { progress: 0.4, subtext: 'En Route', title }
            if(orderProgress.pickup.completed == 0) return { progress: 0.7, subtext: 'Arrived at Terminal', title }
            if(orderProgress.pickup.completed > 0) return { progress: 1, subtext: 'Pickup Complete', title }
        } else if(type == 'dropoff') {
            if(orderProgress.dropoff.enroute == 0) return { progress: 0.1, subtext: 'Waiting', title }
            if(orderProgress.dropoff.arrived == 0) return { progress: 0.4, subtext: 'En Route', title }
            if(orderProgress.dropoff.completed == 0) return { progress: 0.7, subtext: 'Arrived at Site', title }
            if(orderProgress.dropoff.completed > 0) return { progress: 1, subtext: 'Dropoff Complete', title }
        }

        return { progress: 0, subtext, title }
    }

    return (
        <div className="order-progress">
            <label>{label}</label>
            <div className="distribute distribute-start distribute-inline distribute-center pt-2 pb-2">
                {/* <span className={type}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={getIcon()}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></span> */}
                {getIcon()}
                <h3>{getProgress().title}</h3>
            </div>


            <ProgressBar color={getColor()} progress={getProgress().progress} height={8} total={"1"} />
            <h4>{getProgress().subtext}</h4>
            <p>{date}</p>
        </div>
    )
}
export default OrderProgressItem;