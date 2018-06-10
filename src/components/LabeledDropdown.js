import React, { Component } from 'react';

/**
 * Represents a dropdown with a label.
 * props: {name, val, dropdownItems, onValueChange, label}
 */
class LabeledDropdown extends Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        this.props.onValueChange(event.target.value);
    }

    renderField() {
        const val = this.props.val;
        const dropdownItems = this.props.dropdownItems;

        return (
            <li className="form-group">
                <ul className="form-group-cols">
                    <li>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </li>
                    <li>
                        <select className="form-select" name={this.props.name} 
                            value={val} onChange={this.handleValueChange}>
                            {dropdownItems.map(i =>
                                <option key={i} value={i}>{i}</option>
                            )}
                        </select>
                    </li>
                </ul>
            </li>
        );
    }

    render() {
        return this.renderField();
    }
}

export default LabeledDropdown;
