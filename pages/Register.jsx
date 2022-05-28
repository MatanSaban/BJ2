import { useState } from "react";
import Router from 'next/router'

const Register = (props) => {

    const [username, setUsername] = useState("", []);
    const [userPassword, setUserPassword] = useState("", []);
    const [registerMessage, setRegisterMessage] = useState()

    const registerUser = () => {
        const getUserNameFromStorage = localStorage.getItem('username')

        if (getUserNameFromStorage === username) {
            setRegisterMessage(false)
        } else if (getUserNameFromStorage === null) {
            const setTheUser = localStorage.setItem('username', username);
            const setThePassword = localStorage.setItem('userPassword', userPassword);
            const setLoggedIn = localStorage.setItem('isUserLoggedIn', true);
            setRegisterMessage(true)
            setTimeout(() => {
                Router.push('/')
                {props.handleLogin(username)}
            }, 2000)
        }
    }

    return ( 
        <div className="pageWrapper">
            <div className="loginForm form">
                <h1>Register</h1>
                <div className="usernameInput">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="passwordInput">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange={e => setUserPassword(e.target.value)}/>
                </div>
                <button onClick={registerUser} type="submit">Register</button>
                {registerMessage && <div className="loginMessage"> Registered Successfully<br/> We&apos;re Loggin You in</div>}
                {registerMessage == false && <div className="loginMessage"> This Username Is Already Exist!<br/> Please Try To Login <br/>Or Use Another Username For Registration</div>}
                
            </div>
        </div>
     );
}
 
export default Register;
