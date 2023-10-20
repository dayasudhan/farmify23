import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Segment, Input, Form, Button, TextArea, Modal, Select } from 'semantic-ui-react';

// const states = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Andhra Pradesh'];
// const districts = {
//   Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
//   Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
//   'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
//   'Andhra Pradesh': ['Hyderabad', 'Vijayawada', 'Visakhapatnam'],
// };

const SegmentExampleNestedSegments = () => {
  const [showModal, setShowModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const formRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  // const [districtOptions, setDistrictOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: 'Devraj',
    phone: '956629075',
    address: 'Kuruva, Honnali, Davangere, Karnataka',
    email: 'dayasudhankg@gmail.com',
    landMark: '',
    city: 'Shimoga',
    item_name: 'tractri',
    item_year: '2020',
    item_price: '25000',
    item_place: '',
    description: 'Sample description',
    district: '',
    state: '',
  });

  useEffect(() => {
    // Fetch states and districts from the backend API here
    // Replace the following with your actual API endpoint
    axios.get('/states')
      .then((response) => {
        setStates(response.data?.states); // Assuming the API response is an array of state options
        setDistricts(response.data?.districts);
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (_, data) => {
    setFormData({ ...formData, state: data.value, district: '' });
  };

  const handleDistrictChange = (_, data) => {
    setFormData({ ...formData, district: data.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataFinal = new FormData();
    selectedFiles.forEach((file, i) => {
      formDataFinal.append('images', file);
    });
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        formDataFinal.append(key, value);
      }
    }
    try {
      await axios.post('/upload', formDataFinal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        setTimeout(() => {
          setResponseText(`Item Posted Successfully With Id : ${response?.data?.id}`);
          setShowModal(true);
        }, 1000);
      }).catch((error) => {
        console.error('error', error);
      });
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    location.reload();
  };

  return (
    <Segment.Group>
      <Segment.Group horizontal>
        <Segment>
          <Segment textAlign="center">
            <h3>Item Details</h3>
          </Segment>
          <p />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Field>
              <label>Item Details</label>
              <Input
                name="item_name"
                focus
                placeholder="Item Name..."
                value={formData.item_name}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="item_year"
                focus
                placeholder="Item Manufacture Year"
                value={formData.item_year}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="item_price"
                focus
                placeholder="Item Rate/Price..."
                value={formData.item_price}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
    
              <TextArea
                name="description"
                rows={2}
                placeholder="Description..."
                value={formData.description}
                defaultValue={formData.description}
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Seller Details</label>
              <Input
                name="name"
                focus
                placeholder="Name..."
                value={formData.name}
                defaultValue={formData.name}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="phone"
                focus
                placeholder="Phone Number"
                value={formData.phone}
                defaultValue={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="city"
                focus
                placeholder="Village/City..."
                value={formData.city}
                defaultValue={formData.city}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="address"
                focus
                placeholder="Address..."
                value={formData.address}
                defaultValue={formData.address}
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <label>State</label>
              <Select
                name="state"
                options={states.map((state) => ({ key: state, text: state, value: state }))}
                value={formData.state}
                onChange={handleStateChange}
              />
            </Form.Field>
            <Form.Field>
              <label>District</label>
              <Select
                name="district"
                options={formData.state ? districts[formData.state].map((district) => ({ key: district, text: district, value: district })) : []}
                value={formData.district}
                onChange={handleDistrictChange}
              />
            </Form.Field>
            <div>
              <label htmlFor="images">Image:</label>
              <input
                type="file"
                id="images"
                accept="images/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <Button primary style={{ marginLeft: 'auto' }}>
                Submit
              </Button>
            </div>
          </Form>
          <Modal open={showModal} onClose={closeModal}>
            <Modal.Header>Response</Modal.Header>
            <Modal.Content>
              <p>{responseText}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={closeModal}>Close</Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </Segment.Group>
    </Segment.Group>
  );
};

export default SegmentExampleNestedSegments;
