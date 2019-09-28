import React, {Component} from 'react';
import './Checkbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

//참고: https://codepen.io/dsabalete/pen/jAzLpA
class Checkbox extends Component {
    state = {
        isChecked: false,
        checkboxIcon: faSquare
    }

    toggleCheckbox = () => {
        this.setState(()=>(
                {
                    isChecked: !this.state.isChecked,
                    checkboxIcon: this.state.checkboxIcon === faCheckSquare ? faSquare : faCheckSquare
                }
            )
        );
    }

    render() {
        return (
            <div className="Cards-checkbox">
                <input type="checkbox" id={this.props.id+'checkbox'} defaultChecked={this.state.isChecked} onChange={this.toggleCheckbox} value={this.props.id} />
                <label htmlFor={this.props.id+'checkbox'}>
                    <FontAwesomeIcon icon={this.state.checkboxIcon} size="1x"></FontAwesomeIcon>
                </label>
            </div>
        )
    }
}

export default Checkbox;