import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  IconButton,
  Tooltip,
  Container
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Header from '../../common/header';
import Footer from '../../common/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './../../authContext';
import ReactGA from 'react-ga4';

const baseURL = '/items/';
const enquiryURL = '/enquiry';

const brandImages = {
  mahindra: 'https://www.tractorjunction.com/assets/images/mahindra-logo.png',
  'john-deere': 'https://www.tractorjunction.com/assets/images/john-deere-logo.png',
  swaraj: 'https://www.tractorjunction.com/assets/images/swaraj-logo.png',
  'new-holland': 'https://www.tractorjunction.com/assets/images/new-holland-logo.png',
  'massey-ferguson': 'https://www.tractorjunction.com/assets/images/massey-ferguson-logo.png',
  kubota: 'https://www.tractorjunction.com/assets/images/kubota-logo.png',
  force: 'https://www.tractorjunction.com/assets/images/force-logo.png',
  sonalika: 'https://www.tractorjunction.com/assets/images/sonalika-logo.png',
};

const Item = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
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
  const [imageUrls, setImageUrl] = useState([]);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname, title: 'Item Page' });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = baseURL + id;
      if (id) {
        try {
          const response = await axios.get(url);
          setData(response.data);
          setImageUrl(response.data?.image_urls || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openModal = () => {
    ReactGA.event({ category: 'Enquiry', action: 'Enquiry on Item', label: 'Enquiry' });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const openSuccessModal = () => setSuccessModalOpen(true);
  const closeSuccessModal = () => setSuccessModalOpen(false);

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
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert('Invalid phone number format');
      isFormValid = false;
    }
    if (formData.address.trim() === '') {
      alert('Address is required');
      isFormValid = false;
    }
    if (!isFormValid) return;
    axios.post(enquiryURL, formData)
      .then(() => {
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
        ReactGA.event({ category: 'Share', action: 'Share on Facebook', label: 'Share' });
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(itemLink)}`;
        break;
      case 'whatsapp':
        ReactGA.event({ category: 'Whatsapp', action: 'Share on Whatsapp', label: 'Share' });
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this item on Tractree: ${itemLink}`)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <Box bgcolor="#fff" minHeight="100vh">
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Image Gallery */}
        <Box mb={3}>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
            {imageUrls && imageUrls.length > 0 ? (
              imageUrls.map((img, idx) => (
                <Box key={idx} sx={{ minWidth: 220, maxWidth: 300, borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', bgcolor: '#fafafa' }}>
                  <img src={img} alt={data?.name} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                </Box>
              ))
            ) : (
              <Box sx={{ minWidth: 220, maxWidth: 300, borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', bgcolor: '#fafafa' }}>
                <img src={'/placeholder-tractor.jpg'} alt={data?.name} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
              </Box>
            )}
          </Box>
        </Box>
        {/* Title & Key Info */}
        <Box mb={3}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              {data?.brand && brandImages[data.brand.toLowerCase()] && (
                <img src={brandImages[data.brand.toLowerCase()]} alt={data.brand} style={{ height: 40, borderRadius: 8, background: '#fff', boxShadow: '0 2px 8px #b2dfdb' }} />
              )}
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight={700} color="#398378" gutterBottom>
                {data?.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {data?.model} {data?.makeYear && `(${data?.makeYear})`}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={data?.type || 'Equipment'}
                color="primary"
                size="small"
                sx={{ fontWeight: 600, fontSize: 16, borderRadius: 2 }}
              />
            </Grid>
          </Grid>
          <Stack direction="row" alignItems="center" spacing={2} mt={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MonetizationOnIcon color="success" />
              <Typography variant="h5" color="success.main" fontWeight={700}>
                {data?.price ? `₹${data.price.toLocaleString()}` : 'Price on enquiry'}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PlaceIcon color="primary" />
              <Typography variant="body1" color="text.secondary">
                {data?.district}, {data?.state}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        {/* Action Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PhoneIcon />}
            sx={{ borderRadius: 2, fontWeight: 600, minWidth: 160 }}
            onClick={openModal}
          >
            Contact Seller
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ShareIcon />}
            sx={{ borderRadius: 2, fontWeight: 600, minWidth: 160 }}
            onClick={() => shareItem('facebook')}
          >
            Share
          </Button>
          <Button
            variant="outlined"
            color="success"
            startIcon={<WhatsAppIcon />}
            sx={{ borderRadius: 2, fontWeight: 600, minWidth: 160 }}
            onClick={() => shareItem('whatsapp')}
          >
            WhatsApp
          </Button>
        </Stack>
        {/* Key Specs Table */}
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SpecRow label="ID" value={data?.id} />
              <SpecRow label="Model" value={data?.model} />
              <SpecRow label="Manufacture Year" value={data?.makeYear} />
              <SpecRow label="Hours Driven" value={data?.hoursDriven} />
              <SpecRow label="Price/Rate" value={data?.price ? `₹${data.price}` : 'On Enquiry'} />
              <SpecRow label="Hypothecation" value={data?.hypothecation_status} />
              <SpecRow label="Loan Status" value={data?.loan_status} />
              <SpecRow label="Loan Availability" value={data?.loan_availability ? 'Yes' : 'No'} />
              <SpecRow label="Insurance Status" value={data?.insurance_status ? 'Yes' : 'No'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SpecRow label="RC Present" value={data?.rc_present ? 'Yes' : 'No'} />
              <SpecRow label="FC" value={data?.fitnessCertificate ? 'Yes' : 'No'} />
              <SpecRow label="Tailor Attached" value={data?.tailor_attached ? 'Yes' : 'No'} />
              <SpecRow label="Previous Owner" value={data?.no_of_owners} />
              <SpecRow label="RTO" value={data?.rto} />
              <SpecRow label="Tyre Condition" value={data?.tyre_condition} />
              <SpecRow label="Implements If Any" value={data?.implements} />
              <SpecRow label="Description" value={data?.description} />
            </Grid>
          </Grid>
        </Box>
        {/* Seller Info */}
        <Box mb={3}>
          <Card sx={{ bgcolor: '#fafafa', borderRadius: 2, boxShadow: 'none', p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} color="#398378" mb={1}>
                Seller Information
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}><b>Name:</b> {data?.seller_name}</Grid>
                <Grid item xs={12} sm={6}><b>Phone:</b> {data?.phone}</Grid>
                <Grid item xs={12} sm={6}><b>Address:</b> {data?.address}</Grid>
                <Grid item xs={12} sm={6}><b>Village/City:</b> {data?.city}</Grid>
                <Grid item xs={12} sm={6}><b>District:</b> {data?.district}</Grid>
                <Grid item xs={12} sm={6}><b>State:</b> {data?.state}</Grid>
                <Grid item xs={12} sm={6}><b>Posted On:</b> {data?.createdAt && new Date(data?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
      {/* Contact Seller Dialog */}
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>Contact Seller</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={() => saveData(id)}>
            Send Enquiry
          </Button>
        </DialogActions>
      </Dialog>
      {/* Success Dialog */}
      <Dialog open={successModalOpen} onClose={closeSuccessModal}>
        <DialogTitle>Enquiry Sent</DialogTitle>
        <DialogContent>
          <Typography>Your enquiry has been sent to the seller. They will contact you soon.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSuccessModal}>Close</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </Box>
  );
};

const SpecRow = ({ label, value }) => (
  <Box display="flex" alignItems="center" gap={1} py={0.5}>
    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140, fontWeight: 600 }}>
      {label}:
    </Typography>
    <Typography variant="body2" color="text.primary">
      {value || '-'}
    </Typography>
  </Box>
);

export default Item;
