import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/scss/app.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axiosClient from '../axios-client';
import '../context/ContextProvider.jsx';
import { useStateContext } from '../context/ContextProvider.jsx';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);   //1:33:07
  const {setUser, setToken} = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value, 
      email: emailRef.current.value, 
      password: passwordRef.current.value, 
      password_confirmation: passwordConfirmationRef.current.value, 
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })

      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div>
      <Card className="dd mx-auto mt-4   border shadow-sm animated fadeInDown" style={{ width: '20rem' }} >
        <Form onSubmit={onSubmit}>
          <h2 className='text-center'>
            Sign up for free
          </h2>
          {errors && <div role='alert' className='dd alert alert-danger'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>//1:35
            ))}
          </div>
          }
          <Form.Group className="dd mb-3" controlId="formBasicText">
            {/* <Form.Label>Email Full name</Form.Label> */}
            <Form.Control ref={nameRef} type="text" placeholder="Enter full name" />
          </Form.Group>


          <Form.Group className="dd mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="dd mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control ref={passwordRef} type="password" placeholder="Enter password" />
          </Form.Group>

          <Form.Group className="dd mb-3" controlId="formBasicPasswordConf">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control ref={passwordConfirmationRef}type="password" placeholder="Confirm your password" />
          </Form.Group>

            <div className='dd text-center'>
              <Button variant="primary" type="submit" >
                Sign Up
              </Button>
            </div>
          <p className="dd form-text text-center">
            Already Registered? <Link to={'/login'}>Sign in</Link>
          </p>
        </Form>
      </Card>
    </div>
  )
}
