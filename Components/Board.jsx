import Buttons from "./Buttons";
import classNames from "classnames";
import Image from "next/image";

const Board = (props) => {
  return (
    <div className="board">
      <div className={classNames("cards", { playerCards: props.isPlayer })}>
        <h4>{props.username}</h4>
        <Cards
          cards={props.cards}
          hidden={!props.isPlayer && props.playerTurn}
        />
        <p>
          {props.isPlayer && props.playerTurn && "Total: " + props.totalValue}
          {props.isPlayer && !props.playerTurn && "Total: " + props.totalValue}
          {!props.isPlayer && !props.playerTurn && "Total: " + props.totalValue}
        </p>
      </div>
      {props.isPlayer && (
        <div className="playerButtons">
          {props.playerTurn ? (
            <>
              <Buttons onClick={props.onHit} text="Hit" />
              <Buttons onClick={props.onStand} text="Stand" />
            </>
          ) : (
            props.cash > 0 && <Buttons onClick={props.newGame} text="New Game" />
          )}
        </div>
      )}
    </div>
  );
};

export default Board;

const Cards = ({ cards, hidden }) => {
  return (
    <div className="theCards">
      {cards.map((card, index) => {
        let source =
          index === 1 && hidden
            ? "/oneflippedcard.png"
            : `https://deckofcardsapi.com/static/img/${card.replace(
                "T",
                "0"
              )}.png`;

        return (
          <Image
            key={card}
            src={source}
            alt={card}
            width="100px"
            height="150px"
            z-index={cards.length - index}
          />
        );
      })}
    </div>
  );
};
