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

export const flexShrink = keyframes`
  from {
    flex-grow: 1;
  }
  to {
    flex-grow: 0;
  }
`;

export const growAndShow = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100%;
    opacity: 1;
  }
`;

// Wrappers.
export const backgroundSlide = component => styled(component)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  :hover {
    animation: 10s ${bgSlide} ease-out infinite alternate;
  }
`;
