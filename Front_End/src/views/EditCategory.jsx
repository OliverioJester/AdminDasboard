import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null); // Initialize as null

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const uploadCategories = async () => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', inputs.name);
    formData.append('image', image);
    const response = await axios.post(`http://localhost:8000/api/categoriesupdate/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setMessage(response.data.message);
    console.log(response);
    setTimeout(() => {
      navigate('/categories');
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadCategories();
  };

  useEffect(() => {
    getcategory();
  }, []);

  function getcategory() {
    axios.get(`http://localhost:8000/api/categories/${id}`).then(function (response) {
      console.log(response);
      setInputs(response.data.category);
    });
  }

  return (
    <div className='dd'>
      <p className='text-success'>{message}</p>

      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='exampleInputName1' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputName1'
            placeholder='Enter category name'
            value={inputs.name || ''} // Provide a default value to prevent undefined
            name='name'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputImage' className='form-label'>
            Image
          </label>
          {inputs.image && (
            <img src={`http://localhost:8000/storage/${inputs.image}`} alt='' height={300} width={300} />
          )}
          <input type='file' className='form-control' id='exampleInputImage' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
