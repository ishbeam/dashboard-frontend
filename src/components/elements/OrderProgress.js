import React from 'react';
import ProgressBar from './ProgressBar';

function titleType(title) {
  // if(title)
}

const OrderProgress = ({ label, title, location, progress, description, date }) => {

  

  return (
    <div className="order-progress">
      <label>{label}</label>
      {(location != null) ?
        <div>
          <div className="distribute distribute-start distribute-inline distribute-center pt-2 pb-2">
            {(location == "pickup") ? <span className="pickup"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></span> : <span className="dropoff"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></span>}
            <h3>{title}</h3>
          </div>
        </div>
        : <div className="distribute distribute-start distribute-inline distribute-center pt-2 pb-2">
          <span className="payment"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></span>
          <h3 >{title}</h3>
        </div>}

      <ProgressBar color={(label == "Payment Status") ? "#1faa00" : "#2367E6"} progress={progress} height={4} total={"1"} />
      <h4>{description}</h4>
      <p>{date}</p>
    </div>
  )
}
export default OrderProgress;
