import React from 'react';
import FormField from './FormField';

/**
 * Represents a date input with a label.
 */
class LabeledDateInput extends FormField {

    renderField(validationError, inputClassName) {
        return (
            <li className="form-group">
                <ul className="form-group-cols">
                    <li>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </li>
                    <li>
                        <input type="date" className={inputClassName} name={this.props.name} 
                            max={this.props.max} value={this.props.val} onChange={this.handleValueChange} />
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

export default LabeledDateInput;
