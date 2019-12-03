import React from "react";
import styled from "styled-components";

// Models.
import CardModel from "models/CardModel";

// Hooks.
import { useWebsiteDetails } from "hooks/useWebsiteDetails";

// Styles.
import { backgroundSlide, flexShrink, theMagicCurve } from "styles/animations";
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

const StyledCardUrl = styled.p`
  margin: 0;
  font-size: 0.85em;
  color: #ffffff;
  flex-grow: 1;
  animation: 0.5s ${flexShrink} 0.5s ${theMagicCurve} forwards;
`;

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
