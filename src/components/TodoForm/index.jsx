import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func
};

//onSubmit = null when parent don't send func parameter
TodoForm.defaultProps = {
    onSubmit: null
};

function TodoForm(props) {
    //Get props outside of component function
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        //Prevent reload page when press Enter of Submit form
        e.preventDefault();
        if (!onSubmit) return; //Do not something if onSubmit = null

        const formValue = {
            title: value
        };
        //Send input value to parent
        onSubmit(formValue);

        //Reset input value when add a new todo
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
            />
        </form>
    );
}

export default TodoForm;