import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss';

ColorBox.propTypes = {

};

//This function is dependency with component
//In the future, can separate this to utils file
function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    //Math.trunc() will return integer part (lấy phần nguyên)
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox(props) {
    const [color, setColor] = useState(() => {
        //Set default color equal pre color when load page
        //In some case, value is falsy, it has set default color = deeppink
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    });
    //But, according doc, initColor only run once time when load page and
    //in the next times, it will be useless. So, I will set it to callback to 
    //sure it only run only once time....

    function handleClick() {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box_color', newColor);
    }

    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleClick}>
            {color}
        </div>
    );
}

export default ColorBox;