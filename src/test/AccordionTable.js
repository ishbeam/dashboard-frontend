import React, { Component } from 'react';
import { Link  } from "react-router-dom";



class AccordionTable extends Component  {

  constructor(props) {
    super(props)


    this.state = {
      isOpen: false,
    }

    this.onToggle = this.onToggle.bind(this)
  }

  componentDidMount(){
  }

  onToggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }


  render() {

    return (
      <div>
        <div className={"accordion-table__row " + ((this.state.isOpen) ? 'is-active' : '')} onClick={this.onToggle}>
          <div className="accordion-table__row-cell icon">
            <svg style={{margin: '3px'}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {(this.state.isOpen == true) ?
                 <polyline points="6 9 12 15 18 9" color="#5b54fd"></polyline>
                 : <polyline points="9 18 15 12 9 6" color="#888"></polyline>}
            </svg>
          </div>
          <div className="accordion-table__row-cell date">Date Here</div>
          <div className="accordion-table__row-cell code">Code Here</div>
          <div className="accordion-table__row-cell activity">Activity Here</div>
        </div>
        <div className={"accordion-table__content " + ((this.state.isOpen == true) ? 'is-visible' : 'is-hidden')}>
          <div className="mt-3 mb-3 mr-1 clearfix">
              {(this.state.isOpen) ?
                <div>
                 
                </div>
              : ''} 
              
              <div className="full-width">
                <Link to={'/'}>
                  <button className="tertiary">View Details</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
}


export default AccordionTable;
