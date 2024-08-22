import React, { useState, useEffect } from 'react';
import { Image, List, Rating, Segment, Grid, Form, Button, Modal, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Header from '../../common/header';
import Footer from '../../common/footer';
import ImageGallery2 from './horizontalgallery';
import 'semantic-ui-css/semantic.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const baseURL = '/items/';
const enquiryURL = '/enquiry';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;

  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    itemId: id,
    city: '',
    state: '',
    zipCode: '',
  });

  const [data, setData] = useState(null);
  const [imageUrls, setImageUrl] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => {
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

  const saveData = (id) => {
    let isFormValid = true;
    formData.itemId = id;
    if (formData.name.trim() === '') {
      alert('Your Name is required');
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
      alert('Address is required');
      isFormValid = false;
    }
    if (!isFormValid) {
      return;
    }

    // Perform Axios POST request here
    axios
      .post(enquiryURL, formData)
      .then((response) => {
        console.log('Data saved successfully:', response.data);
        closeModal();
        openSuccessModal();
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };


  const shareItem = (platform) => {
    const itemLink = `https://tractree.in/buyer/product/item?id=${id}`;
    let shareUrl = '';
  
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(itemLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this item on Tractree: ${itemLink}`)}`;
        break;
      case 'instagram':
        // Instagram doesn't allow direct URL sharing to stories/posts, but you can share via a deep link or ask users to copy the link.
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(itemLink)}`;
        break;
      default:
        return;
    }
  
    window.open(shareUrl, '_blank');
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const url = baseURL + id;

      if (id) {
        try {
          const response = await axios.get(url);
          setData(response.data);
          setImageUrl(response.data?.image_urls);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Segment>
        <Header />
        
        <Grid stackable>
          <Grid.Row columns={1}>
            <Grid.Column>
              <ImageGallery2 imageUrls={imageUrls} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div>
                <h1 className="ui header">{data?.name}</h1>
                <div className="price">
                  <p>Description: {data?.description}</p>
                  <p>Manufacture Year: {data?.makeYear}</p>
                  <p>Price/Rate: Rs {data?.price}</p>
                  <p>
                    <b>Seller Details:</b>
                    <br />
                    Name: {data?.dealer.username}
                    <br />
                    Phone: {data?.dealer.phone}
                    <br />
                    Address: {data?.address}
                    <br />
                    District: {data?.district}
                    <br />
                    State: {data?.state}
                    <br />
                    Posted On: {new Date(data?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
                  </p>
                  
                </div>
                <Rating icon="star" defaultRating={4} maxRating={5} />
                <div>
                  <Button primary onClick={openModal}>
                    Enquiry
                  </Button>
             
                    <Button color='facebook' icon labelPosition='left' onClick={() => shareItem('facebook')}>
                      <Icon name='facebook' />
                     Share
                    </Button>
                    <Button color='green' icon labelPosition='left' onClick={() => shareItem('whatsapp')}>
                      <Icon name='whatsapp' />
                      Share
                    </Button>
                    <Button color='instagram' icon labelPosition='left' onClick={() => shareItem('instagram')}>
                      <Icon name='instagram' />
                      Instagram
                    </Button>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/*  <Footer /> */}
      </Segment>

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
          <Button positive onClick={()=>saveData(data?.id)}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Success Modal */}
      <Modal open={successModalOpen} onClose={closeSuccessModal}>
        <Modal.Header>Enquiry Success</Modal.Header>
        <Modal.Content>
          <p>Enquiry sent successfully!.</p>
          <p>Seller will contact you soon</p>
          <p>Thank You</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={closeSuccessModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>

    </div>
  );
};

export default Item;
