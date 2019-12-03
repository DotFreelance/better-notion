// Models.
import CardTypes from "models/CardTypes";

export const initialCardState = {
  type: CardTypes.NewCard,
  image: "",
  title: "",
  body: ""
};

export const addCardReducer = (state, newState) => {
  let modifiedState = { ...state, ...newState };
  switch (newState.type) {
    case CardTypes.NewCard:
      modifiedState.title = "";
      modifiedState.body = "";
      modifiedState.image = "";
      break;
    case CardTypes.Text:
      modifiedState.image = "";
      break;
  }
  return modifiedState;
};
