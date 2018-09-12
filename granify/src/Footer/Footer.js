import React from 'react'
import './Footer.css'
import { connect } from 'react-redux'
import { registerSocket } from '../redux/record.redux'
@connect(
    state => state.record,
    { registerSocket }
    )
export default class Footer extends React.Component {
  
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.registerSocket()
  }
  render() {
    return (
      <div className="row page-footer">
        <div className="p-3 col-md-6 bg-light">Add: {this.props.add} in {Math.round(this.props.hour)} hour</div>      
        <div className="p-3 col-md-6 bg-light">Add/Delete: {this.props.add}/{this.props.del} in {Math.round(this.props.hour)} hour</div>
      </div>
    )
  }
}