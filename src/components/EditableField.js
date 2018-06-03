import React, { Component } from 'react';

// props: {name, type, val, onValueChange, label}
class EditableField extends Component {
    constructor(props) {
        super(props);

        this.state = {editing: false};
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleValueChange(event) {
        this.props.onValueChange(event.target.value);
    }

    handleEdit(event) {
        this.setState({...this.state, editing: true});
    }

    renderField() {
        const val = this.props.val;
        const isEditing = this.state.editing;

        return (
            <li className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                {isEditing ? (
                    <div className="form-input-edit">
                        <input type={this.props.type} className="form-control" name={this.props.name} 
                            value={val} onChange={this.handleValueChange} />
                    </div>
                ) : (
                    <div className="form-input-edit">
                        <label className="form-control-non-editable">{this.props.val}</label>
                        <button onClick={this.handleEdit} className="btn-small">Edit</button>
                    </div>
                )}
            </li>
        );
    }

    render() {
        return this.renderField();
    }
}

export default EditableField;
