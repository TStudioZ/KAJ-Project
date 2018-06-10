import { Component } from 'react';

/**
 * Represents an input field with a validation error label.
 * props: {name, type, val, onValueChange, error, label}
 */
class FormField extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        const val = event.target.value;
        this.props.onValueChange(val);
    }

    renderField(validationError, inputClassName) {
        throw new Error("renderField() method not implemented");
    }

    render() {
        let inputClassName = "form-control";
        const validationError = this.props.error;
        if (validationError != null) {
            inputClassName = inputClassName + " form-control-error";
        }
        return this.renderField(validationError, inputClassName);
    }
}

export default FormField;
