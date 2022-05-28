// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { calcValue, hit } from "../../utils/cards";

export default function handler(req, res) {
  const pulledCard = hit(req.body.id);

  const value = calcValue([...req.body.cards, pulledCard]);

  res.status(200).json({ card: pulledCard, value });
}
 