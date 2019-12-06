import React from "react";
import styled from "styled-components";

// Models.
import CardModel from "models/CardModel";

// Hooks.
import { useWebsiteDetails } from "hooks/useWebsiteDetails";

// Styles.
import { backgroundSlide, fadeDown } from "styles/animations";
import { StyledCardType, StyledCardTitle } from "../cardStyles";
import CardTypes from "models/CardTypes";

interface IProps {
  card: CardModel;
}

// Styled.
const WebsiteCardContainer = backgroundSlide(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 1em;
`);

const StyledCardUrl = fadeDown(styled.p`
  margin: 0;
  font-size: 0.85em;
  color: #ffffff;
`);

export const WebsiteCard: React.FC<IProps> = ({ card }) => {
  const [website] = useWebsiteDetails(card.url);

  return (
    <WebsiteCardContainer
      style={{
        backgroundImage: `linear-gradient(transparent, black), url('${
          website ? website.image : ""
        }')`
      }}
    >
      <StyledCardType>{CardTypes.Website}</StyledCardType>
      <StyledCardTitle>{website ? website.title : card.title}</StyledCardTitle>
      <StyledCardUrl>{card.url}</StyledCardUrl>
    </WebsiteCardContainer>
  );
};
