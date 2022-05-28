import Link from "next/link";
import Image from "next/image";
import LoggedInUserArea from "./LoggedInUserArea";
import UserArea from "./UserArea";

const Header = (props) => {
  return (
    <div className="header">
      <div className="navBar">
        <ul className="navBarList">
          <li className="navBarItem">
            <Link href="/" replace={true}>
              <a className="link">Home</a>
            </Link>
          </li>
          <li className="navBarItem">
            <Link href="/HowToPlay" title={props.title} replace={true}>
              <a className="link" >How To Play</a>
            </Link>
          </li>
          <li>
            <Link href="/Game">
              <a className="link">New Game</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="LogoDiv">
        <Link href="/">
          <a>
            <Image
              className="logo"
              src="/Logo.png"
              alt="BlackJackLogo"
              width="150px"
              height="150px"
            />
          </a>
        </Link>
      </div>
      <div className="userArea">
        {(props.userState.userLoggedIn && (
          <LoggedInUserArea
            username={props.username}
            userState={props.userState.userLoggedIn}
            handleLogout={props.handleLogout}
          />
        )) ||
          (!props.userState.userLoggedIn && <UserArea />)}
      </div>
    </div>
  );
};

export default Header;
