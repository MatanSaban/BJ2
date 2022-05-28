import HomeComp from "../Components/HomeComp";
import HowToPlay from "./HowToPlay";

const Home = (props) => {

  return ( 
      <>
        <HomeComp userState={props.userState} title={"Welcome To BlackJack Online Game!"}/>
      </>
      );
}
 
export default Home;