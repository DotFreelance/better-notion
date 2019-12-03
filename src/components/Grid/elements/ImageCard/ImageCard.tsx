import React from "react";
import styled from "styled-components";

// Models.
import CardModel from "models/CardModel";
import CardTypes from "models/CardTypes";

// Styles.
import { backgroundSlide } from "styles/animations";
import { StyledCardType, StyledCardTitle } from "../cardStyles";

interface IProps {
  card: CardModel;
}

const ImageCardContainer = backgroundSlide(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 1em;
  padding-bottom: 2em;
`);

export const ImageCard: React.FC<IProps> = ({ card }) => {
  return (
    <ImageCardContainer
      style={{
        backgroundImage: `linear-gradient(transparent, black), url('${card.image}')`
      }}
    >
      <StyledCardType>{CardTypes.Image}</StyledCardType>
      <StyledCardTitle>{card.title}</StyledCardTitle>
    </ImageCardContainer>
  );
};
