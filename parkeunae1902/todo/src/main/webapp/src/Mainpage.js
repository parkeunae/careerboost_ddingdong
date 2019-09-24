import React, {Component} from 'react';
import Contents from './Contents';
import './Mainpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';

class Header extends Component {
	render() {
		return (
			<header>
                <FontAwesomeIcon icon={faCheckSquare} size="3x" ></FontAwesomeIcon>
                <h1 className="Mainpage-header">{this.props.title}</h1>
                <div className="Mainpage-header-btn">
                    <Button variant="dark">일정 추가</Button>
                    <Button variant="secondary">일정 삭제</Button>
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