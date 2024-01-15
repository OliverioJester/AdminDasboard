import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useStateContext } from '../context/ContextProvider.jsx';
import axiosClient from '../axios-client';
import '../assets/scss/app.scss'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);   //1:33:07
  const {setUser, setToken} = useStateContext();


  const onSubmit = (ev) => {
      ev.preventDefault()
      const payload = {
        email: emailRef.current.value, 
        password: passwordRef.current.value, 
      }
      setErrors(null)
      axiosClient.post('/login', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
        })
  
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
            setErrors(response.data.errors)
            }else{
              setErrors({
                email: [response.data.message]
              })
            } 
          }
        })      
  }

  return (
    <div >
      {/* implement login 1:36 */}
    <Card className="mx-auto mt-4 border shadow-sm animated fadeInDown" style={{ width: '20rem' }} >
      <Form onSubmit={onSubmit}>
        <h2 className='dd text-center'>
          Login into your account
        </h2>
        {errors && <div role='alert' className='dd alert alert-danger'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>//1:35
            ))}
          </div>
          }
        <Form.Group className="dd mb-3" controlId="formBasicEmail">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" autoComplete="email" />
        </Form.Group>

        <Form.Group className="dd mb-3" controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control ref={passwordRef} type="password" placeholder="Password"autoComplete="password"  />
        </Form.Group>

          <div className='dd text-center'>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </div>
        <p className="dd form-text text-center">
          Not Registered? <Link to={'/signup'}>Create an account</Link>
        </p>
      </Form>
    </Card>
      
    </div>
  )
}
