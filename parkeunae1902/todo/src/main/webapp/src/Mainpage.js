import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Contents, {CardEdititor} from './Contents';
import './Mainpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';

class Header extends Component {
  state = {
    selected : []
  }

  createCard = () => {
    const elementCreated = $("<div></div>");
    elementCreated.addClass("Contents-Cards Card-created");
    
    $("#Todo-list-id").append(elementCreated);
    
    ReactDOM.render(<CardEdititor></CardEdititor>, elementCreated.get(0));
    
    $("#create-card").attr("disabled", true);

  }

	render() {
		return (
			<header>
        <FontAwesomeIcon icon={faCheckSquare} size="3x" ></FontAwesomeIcon>
        <h1 className="Mainpage-header">{this.props.title}</h1>
        <div className="Mainpage-header-btn">
          <Button id="create-card" variant="warning" onClick={this.createCard}>일정 추가</Button>
        </div>
			</header>
		)
	}
}

class Mainpage extends Component {
  
  render() {
    return (
      <div className="Mainpage">
        <Header title="Todo list"></Header>
		    <Contents></Contents>
      </div>
    )
  }
}


export default Mainpage;