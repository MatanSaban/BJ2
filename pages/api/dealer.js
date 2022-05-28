import { dealerHit } from "../../utils/cards";

export default function handler(req, res) {
    const result = dealerHit(req.body.id, req.body.cards, req.body.playerTotal);
    res.status(200).json(result);
}
