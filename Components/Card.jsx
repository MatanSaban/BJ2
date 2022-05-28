import Image from "next/image";
const Card = ({card, index}) => {
    return ( 
        <div>
            <Image 
                key={index}
                width="100px" 
                height="150px" 
                className="card playerCard" 
                alt="" 
                src={`https://deckofcardsapi.com/static/img/${card}.png`}
                />
        </div>
    );
}
 
export default Card;