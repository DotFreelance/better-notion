// Modules.
import React, { useRef } from "react";

// Elements.
import StyledCard from "../StyledCard";
import ImageCard from "../ImageCard";
import TextCard from "../TextCard";
import WebsiteCard from "../WebsiteCard";

// Models.
import CardModel from "models/CardModel";
import CardTypes from "models/CardTypes";

// Styles.
import { randomStyle } from "../cardStyles";

// Props.
interface IProps {
  card: CardModel;
  index: number;
  animState?: string;
}

export const GridCard: React.FC<IProps> = ({ card, index }) => {
  const style = useRef(randomStyle());
  const elementForCard = (card: CardModel) => {
    switch (card.type) {
      case CardTypes.Image:
        return <ImageCard card={card} />;
      case CardTypes.Text:
        return <TextCard card={card} />;
      case CardTypes.Website:
        return <WebsiteCard card={card} />;
      default:
        return null;
    }
  };

  return (
    <StyledCard index={index} randomStyle={style.current}>
      {elementForCard(card)}
    </StyledCard>
  );
};
