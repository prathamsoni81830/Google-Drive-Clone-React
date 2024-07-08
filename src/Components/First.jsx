import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import OnLogIn from "./OnLogIn"
import { createContext, useState } from "react"
import { auth } from "../firebase"
import { provider } from "../firebase"


export const ecomContext = createContext();


function First() {

  const [user, setUser] = useState(null)

  const logIn =() =>{
    auth.signInWithPopup(provider).then(({user}) => {
      setUser(user)
    }).catch(error => {
      alert(error.message);
    })
  }

 

  return (
    
   <BrowserRouter>
   <ecomContext.Provider 
   value={{
    user,
    setUser,
    logIn,

   }}
   >
   <Routes>
    { user ? <Route path="/OnLogIn" element={<OnLogIn photoURL={user.photoURL} user={user}/>}></Route>
    
    :
    <Route path="/" element={<Home/>}></Route>
}
   </Routes>
   </ecomContext.Provider>
   </BrowserRouter>
    
  )
}

export default First
