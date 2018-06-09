import React from 'react';
import FormField from './FormField';

// props: {onEdit}
class EditableField extends FormField {
    constructor(props) {
        super(props);

        this.state = {editing: false};
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event) {
        this.props.onEdit();
        this.setState({...this.state, editing: true});
    }

    renderField(validationError, inputClassName) {
        const isEditing = this.state.editing;

        return (
            <li className="form-group">
                <ul className="form-group-cols">
                    <li>
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                    </li>
                    <li>
                        {isEditing ? (
                            <div>
                                <input type={this.props.type} className={inputClassName} name={this.props.name} 
                                    value={this.props.val} onChange={this.handleValueChange} />
                                {validationError != null &&    
                                    <div className="form-control-error-text">
                                        {validationError}
                                    </div>
                                }
                            </div>
                        ) : (
                            <div className="form-input-edit">
                                <label className="form-control-non-editable">{this.props.val}</label>
                                <button onClick={this.handleEdit} className="btn-small">Edit</button>
                            </div>
                        )}
                    </li>
                </ul>
            </li>
        );
    }
}

export default EditableField;
