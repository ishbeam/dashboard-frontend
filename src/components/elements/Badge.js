import React from 'react';

function timeleft(left){
	// let left = calcTimeLeft(time)


	// let timeDiff = Math.random() * 10;  
  	// console.log(timeDiff)
  	if(left >= 60){
  		return "success"
  	}
  	if(left < 60 && left >= 30){
  		return "warning"
  	}
  	if(left < 30){
  		return "error"
  	}

 	return "";

}

// function calcTimeLeft(time) {
// 	const timeleft = time - Date.now()

// 	return (timeleft / 1000 / 60 / 60).toFixed(0)
// }

const Badge = props => {
  // console.log(props);

  return (
    <div className={"badge " + timeleft(props.minsLeft)}>
     	{props.minsLeft} Mins Left
    </div>
  );
};  


export default Badge;
