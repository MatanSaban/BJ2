import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Board from "../Components/Board";

const Game = (props) => {
    const [gameId, setGameId] = useState();
    const [playerTurn, setPlayerTurn] = useState(false);
    const playerHand = useHand();
    const dealerHand = useHand();

    const [gameState, setGameState] = useState();
    const [winner, setWinner] = useState();

    const [cash, setCash] = useState(100);
    const [betAmount, setBetAmount] = useState(0);
    const [betSubmit, setBetSubmit] = useState(0);
    const [bettingMode, setBettingMode] = useState(true);

    const newGame = async () => {
        setPlayerTurn(true);
        const startRes = await axios.post("/api/start", {
            id: localStorage.getItem("DeckId"),
        });

        if (startRes.status !== 200) {
            throw Error("Server error");
        }

        const { id, playerCards, dealerCards, playerValue, dealerValue } =
            startRes.data;

        localStorage.setItem("DeckId", id);
        setGameId(id);
        playerHand.setHand(playerCards, playerValue);
        dealerHand.setHand(dealerCards, dealerValue);
        setWinner("");
        setGameState("");
        if (startRes.data.playerValue === 21) {
            onStand(startRes.data.playerValue, startRes.data.dealerValue);
        }
    };

    const onHit = async () => {
        const hitRes = await axios.post("/api/hit", {
            id: gameId,
            cards: playerHand.cards,
        });

        playerHand.setHand(
            [...playerHand.cards, ...hitRes.data.card],
            hitRes.data.value
        );

        if (hitRes.data.value === 21) {
            onStand(hitRes.data.value, dealerHand.totalValue);
        } else if (hitRes.data.value > 21) {
            setPlayerTurn(false);
            gameOver(hitRes.data.value, dealerHand.totalValue);
        }
    };

    const onStand = async (playerValue, dealerValue) => {
        setPlayerTurn(false);

        if (playerValue <= dealerValue) {
            gameOver(playerValue, dealerValue);
            return;
        }

        const dealerRes = await axios.post("/api/dealer", {
            id: gameId,
            cards: dealerHand.cards,
            playerTotal: playerValue,
        });

        dealerHand.setHand(
            [...dealerHand.cards, ...dealerRes.data.cards],
            dealerRes.data.value
        );
        gameOver(playerValue, dealerRes.data.value);
    };

    const gameOver = (playerTotal, dealerTotal) => {
        if (playerTotal > 21) {
            const username = props.username;
            setGameState(username + " BUST!!");
            setWinner("Dealer");
            finishBet(false);
        } else if (dealerTotal > 21) {
            setGameState("Dealer BUST!!");
            setWinner(props.username);
            finishBet(true);
        } else {
            if (dealerTotal >= playerTotal) {
                setGameState("YOU LOSE!!!");
                setWinner("Dealer");
                finishBet(false);
            } else {
                setGameState(props.username + " WON!");
                setWinner(props.username);
                finishBet(true);
            }
        }
    };

    const finishBet = (isWin) => {
        if (bettingMode) {
            if (isWin) {
                setCash(cash + parseInt(betSubmit));
            } else {
                setCash(cash - parseInt(betSubmit));
            }
        }
    };

    const setBetAmountFunc = (betAmountByUser) => {
        if (betAmountByUser > cash) {
            return setBetAmount(cash);
        } else {
            return setBetAmount(betAmountByUser);
        }
    };

    return (
        <div className="gameContainer">
            <h1>{props.title}</h1>
            <div className="playZone">
                <div className="dealerBoard gameBoard">
                    <Board
                        username="Dealer"
                        cards={dealerHand.cards}
                        totalValue={dealerHand.totalValue}
                        playerTurn={playerTurn}
                    />
                </div>
                <div>
                    <div className="betting">
                        {cash > 0 && (
                            <h3 className="youGotCashAmount">
                                You Got: {cash}$
                            </h3>
                        )}
                        {cash === 0 && bettingMode && (
                            <>
                                <h3 className="cashEmpty">
                                    You got {cash}$ . <br /> You Want Free 100$?
                                    <br /> hit the RED button
                                    <button 
                                    className="redReloadButton"
                                    onClick={() => setCash(100)}
                                    >
                                        RED BUTTON
                                    </button>
                                </h3>
                            </>
                        )}
                        {cash > 0 && bettingMode && (
                            <input
                                type="number"
                                max={cash}
                                min={"0"}
                                value={betAmount}
                                onChange={(e) =>
                                    setBetAmountFunc(e.target.value)
                                }
                                disabled={playerTurn}
                            />
                        )}
                        {cash > 0 && bettingMode && !playerTurn && (
                            <button
                                className="betSubmitButton"
                                onClick={() => {
                                    setBetSubmit(betAmount);
                                    setBettingMode(true);
                                    newGame();
                                }}
                            >
                                Submit Bet
                            </button>
                        )}
                        {bettingMode && cash > 0 && bettingMode ? (
                            !!betSubmit && <p>Your Bet: {betSubmit}$</p>
                        ) : (
                            <p>Bet Mode OFF</p>
                        )}
                        {!playerTurn && cash > 0 && (
                            <button
                                className={
                                    bettingMode
                                        ? "txt-white green-bg"
                                        : "txt-white red-bg"
                                }
                                onClick={() => {
                                    setBettingMode(!bettingMode);
                                    setPlayerTurn(false);
                                }}
                            >
                                Bet Mode
                            </button>
                        )}
                        

                    </div>
                    <div className="messages">
                        <div id="cardsStack" className="cardsStack">
                            <h2>Messages</h2>
                        </div>
                        <p>{gameState}</p>
                        {winner && (
                            <h3 className="winner">
                                The Winner Is <br /> {winner}
                            </h3>
                        )}
                    </div>
                </div>
                <div className="PlayerBoard gameBoard">
                    <Board
                        username={props.username}
                        isPlayer
                        playerTurn={playerTurn}
                        cards={playerHand.cards}
                        totalValue={playerHand.totalValue}
                        dealerHand={dealerHand.totalValue}
                        onHit={onHit}
                        onStand={() =>
                            onStand(
                                playerHand.totalValue,
                                dealerHand.totalValue
                            )
                        }
                        newGame={newGame}
                        cash={cash}
                    />
                </div>
            </div>
        </div>
    );
};

export default Game;

const useHand = () => {
    const [cards, setCards] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const setHand = useCallback(
        (newCards, newTotal) => {
            setCards(newCards);
            setTotalValue(newTotal);
        },
        [setCards, setTotalValue]
    );

    return { cards, totalValue, setHand };
};
