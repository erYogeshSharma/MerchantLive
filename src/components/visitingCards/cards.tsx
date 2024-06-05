import CardOneFront from "./1/Front";
import CardOneBack from "./1/Back";
import CardTwoFront from "./2/Front";
import CardTwoBack from "./2/Back";

const Cards = (cardId: number) => {
  switch (cardId) {
    case 1:
      return {
        Front: CardOneFront,
        Back: CardOneBack,
      };
    case 2:
      return {
        Front: CardTwoFront,
        Back: CardTwoBack,
      };
    default:
      return {
        Front: CardOneFront,
        Back: CardOneBack,
      };
  }
};

export default Cards;
