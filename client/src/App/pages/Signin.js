import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signin = () => {

        const handleSubmit = (event) => {
           const form = event.currentTarget;
           console.log(form);
         };
    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control  type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      );
  }
  export default Signin;
