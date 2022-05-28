import { useState } from "react";
import Router from 'next/router'


const Login = (props) => {
    // const Router = useRouter;
    console.log('from Login Page');
    console.log(props);


    const [username, setUsername] = useState("", []);
    const [userPassword, setUserPassword] = useState("", []);
    const [loginMessage, setLoginMessage] = useState();

    const loginUser = () => {
        const checkUsername = localStorage.getItem('username', username);
        const checkPassword = localStorage.getItem('userPassword', userPassword);

        if (checkUsername == username && checkPassword == userPassword) {
            const setLoggedIn = localStorage.setItem('isUserLoggedIn', true);
            setLoginMessage(true);      
            setTimeout(() => {Router.push('/')
            {props.handleLogin(username)}}
            ,2000);
        } else {
            setLoginMessage(false);
        }
    }





    return ( 
        <div className="pageWrapper">
            <div className="loginForm form">
                <h1>Login</h1>
                <div className="usernameInput">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="passwordInput">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange={e => setUserPassword(e.target.value)}/>
                </div>
                <button onClick={loginUser} type="submit">Login</button>
                
                    {loginMessage && <div className="loginMessage">{loginMessage} Logged In Successfully<br/> We&apos;re Redirecting You To Home Page</div>}
                    {loginMessage === false && <div className="loginMessage">{loginMessage} Your Details Are Wrong<br/> Please Try Again</div>}
                
            </div>
        </div>
     );
}
 
export default Login;
