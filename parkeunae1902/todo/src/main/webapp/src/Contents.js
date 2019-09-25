import React, {Component} from 'react';
import axios from 'axios';
import Checkbox from './Checkbox';
import './Contents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

const types = [
	"Todo",
	"Doing",
	"Done"
]

const datas = [
	{
		type: "Todo",
		contents: "앞으로 할 일"
	},
	{
		type: "Todo",
		contents: "앞으로 할 일"
	},
	{
		type: "Done",
		contents: "다 끝낸 일"
	}
]

class Contents extends Component {
	render() {
		return (
			<article className="Contents">
				{types.map((type, index) => {
					return <List title={type} key={index}></List>
				})}
				
			</article>
		)
	}
}

class List extends Component {
	componentDidMount() {
		axios.get('/todolist')
				.then(function(response) {
					console.log(response);
				})
	}

	render() {
		const listType = this.props.title;
		return (
			<section className="Contents-list" id={listType+'-list-id'}>
				<Subject title={this.props.title}></Subject>
				{datas.filter(data => data.type === listType)
					.map((data, index) => {
						return <Cards contents={data.contents} id={data.type+index} type={data.type} key={index}></Cards>
					})}
			</section>
		)
	}
}

class Subject extends Component {
	render() {
		return (
			<div>
				<h3 className="Contents-title">
					{this.props.title}
				</h3>
				<label htmlFor={this.props.title+'Select'}>
					
				</label>
				<Dropdown id={this.props.title+'Select'}>
					<Dropdown.Toggle variant="warning" id="dropdown-variants-warning">
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{
							!(this.props.title === 'Todo') && 
							<Dropdown.Item href="">Todo</Dropdown.Item>
						}
						{
							!(this.props.title === 'Doing') && 
							<Dropdown.Item href="">Doing</Dropdown.Item>
						}
						{
							!(this.props.title === 'Done') && 
							<Dropdown.Item href="">Done</Dropdown.Item>
						}	
					</Dropdown.Menu>
				</Dropdown>
			</div>
		)
	}
}


class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isComplete: true,
		};
		this.changeCompleteState = this.changeCompleteState.bind(this);
	}

	changeCompleteState() {
		this.setState({isComplete: true});
	}

	modifyCardContents = () => {
		this.setState({isComplete: false});
	}

	render() {
		return (
			<div className="Contents-Cards" id={this.props.id+'card'}>
				{
					this.state.isComplete === true ?
					<div>
					<Checkbox id={this.props.id} />
					<div className="Cards-contents">
						<p>{this.props.contents}</p>
					</div></div> 
					: 
					<CardEdititor id={this.props.id} value={this.props.contents} changeCompleteState={this.changeCompleteState}></CardEdititor>
				}
				{
					this.props.type === 'Todo' && this.state.isComplete === true ?
					<div className="Cards-modify-btn">
						<OverlayTrigger placement="bottom" 
														overlay={
															<Tooltip >수정하기</Tooltip>
														}>
							<button onClick={this.modifyCardContents}>
								<FontAwesomeIcon icon={faEdit} size="1x" ></FontAwesomeIcon>
							</button>
						</OverlayTrigger>
					</div> : ''
				}
				
			</div>
		)
	}
}

class CardEdititor extends Component {
	
	resizeCardEditor() {
		const textArea = document.querySelector(".Cards-textarea");
		const textHeight = textArea.style.height;

		if(textArea.scrollHeight > textHeight) {
			textArea.style.height = textArea.scrollHeight + 'px';
		}
	}

	cancelRegisterCard = (e) => {
		const cardCreated = document.querySelector(".Card-created");
		cardCreated.parentElement.lastElementChild.remove();

		const CreateBtn = document.querySelector("#create-card");
		if(CreateBtn.getAttribute("disabled") === "disabled") {
			CreateBtn.removeAttribute("disabled");
		}
	}

	saveContents = () => {
		console.log(this);
	}

	render() {
		return (
			<div className="Cards-contents">
				<div>
					<OverlayTrigger placement="left" 
													overlay={
														<Tooltip >취소</Tooltip>
													}>
						<button className="Cards-cancel-btn" onClick={this.props.value === "" ? this.cancelRegisterCard : this.props.changeCompleteState}>
							<FontAwesomeIcon icon={faTimesCircle} size="1x" ></FontAwesomeIcon>
						</button>
					</OverlayTrigger>
				</div>

				<div>
					<OverlayTrigger placement="left" 
													overlay={
														<Tooltip >저장</Tooltip>
													}>
						<button className="Cards-save-btn">
							<FontAwesomeIcon icon={faCheckCircle} size="1x" onClick={this.saveContents} ></FontAwesomeIcon>
						</button>
					</OverlayTrigger>
				</div>
				
				<textarea className="Cards-textarea" placeholder="일정을 입력해주세요!" onKeyDown={this.resizeCardEditor} defaultValue={this.props.value}></textarea>
			</div>
		)
	}
}


export default Contents;
export {CardEdititor};