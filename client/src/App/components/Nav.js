import React, {useCallback} from 'react'
import axios from 'axios'
import Nav from 'react-bootstrap/Nav';

const Navbar = (props) => {

    const loggedIn = props && props.user.props.user.firstName || false;

    const logout = useCallback((e) => {
        e.preventDefault()
        axios.post('/api/logout')
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    });
    return (
        <Nav
            activeKey="/home"
            onSelect={(eventKey, e) => logout(e)}
        >
            {loggedIn ?
                (
                    <React.Fragment>
                        <Nav.Item>
                            <Nav.Link>Welecome `${loggedIn}`</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="logout">Sign Out</Nav.Link>
                        </Nav.Item>
                    </React.Fragment>
                ) : (
                    <Nav.Item>
                        <Nav.Link href="/signin">Sign In</Nav.Link>
                    </Nav.Item>)
            }
        </Nav>
    );

}
export default Navbar;
