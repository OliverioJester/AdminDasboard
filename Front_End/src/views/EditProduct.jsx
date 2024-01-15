import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const [fileimage, setPhoto] = useState('');

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value,  }));
    };

    const uploadProducts = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', inputs.name);
        formData.append('description', inputs.description);
        formData.append('category_name', inputs.category);
        formData.append('price', inputs.price);
        formData.append('image', fileimage);

        try {
            const response = await axios.post(`http://localhost:8000/api/productsupdate/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage(response.data.message);
            console.log(response);
            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadProducts();
    };

    useEffect(() => {
        getproduct();
    }, [categories]);

    function getproduct() {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(function (response) {
                console.log(response);
                setInputs(response.data.product);
                setPhoto(response.data.product.image); 
            })
            .catch(function (error) {
                console.error('Error fetching product:', error);
            });
    }

    return (
        <div className='dd'>
            <Container fluid style={{ minHeight: "65vh" }}>
                <h2>Update Product</h2>
                <p className='text-warning'>{message}</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={inputs.name || ''}
                            name='name'
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            value={inputs.description || ''}
                            name='description'
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            name='category'
                            value={inputs.category || ''}
                            onChange={handleChange}
                        >
                            <option value="" hidden>Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={inputs.price || ''}
                            name='price'
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImage" >
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                                            {inputs.image && (
                            <img className='mt-3' src={`http://localhost:8000/storage/${inputs.image}`} alt='' height={200} width={200} />
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default EditProduct;
