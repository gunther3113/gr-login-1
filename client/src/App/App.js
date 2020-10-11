import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import axios from "axios";
import Navbar from './components/Nav';

const App = () => {

    const [userInfo] = useState();

    // const loggedInOrOut = () => {
    //     // get user information and update state
    //     axios.post('/api/SignUp', customerSignUp)
    //         .then(function (response) {
    //           console.log(response)
    //         })
    //         .catch(function (error) {
    //           console.log(error)
    //         })
    // }




    return (
      <Switch>
          <div>
              <Navbar/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/list' component={List}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/signin' component={Signin}/>
            </Switch>
          </div>
      </Switch>
    );
}

export default App;
