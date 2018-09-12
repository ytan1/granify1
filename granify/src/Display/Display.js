import React from 'react';
import { fetchItem } from '../redux/item.redux'
import { connect } from 'react-redux'
@connect(
    state => state,
    { fetchItem }
    )
export default class Display extends React.Component {
  
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.fetchItem()
  }
  render() {
    return (
      <div>
          {
            this.props.item.map((v) => {
                return (<div className="card mt-4 offset-md-3 col-md-6" key={v._id}>
                            <div className="card-body">
                                <p>id: {v._id}</p>
                                <p>Name: {v.name}</p>
                                <p>Phone: {v.phone}</p>
                            </div>
                        </div>)
            })
          }
      </div>
    );
  }
}