import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { useLocation } from "react-router-dom";

const Navbar = (props) => {

    const name = props.user && props.user.firstName ? props.user.firstName + ' ' + props.user.lastName : null;

    const logout = () => {
        props.logInOrOut();
    }
    let location = useLocation();
    return (
        <Nav
            fill variant="tabs"
            activeKey="`${location.pathname}`"
            onSelect={(eventKey, e) => logout(e)}
        >
            {name ?
                (
                    <React.Fragment>
                        <Nav.Item>
                            <Nav.Link>Welecome `${name}`</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="logout">Sign Out</Nav.Link>
                        </Nav.Item>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Nav.Item>
                            <Nav.Link eventKey='/signin' href="/signin">Sign In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='/signup' href="/signup">Sign Up</Nav.Link>
                        </Nav.Item>
                    </React.Fragment>
                )
            }
        </Nav>
    );

}
export default Navbar;
