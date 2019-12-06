import React from "react";
import styled from "styled-components";

// Models.
import CardModel from "models/CardModel";
import CardTypes from "models/CardTypes";

// Styles.
import { StyledCardType, StyledCardTitle } from "../cardStyles";
import { fadeDown } from "styles/animations";

interface IProps {
  card: CardModel;
}

const StyledCardContent = fadeDown(styled.p`
  margin: 0;
  margin-top: 1em;
  font-size: 0.85rem;
  overflow: auto;
  white-space: pre-wrap;
`);

const TextCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 1em;
`;

export const TextCard: React.FC<IProps> = ({ card }) => {
  return (
    <TextCardContainer>
      <StyledCardType>{CardTypes.Text}</StyledCardType>
      <StyledCardTitle>{card.title}</StyledCardTitle>
      <StyledCardContent>{card.content}</StyledCardContent>
    </TextCardContainer>
  );
};
