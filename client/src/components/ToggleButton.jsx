import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext'; // adjust this path

const Switch = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext); // ⬅ get state and setter

  const handleToggle = () => {
    setDarkMode(!darkMode); // toggle darkMode on/off
  };

  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 10px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #d4acfb;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.3em;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0px 20px rgba(0,0,0,0.4);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .switch input:checked + .slider {
    background: #b84fce;
  }

  .switch input:focus + .slider {
    box-shadow: 0 0 1px #b84fce;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.6em);
    width: 2em;
    height: 2em;
    bottom: 0;
  }
`;

export default Switch;
