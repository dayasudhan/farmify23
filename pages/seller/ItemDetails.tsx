import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Segment, Input, Form, Button, TextArea, Modal, Select } from 'semantic-ui-react';
import { useAuth } from './../authContext';
const  SegmentExampleNestedSegments = () => {
  const [showModal, setShowModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const formRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const { location } = useAuth();
  
  const [formData, setFormData] = useState({
    name: 'Devraj',
    phone: '9566229075',
    address: '',
    email: 'dayasudhankg@gmail.com',
    landMark: '',
    city: '',
    item_name: 'tractri',
    item_year: '2020',
    item_price: '25000',
    item_place: '',
    description: 'Sample description',
    district: '',
    state: '',
    latitude:0,
    longitude:0,
    postcode:'',
  });
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // Make a single axios call to fetch both states and districts
    axios
      .get('/states')
      .then((response) => {
        const { states, districts } = response.data;
        setStates(states); // Assuming the API response contains an array of state options
        setDistricts(districts);
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              
              const apiKey = '04a5800be4bb465bb63d271f5b3941e4';
              const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  if (data.results && data.results.length > 0) {
                    const districtInfo = data.results[0].components;
                    const address = data.results[0].formatted.replace("unnamed road,", "");
                    // console.log("districtInfo",districtInfo)
                    setFormData({
                      ...formData,
                      latitude,
                      longitude,
                      postcode:districtInfo.postcode,
                      state: districtInfo.state,
                      district: districtInfo.state_district.replace(' District', ''),
                      address: `${districtInfo.county}, ${address}`,
                      city:districtInfo['suburb']?districtInfo['suburb']:districtInfo['village']?districtInfo['village']:districtInfo['town'],
                    });
                  } else {
                    alert('District information not found.');
                  }
                })
                .catch((error) => {
                  console.error('Error fetching district information:', error);
                });
            },
            (error) => {
              console.error('Error getting location:', error.message);
            }
          );
        } else {
          console.error('Geolocation is not available in this browser.');
          setFormData({ ...formData, state: response.data?.states[0] ,
            district: response.data?.districts[response.data?.states[0]][0]});
        }
      })
      .catch((error) => {
        console.error('Error fetching states and districts:', error);
      });
  }, []);
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'name') {
      setNameError('');
    }
    if (name === 'phone') {
      setPhoneError('');
    }
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
    if (isSubmitting) return; 
    let isFormValid = true;

    if (formData.item_name.trim() === '') {
      alert('Seller Item Name is required');
      isFormValid = false;
    }

    if (formData.item_price.trim() === '') {
      alert('Seller Item Price/Rate is required');
      isFormValid = false;
    }

    if (formData.name.trim() === '') {
      alert('Seller Name is required');
      isFormValid = false;
    }
    if (formData.phone.trim() === '') {
      alert('Phone number is required');
      isFormValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number format');
      isFormValid = false;
    }
    if (formData.address.trim() === '') {
      alert('Seller Address is required');
      isFormValid = false;
    }
    if (formData.state.trim() === '') {
      alert('Seller state is required');
      isFormValid = false;
    }
    if (formData.district.trim() === '') {
      alert('Seller district is required');
      isFormValid = false;
    }

    if (selectedFiles.length == 0) {
      alert('At least add One Image');
      isFormValid = false;
    }



    if (!isFormValid) {
      return; // Prevent form submission if there are errors
    }
    setIsSubmitting(true);
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
    finally {
      setIsSubmitting(false); // Reset the submitting state after submission
    }
  };

  const closeModal = () => {
    setShowModal(false);
    //location.reload();
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
              {nameError && <div className="error">{nameError}</div>}
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
                value={formData.state || (states.length > 0 ? states[0] : '')}
                onChange={handleStateChange}
              />
            </Form.Field>
            <Form.Field>
              <label>District</label>
              <Select
                name="district"
                options={formData.state ? districts[formData.state].map((district) => ({ key: district, text: district, value: district })) : []}
                value={formData.district || (formData.state && districts[formData.state].length > 0 ? districts[formData.state][0] : '')}
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
              <Button primary style={{ marginLeft: 'auto' }} disabled={isSubmitting}>
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
