import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Contents, {CardEdititor} from './Contents';
import './Mainpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';

class Header extends Component {
  createCard = () => {
    const todolist = document.querySelector('#Todo-list-id');
    const elementCreated = document.createElement('div');
    elementCreated.className = "Contents-Cards Card-created";
    todolist.appendChild(elementCreated);
    
    ReactDOM.render(<CardEdititor></CardEdititor>, elementCreated);

    const CreateBtn = document.querySelector("#create-card");
    CreateBtn.setAttribute("disabled", "disabled");
  }

	render() {
		return (
			<header>
        <FontAwesomeIcon icon={faCheckSquare} size="3x" ></FontAwesomeIcon>
        <h1 className="Mainpage-header">{this.props.title}</h1>
        <div className="Mainpage-header-btn">
          <Button id="create-card" variant="warning" onClick={this.createCard}>일정 추가</Button>
          <Button id="delete-card" variant="light">일정 삭제</Button>
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