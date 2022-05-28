import { v4 } from "uuid";
import { calcValue, hit, insertNewDeck } from "../../utils/cards";

export default function handler(req, res) {
  const id = req.body.id ?? v4();

  insertNewDeck(id);
  const playerCards = hit(id, 2);
  const playerValue = calcValue(playerCards);
  const dealerCards = hit(id, 2);
  const dealerValue = calcValue(dealerCards);
  
  res
    .status(200)
    .json({ id, playerCards, dealerCards, playerValue, dealerValue });
}
