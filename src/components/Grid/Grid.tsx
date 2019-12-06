// Modules.
import React, { useState } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Elements.
import GridCard from "./elements/GridCard";
import GridAddCard from "./elements/GridAddCard";

// Models.
import CardModel from "models/CardModel";

// Hooks.
import { useStoredCards } from "hooks/useStoredCards";

// Styled.
const StyledList = styled.div`
  list-style-type: none;
  padding: 0 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 275px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 400px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

// Props.
interface IProps {}

export const Grid: React.FC<IProps> = () => {
  const [storedCards, addCard] = useStoredCards();
  const [useAnimDelay, setUseAnimDelay] = useState(true);

  const addCardHandler = (card: CardModel): void => {
    setUseAnimDelay(false);
    addCard(card);
  };

  return (
    <section>
      <StyledList>
        <TransitionGroup component={null} className="grid-list">
          {storedCards.map((card: CardModel, index) => (
            <CSSTransition key={`${card.title}${index}`} timeout={0}>
              <GridCard index={useAnimDelay ? index : 0} card={card} />
            </CSSTransition>
          ))}
        </TransitionGroup>
        <GridAddCard key={"grid-add-card"} onAdd={addCardHandler} />
      </StyledList>
    </section>
  );
};
