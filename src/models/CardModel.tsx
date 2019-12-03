// Models.
import CardTypes from "models/CardTypes";

interface CardModel {
  title?: string;
  url?: string;
  type: CardTypes;
  content?: string;
  image?: string;
}

export default CardModel;
