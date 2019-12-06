// Modules.
import styled from "styled-components";

// Styles.
import { fadeDown } from "styles/animations";

export const StyledCardType = fadeDown(
  styled.p`
    margin: 0;
    text-transform: uppercase;
    font-size: 0.85em;
    color: #d36409;
  `,
  "0.5s"
);

export const StyledCardTitle = fadeDown(
  styled.h1`
    margin: 0 0.5rem 0 0;
    color: #09d3ac;
    flex-shrink: 1;
    font-size: 1.15em;
    font-weight: 300;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `,
  "0.25s"
);

const randomColors = [
  {
    bgColor1: "#004e92",
    bgColor2: "#000428",
    textColor: "#ffffff"
  },
  {
    bgColor1: "#734b6d",
    bgColor2: "#42275a",
    textColor: "#ffffff"
  },
  {
    bgColor1: "#41295a",
    bgColor2: "#2f0743",
    textColor: "#ffffff"
  },
  {
    bgColor1: "#89253e",
    bgColor2: "#3a6186",
    textColor: "#ffffff"
  },
  {
    bgColor1: "#243b55",
    bgColor2: "#141e30",
    textColor: "#ffffff"
  },
  {
    bgColor1: "#3a7bd5",
    bgColor2: "#3a6073",
    textColor: "#ffffff"
  },
  // {
  //   bgColor1: "#e0eafc",
  //   bgColor2: "#cfdef3",
  //   textColor: "#282c34"
  // },
  // {
  //   bgColor1: "#eef2f3",
  //   bgColor2: "#8e9eab",
  //   textColor: "#282c34"
  // },
  {
    bgColor1: "#6441a5",
    bgColor2: "#2a0845",
    textColor: "#ffffff"
  }
];
export const randomStyle = () =>
  randomColors[Math.floor(Math.random() * randomColors.length)];
