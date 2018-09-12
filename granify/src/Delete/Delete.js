import React from 'react';
import './Delete.css'
import { fetchItem, deleteItem } from '../redux/item.redux'
import { connect } from 'react-redux'
@connect(
    state => state,
    { fetchItem, deleteItem }
    )
export default class Delete extends React.Component {
  
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this)
  }
  componentDidMount(){
    this.props.fetchItem()
  }
  delete(id){
    this.props.deleteItem(id)
  }
  render() {
    return (
      <div>Click to Delete
        {
          this.props.item.map((v) => {
              return (<div className="card mt-4 offset-md-3 col-md-6 delete-card" 
                            key={v._id} 
                            onClick={() => this.delete(v._id)}>
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