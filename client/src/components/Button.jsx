import React from 'react';
import styled from 'styled-components';
import { House } from 'lucide-react';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <div className="sign">
          <House />
        </div>
        <div className="text">Level Up</div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(173, 70, 255);
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white; /* <--- ADDED: Set color on the parent for currentColor to inherit */
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: currentColor; /* <--- MODIFIED: Make SVG fill inherit parent's color */
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 400;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 160px;
    border-radius: 40px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }
`;

export default Button;