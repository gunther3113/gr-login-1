import React, { useCallback, useState } from 'react'
import axios from 'axios'
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
    // const [customerSignUp, setCustomerSignUp] = useState(
    //     { email: '', password: '', firstName: '', lastName: ''}
    // );
    //
    // const handleChange = (event) => {
    //     setCustomerSignUp({...customerSignUp, [event.target.name]: event.target.value})
    // }

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
          
          <Nav.Item>
            <Nav.Link href="/signin">Sign In</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="logout" >Sign Out</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/list">List</Nav.Link>
          </Nav.Item>
        </Nav>
      );
  }
  export default Navbar;
