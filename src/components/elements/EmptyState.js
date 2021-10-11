import React from 'react';
import {  Link  } from "react-router-dom";

function getIllustration(img){
  	switch (img) { 
	  	case 'bag':
	    	return "/img/illustration/bag.png";
	    case 'creditcard':
	    	return "/img/illustration/cards.png";
	    case 'allcaughtup':
	    	return "/img/illustration/coffee.png";
	    case 'reports':
	    	return "/img/illustration/documents.png";
	    case 'success':
	    	return "/img/illustration/done.png";
	    case 'error':
	    	return "/img/illustration/error.png";
	    case 'images':
	    	return "/img/illustration/images.png";
	    case 'location':
	    	return "/img/illustration/location.png";
	    case 'message':
	    	return "/img/illustration/message.png";
	    case 'search':
	    	return "/img/illustration/search.png";

	    default:
	    	return "";
	}
}



const EmptyState = props => {
  return (
     	<div className="form--container pt-2 mb-2">
          <div className="distribute distribute-vertical distribute-center mt-2 empty-state">
            <img className="illustration" src={getIllustration(props.illustration)} />
            <h2 className="mb-6">{props.heading}</h2>
            <p className="fontSize0">{props.text}</p>
            {(props.buttonText != "") ?
            	<Link to={props.url}> 
	              <button>{props.buttonText}</button>
	            </Link>
        	: ''}
            
          </div>
        </div>
  );
};  


export default EmptyState; 
