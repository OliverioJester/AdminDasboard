import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axiosClient from '../axios-client';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/scss/app.scss';
import { useStateContext } from '../context/ContextProvider';

const UserForm = React.memo(() => {
	
	const {id} = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState(null)
	const {setNotification} = useStateContext()
	const [user, setUser] = useState({
		id: '',
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	});

if (id) {
	useEffect(() => {
		setLoading(true)
		axiosClient.get(`/users/${id}`)
			.then(({data}) => {
				setLoading(false)
				setUser(data)
			})
			.catch(()=> {
				setLoading(false)
			})
	}, [])
}

const onSubmit = (ev) => {
	ev.preventDefault();
	if (user.id){
		axiosClient.put(`/users/${user.id}`, user)
		.then(()=>{
			//TODO show notification
			setNotification("User was successfully updated")
			navigate('/users')
		})
		.catch(err => {
			const response = err.response;
			if (response && response.status === 422) {
			  setErrors(response.data.errors)
			}
		  })
	} else{
		axiosClient.post(`/users`, user)
		.then(()=>{
			//TODO show notification
			setNotification("User was successfully created")
			navigate('/users')
		})
		.catch(err => {
			const response = err.response;
			if (response && response.status === 422) {
			  setErrors(response.data.errors)
			}
		  })
	}
}

	return (
		<Container style={{minHeight: "68vh"}}>
			
			{loading && <div className="loading-bar"></div>}
			{user.id && <h1>Update User: {user.name}</h1>}
			{!user.id && <h1>New User</h1>}
			<Card className='card animated fadeInDown'>
				{loading &&(
					<div className='text-center dd'>Loading...</div>
				)}
				{errors &&
				 <div role='alert' className='alert alert-danger'>
					{Object.keys(errors).map(key => (
					<p key={key}>{errors[key][0]}</p>
					))}
				</div>
				}	
				{!loading && 
				<Form  onSubmit={onSubmit}>

					<Form.Group className="mb-3" controlId="formBasicText">
					<Form.Label>User Name</Form.Label>
					<Form.Control type="text" placeholder="Enter Username" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})}  autoComplete="username" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}  autoComplete="email"/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" onChange={ev => setUser({...user,  password: ev.target.value})} autoComplete="new-password" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword_confirmation">
					<Form.Label>Password Confirmation</Form.Label>
					<Form.Control type="password" placeholder="Password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} autoComplete="new-password" />
					</Form.Group>

					<Button variant="primary" type="submit" disabled={loading}>
						{loading ? 'Saving...' : 'Save'}
					</Button>

				</Form>

					// <form onSubmit={onSubmit}>
					//  <input type="text" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})}  autoComplete="username"/>
					//  <input type='email' value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}  autoComplete="email"/>
					//  <input  type="password" onChange={ev => setUser({...user, password: ev.target.value})} autoComplete="new-password" />
					//  <input  type="password" onChange={ev => setUser({...user,  password_confirmation: ev.target.value})} autoComplete="new-password"/>
					//  <button className='btn btn-primary' type='submit'  disabled={loading}>
					//  {loading ? 'Saving...' : 'Save'}
					//  </button>
					// </form>
				}		
			</Card>
		</Container>
	)
});

export default UserForm;