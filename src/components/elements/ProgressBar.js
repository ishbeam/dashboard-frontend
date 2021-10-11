import React from 'react';

const ProgressBar = ({color, progress, height, total}) =>
  <div className="progressbar clearfix">
    <div className="progressbar--container">
      <div className="progressbar--bar" style={{backgroundColor: color, height: height, width: (((progress/total)*100)+'%') }}>
      </div>
    </div>
  </div>;
export default ProgressBar;
