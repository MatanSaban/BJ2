import Link from "next/link";


const LoggedInUserArea = (props) => {
    // const handleLogout = () => {
    //     localStorage.removeItem("isUserLoggedIn");
    //     props.userLoggedIn
    // }
    console.log('from LoggedInComp');
    console.log(props);
    return ( 
        <>
            <p>Hi {props.username}</p>
            <button onClick={props.handleLogout}>
                <Link href="/" >
                    Logout
                </Link>
            </button>

        </>
     );
}
 
export default LoggedInUserArea;