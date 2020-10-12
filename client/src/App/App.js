import React, {useEffect, useState, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import axios from "axios";
import Navbar from './components/Nav';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const App = () => {

    const [user, setUser] = useState();

    const updateUser = useCallback(
        async () => {
            const result = await axios.get('/api/user');
            const updatedUser = await result.user;
            setUser(updatedUser);
        }, [],
    );

    useEffect(() => {
        updateUser();
    }, [user]);

    return (
        <Switch>
            <div className={'bg-dark'}>

                <Container fluid="md" className={'bg-white min-vh-100'}>
                    <Row>
                        <Col><Navbar user={user} logInOrOut={updateUser}/></Col>
                    </Row>

                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path='/' render={props => <Home user={user}/>}/>
                                <Route path='/list' render={props => <List user={user}/>}/>
                                <Route path='/signup' component={Signup}/>
                                <Route path='/signin' component={Signin}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Switch>
    );
}

export default App;
