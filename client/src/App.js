import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter , Switch , Route, useHistory} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {Signup} from './components/Signup'
import {Signin} from './components/Signin'
import { Profile } from './components/Profile';
import { Forgot } from './components/Forgot';

const Routing = () => {
  const history = useHistory()
  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("user"))
    if(!user){
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Profile />
    </Route>
    <Route path="/signup" >
      <Signup />
    </Route>
    <Route path="/signin" >
      <Signin />
    </Route>
    
    <Route path="/forgot" >
      <Forgot />
    </Route>

  </Switch>
  )
}

function App() {
  return (
   <BrowserRouter>
     <Navbar />
       <Routing />
   </BrowserRouter>   
   
  );
}

export default App;
