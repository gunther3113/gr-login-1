import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {
    const [customerSignUp, setCustomerSignUp] = useState(
        { email: '', password: '', firstName: '', lastName: ''}
    );

    const handleChange = (event) => {
        setCustomerSignUp({...customerSignUp, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('/api/SignUp', customerSignUp)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    }
    return (



          <div className="container">
              <form className='white' onSubmit={handleSubmit}>
                  <h5 className="grey-text.text-darken-3">Sign Up With Email</h5>
                  <div className="input-field">
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" name="firstName" value={customerSignUp.firstName} onChange={handleChange} required /> <br/>
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" name="lastName" value={customerSignUp.lastName} onChange={handleChange} required /><br/>
                      <label htmlFor="lastName">Email</label>
                      <input type="email" name="email" value={customerSignUp.email} onChange={handleChange} required /><br/>
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" value={customerSignUp.password} onChange={handleChange} required /><br/>
                  </div>
                  <div className="input-field">
                      <button className="btn blue darken-3" type="submit">Sign Up</button>
                  </div>
              </form>
          </div>
      );
  }
  export default Signup;
