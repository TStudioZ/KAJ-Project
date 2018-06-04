import React, { Component } from 'react';

// props: {name, max, val, onValueChange, validate, label}
class LabeledDateInput extends Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        this.props.onValueChange(event.target.value);
    }

    renderField() {
        const val = this.props.val;
        let inputClassName = "form-control";
        const validationError = this.props.validate(val);
        if (validationError != null) {
            inputClassName = inputClassName + " form-control-error";
        }

        return (
            <li className="form-group">
                <ul className="form-group-cols">
                    <li>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </li>
                    <li>
                        <input type="date" className={inputClassName} name={this.props.name} 
                            max={this.props.max} value={val} onChange={this.handleValueChange} />
                        {validationError != null &&    
                            <div className="form-control-error-text">
                                {validationError}
                            </div>
                        }
                    </li>
                </ul>
            </li>
        );
    }

    render() {
        return this.renderField();
    }
}

export default LabeledDateInput;
