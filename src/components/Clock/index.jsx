import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {};

//This function is not related with this component
//can move it to independent file
function formatDate(date) {
    if (!date) return '';

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

function Clock() {
    const [timeString, setTimeString] = useState('');
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);

        //Alway clear interval after use SetInterval
        //when Component unmounted to avoid memory leak
        return () => {
            //Cleanup SetInterval
            clearInterval(clockInterval);
        };
    }, []);

    return (
        <p style={{ fontSize: '45px' }}>{timeString}</p>
    );
}

export default Clock;