import { Component } from 'react';

/**
 * Represents a form with validation functionality.
 */
class ValidatingForm extends Component {

    constructor(props) {
        super(props);

        this.setError = this.setError.bind(this);
        this.updateField = this.updateField.bind(this);
        this.handleSaveImpl = this.handleSaveImpl.bind(this);
        this.validateFieldsImpl = this.validateFieldsImpl.bind(this);

        let errors = { };
        let data = { };
        this.state = { errors: errors, data: data };
    }

    /**
     * Updates the validation error for the specified key.
     */
    setError(key, error) {
        let errors = this.state.errors;
        if (this.state.errors[key] !== error) {
            errors[key] = error;
            return errors;
        }
        return errors;
    }

    /**
     * Updates the value for the specified key, validates it, sets error if appropriate
     * and converts it if validated successfully.
     */
    updateField(key, value, validate, convert) {
        let errors = this.setError(key, validate != null ? validate(value) : null);
        let data = this.state.data;
        if (errors[key] == null) {
            data[key] = convert(value);
        } else {
            data[key] = value;
        }
        this.setState({...this.state, errors: errors, data: data});
    }

    /**
     * Saving is implemented in child class.
     */
    handleSaveImpl(event) {
        console.log("handleSaveImpl() method not implemented");
    }

    /**
     * Validating of all fields is implemented in child class.
     */
    validateFieldsImpl(event) {
        console.log("validateFieldsImpl() method not implemented");
    }

    /**
     * Validates all fields and return the result.
     */
    validateFields(errors) {
        this.validateFieldsImpl(errors);
        for (let e of Object.entries(errors)) {
            if (e[1] != null) {
                console.log(`Validation error: [${e[1]}]`);
                return false;
            }
        }
        return true;
    }

    /**
     * If there is a validation error for any field,
     * save updates the Component's state with all errors.
     * Otherwise uses the saving method implemented in subclass.
     */
    handleSave(event) {
        event.preventDefault();

        let errors = this.state.errors;
        if (!this.validateFields(errors)) {
            this.setState({...this.state, errors: errors});
            return false;
        }
        this.handleSaveImpl(event);
        return true;
    }
}

export default ValidatingForm;
