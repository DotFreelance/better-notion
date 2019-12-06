// Modules.
import styled, { keyframes } from "styled-components";

// Easing functions.
export const theMagicCurve = "cubic-bezier(0.98, 0, 0.51, 0.77)";

// Keyframes.
const bgSlide = keyframes`
  0% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 70% 60%;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeDownAnim = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

// Wrappers.
export const fadeDown = (component, delay = "0s") => styled(component)`
  opacity: 0;
  transform: translateY(-100px);
  animation: 0.5s ${fadeDownAnim} ${delay} ${theMagicCurve} forwards;
`;

export const backgroundSlide = component => styled(component)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  :hover {
    animation: 10s ${bgSlide} ease-out infinite alternate;
  }
`;
