import Header from '../Components/Header'
import './styles.css'
import { useState, useEffect } from "react";
import Footer from '../Components/Footer';

function MyApp({ Component, pageProps }) {

  const [userState, setUserState] = useState({userLoggedIn:""});
  const [username, setUsername] = useState('Player')

  const handleLogout = () => {
    setUserState({userLoggedIn:false})
    setUsername('Player')
    const cleanFromStorage = localStorage.removeItem("isUserLoggedIn")
    if (cleanFromStorage == null) {
      console.log(userState);
      console.log('removed from storage');
    }
  }

  const handleLogin = (username) => {
    if (localStorage.getItem("isUserLoggedIn")) {
      setUsername(username)
      setUserState({userLoggedIn:true})
    }
  }

  useEffect(() => {
      const checkUserState = localStorage.getItem("isUserLoggedIn")
      if (checkUserState) {

          setUserState({userState})

            const getUsername = localStorage.getItem('username')
            
            if (getUsername) {
              const username = getUsername.replace('"', '')
              setUsername(username) ;
            }
          } 
        },[])
  return (
    <>
      <Header title={"BlackJack"} userState={userState} username={username} handleLogin={handleLogin} handleLogout={handleLogout}/>
      <Component {...pageProps} userState={userState} username={username} handleLogin={handleLogin} />
      <Footer title={"Made By Matan Saban"} LinkedIn={'https://www.linkedin.com/in/matansaban'}/> 
    </>
)

  
}

export default MyApp
