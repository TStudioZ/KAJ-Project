import React, { Component } from 'react';

// props: {name, type, val, onValueChange, label}
class LabeledField extends Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        this.props.onValueChange(event.target.value);
    }

    renderField() {
        const val = this.props.val;

        return (
            <li className="form-group">
                <ul className="form-group-cols">
                    <li>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </li>
                    <li>
                        <input type={this.props.type} className="form-control" name={this.props.name} 
                            value={val} onChange={this.handleValueChange} />
                    </li>
                </ul>
            </li>
        );
    }

    render() {
        return this.renderField();
    }
}

export default LabeledField;
