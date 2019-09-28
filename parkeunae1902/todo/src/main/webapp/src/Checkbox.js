import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import {Cards} from './Contents';
import './Checkbox.css';
import { Dropdown } from 'react-bootstrap';

//참고: https://codepen.io/dsabalete/pen/jAzLpA
class Checkbox extends Component {

  moveToDoing = (newType) => {
  axios.put('api/type', {
    id: this.props.id,
    type: newType
  })
  .then(response => {
    const data = response.data;
    const type = data.type.replace(/\b[a-z]/, (first) => {
        return first.toUpperCase();
    })

    const list = document.querySelector('#'+type+'-list-id');
    const elementCreated = document.createElement('div');
    list.appendChild(elementCreated);

    ReactDOM.render(<Cards contents={data.contents} id={data.id} type={data.type} cssclass={"Contents-Cards"} index={this.props.index}></Cards>, elementCreated);
    
    if($('#'+this.props.index+'card').parent().is('.Contents-Cards') === true) {
      $('#'+this.props.index+'card').parent().remove();
    } else {
      $('#'+this.props.index+'card').remove();
    }
    
  })
  .catch(error => {
    console.log(error);
  })
}

  render() {
    return (
      <div className="Cards-checkbox">
        
        <Dropdown id={this.props.type+'Select'} >
          <Dropdown.Toggle variant="warning" id="dropdown-variants-warning">
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              this.props.type === 'todo' && 
              <Dropdown.Item href="" onClick={() => this.moveToDoing('doing')}>Doing</Dropdown.Item>
            }
            {
              this.props.type === 'doing' && 
              <Dropdown.Item href="" onClick={() => this.moveToDoing('done')}>Done</Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default Checkbox;