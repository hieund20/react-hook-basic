import React, { createContext, useState } from 'react';
import './style.scss';
import Content from './Content';

//CompA -> CompB -> CompC

//Theme: Dark/Light

//Steps
//1. Create Context
//2. Provider
//3. Consumer

export const ThemeContext = createContext();

function ScreenMode(props) {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div>
                <button onClick={() => toggleTheme()}>Toggle theme</button>
                <Content />
            </div>
        </ThemeContext.Provider>
    );
}

export default ScreenMode;