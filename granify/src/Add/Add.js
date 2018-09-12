import React from 'react';
import { connect } from 'react-redux'
import { addItem } from '../redux/item.redux'
@connect(
    null, {addItem}
    )
export default class Add extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        phone: '',
        error: ''
    }
    this.submit = this.submit.bind(this)
    this.isValid = this.isValid.bind(this)
  }
  handleInput(key, e){
    this.setState({
      [key]: e.target.value
    })
    // console.log(this.state)
  }
  submit(){
    if(!this.state.name) {
        this.setState({
            error: 'Please enter name'
        })
        return
    }
    const isValid = this.isValid(this.state.phone)

    if(isValid){
        this.props.addItem(this.state).then(() => {
            this.props.history.push('/display')
        })
    }
    else{
        this.setState({
            error: 'Phone no. is not valid'
        })
    }
  }
  isValid(no){
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const digit = no.replace(/\D/g, '')
    return reg.test(digit)
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="form-group">
                            <input type="text" name="name" id="name" 
                            placeholder="Name" 
                            onChange={(e)=>this.handleInput('name', e)}/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="phone" id="phone" 
                            placeholder="Phone" 
                            onChange={(e)=>this.handleInput('phone', e)}/>
                        </div>
                        <div className="col-md-6 offset-md-3"><button type="button" className="btn btn-success" 
                        onClick={this.submit}>Submit</button></div>

                        {this.state.error ? (<div className="alert alert-danger mt-4" role="alert">
                                                {this.state.error}
                                            </div>) : null}
                    </div>
                </div> 
            </div>
        </div>

      </div>
    );
  }
}