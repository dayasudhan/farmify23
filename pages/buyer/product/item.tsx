import { Image, List, Rating,Segment,Grid ,Form, Button,Modal} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import React, { Component, useEffect ,useState} from 'react';

import Header from '../../common/header';
import Footer from '../../common/footer';
import ImageGallery2 from './horizontalgalley';
import 'semantic-ui-css/semantic.css';
import axios from 'axios';
import Link from 'next/link';
const baseURL = '/items/';
const enquiryURL = '/enquiry';
const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    itemId: '',
    city:'',
    state:'Karnataka',
    zipCode:''
  });
 const [data, setData] = useState(null) 
 const [imageUrls,setImageUrl] = useState(null) 
 
 

 const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
const openModal = () => {
  console.log("id",id)
  setFormData((prevData) => ({
  ...prevData,
  ['itemId']: id,
}));
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};
const openSuccessModal = () => {

  setSuccessModalOpen(true);
};

const closeSuccessModal = () => {
  setSuccessModalOpen(false);
};
const saveData = () => {
console.log("saveData",formData,enquiryURL)
  // Perform Axios POST request here
  axios.post(enquiryURL, formData).then(response => {
      console.log('Data saved successfully:', response.data);
      closeModal();
      openSuccessModal();
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
};
 React.useEffect(() => {
  console.log('reacteffect');
  const url = baseURL + id;
  {id && axios.get(url).then((response) => {
    setData(response.data);
    setImageUrl(response.data?.image_urls);
    console.log('response', response.data);
   
  })}
},[id]);
  console.log("Dayasudhan",router)

  return (
    <div>
    <Segment>
    <Header />
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          {/* {imageUrl && (
            <Image src={imageUrl} />
          )} */}
   
           <ImageGallery2 imageUrls={imageUrls}/>
      
        </Grid.Column>
        <Grid.Column>
          <div>
            {/* <Link href="/buyer/cart/cart">
              {data?.name}
            </Link> */}
            <h1 className="ui header">
              <div href="#" className="header">
                {data?.name}
              </div>
            </h1>

            <br />
            <br />
            <div className="price">
              Description: {data?.description}
              <br />
              Manufacture Year: {data?.makeYear}
              <br />
              Price/Rate: Rs {data?.price} 
              <br />
              <br />
              <b>Seller Details: </b>
              <br />
              Name: {data?.price} 
              <br />      
              Phone: {data?.phone} 
              <br />          
              Address: {data?.address1} 
              <br />     
              city: {data?.city} 
              <br />
              state: {data?.state} 
              <br />
            </div>
            <Rating icon="star" defaultRating={5} maxRating={5} />
            <h3 className="ui header">

              <div>
             
                  <Button primary onClick={openModal}>Contact / Enquiry</Button>
                  <Modal open={modalOpen} onClose={closeModal}>
                    <Modal.Header>Add Buyer details</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Field>
                          <label>Name</label>
                          <input
                            name="name"
                            placeholder="Name..."
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Phone</label>
                          <input
                            name="phone"
                            placeholder="Phone..."
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Address</label>
                          <input
                            name="address"
                            placeholder="Address..."
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </Form.Field>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={closeModal}>Cancel</Button>
                      <Button positive onClick={saveData}>
                        Submmit
                      </Button>
                    </Modal.Actions>
                  </Modal>
               {/* Success Modal */}
              <Modal open={successModalOpen} onClose={closeSuccessModal}>
                <Modal.Header>Enquiry Success</Modal.Header>
                <Modal.Content>
                  <p>Enquiry sent successfully!.</p>
                  <p>Seller will contact you soon </p>
                  <p>Thank You</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button positive onClick={closeSuccessModal}>
                    Close
                  </Button>
                </Modal.Actions>
              </Modal>
                {/* <a href="/buyer/cart/cart">
                  <Button primary>Buy1</Button>
                </a> */}
              </div>
            </h3>
          </div>
        </Grid.Column>
      </Grid.Row>

      {/* <Grid.Row columns={3}>
        <Grid.Column>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
      </Grid.Row> */}
    </Grid>
    <Footer />
  </Segment>
  </div>
  )
}

export default Item;
