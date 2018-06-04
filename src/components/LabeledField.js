import React, { Component } from 'react';

// props: {name, type, val, onValueChange, validate, label}
class LabeledField extends Component {
    constructor(props) {
        super(props);

        this.state = { validationError: null };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        const val = event.target.value;
        this.props.onValueChange(val);
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
                        <input type={this.props.type} className={inputClassName} name={this.props.name} 
                            value={val} onChange={this.handleValueChange} />
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

export default LabeledField;
