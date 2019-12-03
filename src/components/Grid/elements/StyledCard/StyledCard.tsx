import styled from "styled-components";

// Styles.
import { fadeIn } from "styles/animations";

const boxShadowSmooth = (
  layers: number,
  color: string,
  direction?: string
): string =>
  new Array(layers)
    .fill(0)
    .reduce(
      (acc, val, index, arr) =>
        acc +
        `${Math.pow(2, index)}px ${direction === "up" ? "-" : ""}${Math.pow(
          2,
          index
        )}px ${Math.pow(2, index)}px ${color}${
          arr.length === index + 1 ? ";" : ", "
        }`,
      "box-shadow: "
    );

const randomBackground = (bg): string =>
  `linear-gradient(135deg, ${bg.bgColor1}, ${bg.bgColor2})`;

export const StyledCard = styled.div`
  display: flex;
  margin: auto;
  height: 90%;
  width: 90%;
  border-radius: 15px;
  overflow: hidden;
  background: ${props => randomBackground(props.randomStyle || {})};
  background-size: 110%;
  background-position: 50% 50%;
  color: ${props =>
    props.randomStyle ? props.randomStyle.textColor : "#ffffff"};
  opacity: 0;
  animation: 0.5s ${fadeIn} ease-out forwards;
  transition: transform 0.15s ease-in;
  animation-delay: ${props => props.index * 0.12}s;
  ${boxShadowSmooth(5, "rgba(0, 0, 0, 0.22)")};
  :hover,
  :focus-within {
    transform: scale(1.05);
  }
`;
