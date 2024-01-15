import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate(); 
    const[txtname, setName]= useState('');
    const[txtdescription, setDescription]= useState('');
    const[txtcategory, setCategory]= useState('');
    const[txtprice, setPrice]= useState('');
    const[fileimage, setPhoto]= useState('');
    const[categories, setCategories]= useState([]);
    const[message, setMessage]= useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories');
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); 

const uploadProduct= async()=>{
    console.log(fileimage);
    const formData= new FormData();
    formData.append('name',txtname);
    formData.append('description', txtdescription);
    formData.append('category_name', txtcategory);
    formData.append('price',txtprice);
    formData.append('image', fileimage);

    const response= await axios.post('http://localhost:8000/api/productscreate', formData, {
    headers:{'Content-Type':'multipart/form-data'},
    });

    if(response)
    {
        console.log(response);
        setMessage(response.message);
        setTimeout(()=>{
            navigate('/products');
        }, 2000);
    }
}

const handleSubmit = async(e)=>{
    e.preventDefault();
    await uploadProduct();
}

  return (
    <div className='dd'>
    <Container fluid style={{minHeight: "65vh"}}>
        <h2>Add Product</h2>
        <p className='text-warning'>{message}</p>
        <Form onSubmit={ handleSubmit }>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={ (e)=>setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter description" onChange={ (e)=>setDescription(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                <option hidden>Open this select menu</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter price" onChange={ (e)=>setPrice(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage" onChange={(e)=>setPhoto(e.target.files[0])}>
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>   
    </Container>     
    </div>
  )
}


export default AddProduct