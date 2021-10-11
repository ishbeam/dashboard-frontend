import React, { useState } from 'react';

const ToggleOptions = (props) => {

  const [showOptions, setShowOptions] = useState(false)

  function toggleOptions(){ 
    setShowOptions(!showOptions)
  }
 
  function share() {
    props.share()
    toggleOptions()
  }

  function publish() {
    props.publish()
    toggleOptions()
  }

  function download() {
    props.download()
    toggleOptions()
  }
  
  // The _ bc delete is a key word
  function _delete() {
    props.delete();
    toggleOptions();
  }
  
  return (
    <div>
      <div className="options-button_group">
        <button className="icon-button" onClick={toggleOptions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>

        <div className={"options-button_options " + ((showOptions) ? 'is-visible' : 'is-hidden' )}>
          <span>
            <ul className="options">
              <li onClick={share}>Share</li>
              <li onClick={publish}>{(props.isPublished) ? 'Unpublish' : 'Publish'} </li>
              <li onClick={download}>Download</li> 
              <li onClick={_delete}>Delete</li> 
            </ul>
          </span>

          <span>
            <div className="options-button_overlay" onClick={toggleOptions}></div>
          </span>
        </div>
      </div>
    </div>
  );
}


export default ToggleOptions;  
