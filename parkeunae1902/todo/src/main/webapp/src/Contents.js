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

let todoIndex = 0;

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
	constructor(props) {
		super(props);

		this.state = {
			datas: []
		}

		this.renderDatas = this.renderDatas.bind(this);
		this.getTodolist = this.getTodolist.bind(this);
	}

	componentDidMount() {
		this.getTodolist();
	}

	getTodolist() {
		const type = this.props.title.toLowerCase();
		axios.get('api/todolist/'+type)
				.then(response => {
					this.setState({datas: response.data});
					if(type === "todo") {
						todoIndex = response.data.length - 1;
					}
					
				})
				.catch(error => {
					console.log(error);
				})
	}

	renderDatas(listType) {
		listType = listType.toLowerCase();
		const cardClassName = "Contents-Cards"
		return(
			this.state.datas.filter(data => data.type === listType)
			.map((data, index) => {
				return <Cards contents={data.contents} id={data.id} type={data.type} key={index} cssclass={cardClassName} index={data.type + index}></Cards>
			})
		)
	}

	render() {
		const listType = this.props.title;
		return (
			<section className="Contents-list" id={listType+'-list-id'}>
				<Subject title={this.props.title}></Subject>
				{this.renderDatas(listType)}
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
			
			<div className={this.props.cssclass}>
				{
					this.state.isComplete === true ?
					<div>
						<Checkbox index={this.props.index} id={this.props.id} />
						<div className="Cards-contents">
							<p>{this.props.contents}</p>
						</div>
					</div> 
					: 
					<CardEdititor id={this.props.id} value={this.props.contents} changeCompleteState={this.changeCompleteState} type={this.props.type}></CardEdititor>
				}
				{
					this.props.type === 'todo' && this.state.isComplete === true ?
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
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			value: '',
			save: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit() {
		axios.post('api/todolist', {
			contents: this.state.value
		})
		.then(response => {
			this.changeCreateBtnDisable();

			this.setState(
				{
					save: true,
					id: response.data.id
				}
			);
		})
		.catch(error => {
			console.log(error);
		})
	}

	handleUpdate() {
		axios.put('api/todolist', {
			id: this.props.id,
			contents: this.state.value
		})
		.then(response => {
			this.setState(
				{
					save: true,
					id: response.data.id
				}
			)
		})
		.catch(error => {
			console.log(error);
		})
	}
	
	resizeCardEditor() {
		const textArea = document.querySelector(".Cards-textarea");
		const textHeight = textArea.style.height;

		if(textArea.scrollHeight > textHeight) {
			textArea.style.height = textArea.scrollHeight + 'px';
		}
	}

	cancelRegisterCard = () => {
		const cardCreated = document.querySelector(".Card-created");
		cardCreated.parentElement.lastElementChild.remove();

		this.changeCreateBtnDisable();		
	}

	changeCreateBtnDisable() {
		const CreateBtn = document.querySelector("#create-card");
		if(CreateBtn.getAttribute("disabled") === "disabled") {
			CreateBtn.removeAttribute("disabled");
		}
	}

	render() {
		return (
			<div >
				{!this.state.save ? 
				<div className="Cards-contents">
					<OverlayTrigger placement="left" overlay={<Tooltip >취소</Tooltip>}>
						<button className="Cards-cancel-btn" onClick={this.props.value ? this.props.changeCompleteState : this.cancelRegisterCard}>
							<FontAwesomeIcon icon={faTimesCircle} size="1x" ></FontAwesomeIcon>
						</button>
					</OverlayTrigger>

					<OverlayTrigger placement="left"	overlay={<Tooltip >저장</Tooltip>}>
						<button className="Cards-save-btn" onClick={this.props.changeCompleteState ? this.handleUpdate : this.handleSubmit}>
							<FontAwesomeIcon icon={faCheckCircle} size="1x"></FontAwesomeIcon>
						</button>
					</OverlayTrigger>
				
				<textarea className="Cards-textarea" placeholder="일정을 입력해주세요!" onKeyDown={this.resizeCardEditor} defaultValue={this.props.value} onChange={this.handleChange}></textarea>
				</div>

				:

				<Cards cssclass={""} contents={this.state.value} id={this.state.id} type={"todo"} index={"todo"+(++todoIndex)}></Cards>

				}
				
			</div>
		)
	}
}


export default Contents;
export {CardEdititor};