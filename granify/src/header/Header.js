import React from 'react';
import './header.css'
import { withRouter, Redirect } from 'react-router-dom'

@withRouter
export default class Header extends React.Component {
  
  constructor(props) {
    super(props);
    this.navTo = this.navTo.bind(this)
  }
  navTo(path){
    this.props.history.push(path)
  }
  render() {
    return (
      <div className="row">
        <div className="p-3 col-md-4 bg-light header-item" onClick={() => this.navTo('add')}>Add</div>      
        <div className="p-3 col-md-4 bg-light header-item" onClick={() => this.navTo('display')}>Display</div>      
        <div className="p-3 col-md-4 bg-light header-item" onClick={() => this.navTo('delete')}>Delete</div>      
      </div>
    );
  }
}