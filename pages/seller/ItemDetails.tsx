import React, { useState ,useRef , useEffect } from 'react'
import axios from 'axios';
import { Segment, Input, Form, Button ,Checkbox,TextArea,Modal } from 'semantic-ui-react';

const SegmentExampleNestedSegments = () => {
  const [showModal, setShowModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const formRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "Devraj",
    phone: "956629075",
    address: "Kuruva,Honnali,Davangere,Karnataka",
    email: "dayasudhankg@gmail.com",
    landMark:"",
    city:"Shimoga",
    item_name:"tractri",
    item_year:"2020",
    item_price:"25000",
    item_place:"",
    description:"Sample description",
  });

  const handleInputChange = (event) => {
    console.log("event",event.target)
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
        console.log(`Key: ${key}, Value: ${value}`);
        formDataFinal.append(key, value);
      }
    }
    try {
      await axios.post('/upload', formDataFinal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setTimeout(() => {
          setResponseText(`Item Posted Successfully With Id : ${response?.data?.id}`); // Set the response text to be shown in the modal
          setShowModal(true); // Show the modal
        }, 1000); // Delay of 1 second
      })
      .catch(error => {
        console.error("error",error);
      });
    } catch (error) {
      console.error('Error uploading images: ', error);
      // Handle error
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
      <Segment textAlign='center'> <h3>Item Details</h3></Segment>
        <p></p>{' '}
        <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Field>
        <label>Item Details</label>
        <Input name="item_name" 
          focus placeholder="Item Name..."
          value={formData.item_name} 
          onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="item_year"
           focus placeholder="Item Manufacture Year"
           value={formData.item_year} 
           onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="item_price"
          focus placeholder="Item Rate/Price..." 
          value={formData.item_price} 
          onChange={handleInputChange}
          />
        </Form.Field>
        {/* <p></p>
        <Form.Field>
          <Input name="item_place"
          focus placeholder="Item Place..." 
          value={formData.item_place} 
          onChange={handleInputChange}
          />
          </Form.Field> */}
        {/* <p></p>
        <Form.Field>
          <Input name="address"
          focus placeholder="Address..." 
          value={formData.address} 
          onChange={handleInputChange}
          />
        </Form.Field> */}
        <p></p>
        <Form.Field>
        <label>Seller Details</label>
        <Input name="name" 
          focus placeholder="Name..."
          value={formData.name} 
          defaultValue={formData.name}
          onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="phone"
           focus placeholder="Phone Number"
           value={formData.phone} 
           defaultValue={formData.phone}
           onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="city"
          focus placeholder="Village/City..." 
          value={formData.city} 
          defaultValue={formData.city}
          onChange={handleInputChange}
          />
          </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="address"
          focus placeholder="Address..." 
          value={formData.address} 
          defaultValue={formData.address}
          onChange={handleInputChange}
          />
        </Form.Field>
        <p></p>    
        <Form.Field>
          <label>Item Details</label>
          <TextArea name='description'
          rows={2} 
          placeholder='Description...' 
          value={formData.description} 
          defaultValue={formData.description}
          onChange={handleInputChange}/>
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
)};

export default SegmentExampleNestedSegments;
