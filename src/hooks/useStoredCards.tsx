import React, {
  useState,
  useLayoutEffect,
  createContext,
  useContext
} from "react";

// Models.
import FakeData from "models/FakeData.js";
import CardModel from "models/CardModel";

// Defaults.
const DefaultStoredCards: [CardModel[], Function] = [[], f => f];

// Context.
const StoredCardsContext = createContext<[CardModel[], Function]>(
  DefaultStoredCards
);

const StoredCardsManager = (userId: string): [CardModel[], Function] => {
  const [cards, setCards] = useState<CardModel[]>([]);

  const addCard = (newCard: CardModel): void => {
    setCards(oldCards => [...oldCards, newCard]);
  };

  useLayoutEffect(() => {
    setCards(FakeData);
  }, [userId]);

  return [cards, addCard];
};

export const StoredCardsProvider = ({ children, userId }) => (
  <StoredCardsContext.Provider value={StoredCardsManager(userId)}>
    {children}
  </StoredCardsContext.Provider>
);

export const useStoredCards = () => useContext(StoredCardsContext);
