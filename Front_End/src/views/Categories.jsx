import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/esm/Table';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Common/Breadcrumb';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(''); // New state for handling image upload
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories on component mount
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setLoading(false)
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image); // Append image file to the form data

      const response =await axios.post('http://localhost:8000/api/categoriescreate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response){
        console.log(response)
        setMessage(response.message);
        setTimeout(()=>{
          fetchCategories();
          setShowCreateModal(false);
        }, 2000)
      }


      // After creating, fetch updated list of categories

    } catch (error) {
      console.error('Error creating category:', error);
    }
  };



  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/categoriesdelete/${selectedCategory.id}`);
      // After deleting, fetch updated list of categories
      fetchCategories();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleImageChange = (e) => {
    // Update the image state when the file input changes
    setImage(e.target.files[0]);
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
    setName('');
    setImage(''); // Clear the image state when closing the modal
  };

  return (
    <div className='dd'>
      <Container fluid style={{minHeight: "65vh"}}>
      <Breadcrumb title="Admin" breadcrumbItem="Categories" />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{category.name}</td>
              <td><img src={`http://localhost:8000/storage/${category.image}`} alt='' height={50} width={90}/></td>
              <td>
              <Link to={`/editcategory/${category.id}/edit`}>
                <Button className="dd">
                  Edit
                </Button>
              </Link>

                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={() => setShowCreateModal(true)}>
        Create Category
      </Button>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
          <p className='text-warning'>{message}</p>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCategoryImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the category <strong>{selectedCategory?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
};

export default Categories