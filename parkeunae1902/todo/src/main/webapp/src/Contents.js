import React, {Component} from 'react';
import Checkbox from './Checkbox';
import './Contents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

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

//참고: https://stackoverflow.com/questions/45014094/expected-to-return-a-value-at-the-end-of-arrow-function
class List extends Component {
	render() {
		const listType = this.props.title;
		return (
			<section className="Contents-list">
				<Subject title={this.props.title}></Subject>
				{datas.filter(data => data.type === listType)
					.map((data, index) => {
						return <Cards contents={data.contents} id={data.type+index} key={index}></Cards>
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
			</div>
		)
	}
}


class Cards extends Component {
	render() {
		return (
			<div className="Contents-Cards">
				<Checkbox id={this.props.id} />
				<div className="Cards-contents">
					<p>{this.props.contents}</p>
				</div>
				<div className="Cards-modify-btn">
					<a href="">
						<FontAwesomeIcon icon={faEdit} size="1x" ></FontAwesomeIcon>
					</a>
				</div>
			</div>
		)
	}
}


export default Contents;