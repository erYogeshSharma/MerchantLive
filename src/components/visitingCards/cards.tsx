import CardOneFront from "./1/Front";
import CardOneBack from "./1/Back";

import CardTwoFront from "./2/Front";
import CardTwoBack from "./2/Back";

import CardThreeFront from "./3/Front";
import CardThreeBack from "./3/Back";

import CardFourFront from "./4/Front";
import CardFourBack from "./4/Back";

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

    case 3:
      return {
        Front: CardThreeFront,
        Back: CardThreeBack,
      };
    case 4:
      return {
        Front: CardFourFront,
        Back: CardFourBack,
      };
    default:
      return {
        Front: CardOneFront,
        Back: CardOneBack,
      };
  }
};

export default Cards;
