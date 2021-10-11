import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Dropdown extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      value: ''
    }
  }

  toggleDropdown = () => {
    if(this.state.open){
      this.setState({active: '', open: false});

    } else {
      this.setState({active: 'active', open: true});
    }
  }

  handleSelect = (d, i) => {
  	this.setState({value: d.option, open: false, active: '',})
  	this.props.select(d,i);
  }

  render() {
  	let options = this.props.options;
    return (
        <div className="dropdown">
          <div className="dropdown--trigger" onClick={this.toggleDropdown}>
          	<div className="distribute distribute-between">
          		<div>{(this.state.value === "") ? this.props.placeholder : this.state.value}</div>
          		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

          	</div>
          </div>
          <div> 
            <div className={"dropdown--content " + this.state.active}>
              <ul className="list">
                {options.map((d,i) =>{
                	return(
                		<div className="option pb-1" onClick={() => this.handleSelect(d,i)}>{d.option}</div>		
                	)
                })}
                
                


              </ul> 
            </div>
            {(this.state.active) ? <div className={"dropdown--overlay " + this.state.active} onClick={this.toggleDropdown}></div> : ''}
          </div>
        </div>
    );
  }
}


export default Dropdown;
