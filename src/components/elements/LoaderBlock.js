import React from 'react';

const LoaderBlock = props => {
  return (
     	<div className="loader-block shimmer" style={{width: props.width, height: props.height, marginBottom: props.marginBottom}}>
        </div>
  );
};  


export default LoaderBlock; 
