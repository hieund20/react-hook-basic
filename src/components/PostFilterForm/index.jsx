import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func
};

PostFilterForm.defaultProps = {
    onSubmit: null
}

function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    //Variable save value and can not be change when render
    //This value will be lost when useRef is dead
    //useRef
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;

        //Clear previous Timeout TO set new Timeout
        //SET - 100 -> CLEAR, SET - 300 -> SUBMIT
        //SET - 300 -> SUBMIT
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        //This will wait for user input value, if stop input enough 300ms
        //this useRef will be run
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            };
            onSubmit(formValues);
        }, 300);
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange} />
        </div>
    );
}

export default PostFilterForm;