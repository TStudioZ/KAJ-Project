import { Component } from 'react';

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

    // update the validation error for the specified key
    setError(key, error) {
        let errors = this.state.errors;
        if (this.state.errors[key] !== error) {
            errors[key] = error;
            return errors;
        }
        return errors;
    }

    // update the value for the specified key, validate, set error if appropriate
    // and convert it if validated successfully
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

    // saving implemented in child
    handleSaveImpl(event) {
        console.log("handleSaveImpl() method not implemented");
    }

    // validating of all fields implemented in child
    validateFieldsImpl(event) {
        console.log("validateFieldsImpl() method not implemented");
    }

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
