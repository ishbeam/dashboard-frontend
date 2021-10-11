import React from 'react';


const Avatar = props => {
  console.log(props);

  return (
    <div className="avatar uppercase mb-2">
     {props.firstName.charAt(0)}
     {props.lastName.charAt(0)}
    </div>
  );
};  


export default Avatar;
