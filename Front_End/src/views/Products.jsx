import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Breadcrumb from '../components/Common/Breadcrumb';

function Products() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch Product on component mount
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/productsdelete/${selectedProduct.id}`);
      // After deleting, fetch updated list of categories
      fetchProducts();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting Products:', error);
    }
  };

  
  const handleCloseModals = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className='dd'>
        <Container fluid style={{minHeight: "65vh"}}>
        <Breadcrumb title="Admin" breadcrumbItem="Product" />      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pdata, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{pdata.name}</td>
              <td>{pdata.category_name}</td>
              <td>{pdata.description}</td>
              <td><img src={`http://localhost:8000/storage/${pdata.image}`} alt='' height={50} width={90}/></td>
              <td>{pdata.price}</td>
              <td>
              <Link to={`/editproduct/${pdata.id}/edit`}>
                <Button className="dd">
                  Edit
                </Button>
              </Link>

              <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedProduct(pdata);
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
      <Link to={'/addproduct'}>
        <Button variant="primary">
          Create Category
        </Button>
      </Link>

  {/* Delete Modal */}
  <Modal show={showDeleteModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the category <strong>{selectedProduct?.name}</strong>?
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
  )
}

export default Products