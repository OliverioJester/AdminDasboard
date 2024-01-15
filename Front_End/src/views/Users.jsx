import React, { useEffect, useState,  } from 'react'
import Container from 'react-bootstrap/Container';
import axiosClient from '../axios-client';
import Breadcrumb from '../components/Common/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/esm/Table';
import "../assets/scss/app.scss";
import "../assets/css/loading.css";
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const {notification} = useStateContext();

  // Edit


  useEffect(() => {
    getUsers();
  }, []);

const onDelete = (u) => {
  setUserToDelete(u);
  setShowDeleteModal(true);
};

const handleCloseDeleteModal = () => {
  setShowDeleteModal(false);
  setUserToDelete(null);
};

const handleConfirmDelete = () => {
  // Perform delete operation here
  axiosClient
    .delete(`/users/${userToDelete.id}`)
    .then(() => {
      console.log('User deleted successfully');
      // TODO: Add any additional logic or notifications
      getUsers(); // Refresh the user list
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      // TODO: Handle error and display an error message
    })
    .finally(() => {
      // Close the modal
      handleCloseDeleteModal();
    });
};

  const getUsers = () => {
    setLoading(true)
    axiosClient.get(`/users?page=${currentPage}&per_page=${itemsPerPage}`)
      .then(({data}) => {
        setLoading(false)
       setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // pagination
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div >
            {/* Loading bar animation */}
            {loading && <div className="loading-bar"></div>}
            
        <Container fluid style={{minHeight: "68vh"}}>
          <Breadcrumb title="Admin" breadcrumbItem="Users" />
          <div className='text-end mb-2'>
            <Link to="/users/new">
              <Button  className="dd">
                  Add New
              </Button>
            </Link>
          </div>   

          <div className=''>
            <Card className=' border animated fadeInDown mx-auto'>
              <Table responsive="sm" bordered hover >
                  <thead>
                    <tr>
                      <th  className='dd'>ID</th>
                      <th className='dd'>Name</th>
                      <th className='dd'>Email</th>
                      <th className='dd'>Create Date</th>
                      <th className='dd'>Actions</th>
                    </tr>
                  </thead>
                  {loading && <tbody>
                    <tr>
                      <td colSpan="5" className='text-center dd'>
                      Loading...
                      </td>
                    </tr>
                  </tbody>
                  
                  }
                {!loading && 
                  <tbody>
                    {users.map(u => (
                      <tr  key={u.id}>
                        <td className='dd'>{u.id}</td>
                        <td className='dd'>{u.name}</td>
                        <td className='dd'>{u.email}</td>
                        <td className='dd'>{u.created_at}</td>
                        <td className='dd'>
                        <Link to={'/users/'+u.id}>
                          <Button className='ms-1' variant='outline-primary'>
                            <FontAwesomeIcon icon={ faEdit }/>
                          </Button>         
                        </Link>
                          <Button onClick={ev => onDelete(u)}  className='ms-1' variant='outline-danger'>
                              <FontAwesomeIcon icon={ faTrashCan } className='dd'/>
                          </Button>                 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
              </Table>



       {/* Render the pagination component */}
      <div style={{marginLeft: "auto", marginRight:" 0"}}>
       <Pagination className="mt-2 ">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

          {[...Array(3).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === 3} />
          <Pagination.Last onClick={() => handlePageChange(3)} disabled={currentPage === 3} />
        </Pagination>
      </div>
            </Card>          
          </div>

                {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />     
        </Container>
        {notification &&
              <ToastContainer   fixed="bottom" className="position-fixed p-3 bottom-0 end-0" style={{ zIndex: 1 }}>
                  <Toast className="bg-primary">
                  <Toast.Body>{notification}</Toast.Body>
                </Toast>
              </ToastContainer> 
              }
    </div>
  )
}
