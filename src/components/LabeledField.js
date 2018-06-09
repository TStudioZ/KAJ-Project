import React from 'react';
import FormField from './FormField';

class LabeledField extends FormField {

    renderField(validationError, inputClassName) {
        return (
            <li className="form-group">
                <ul className="form-group-cols">
                    <li>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </li>
                    <li>
                        <input type={this.props.type} className={inputClassName} name={this.props.name} 
                            value={this.props.val} onChange={this.handleValueChange} />
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
}

export default LabeledField;
