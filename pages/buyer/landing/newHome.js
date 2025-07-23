import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  Stack,
  Paper,
  Autocomplete,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlaceIcon from '@mui/icons-material/Place';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TractorIcon from '@mui/icons-material/Agriculture';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import { useAuth } from '../../authContext';
import { useRouter } from 'next/router';
import HeaderComponent from '../../common/header';
import Footer from '../../common/footer';
import ReactGA from "react-ga4";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

const baseURL = '/items';

const categories = [
  { key: 'all', label: 'All Items', value: 'all', icon: <FilterAltIcon /> },
  { key: 'tractor', label: 'Tractor', value: 'tractor', icon: <TractorIcon /> },
   { key: 'trailer', label: 'Trailer', value: 'trailer' },
  { key: 'cultivator', label: 'Cultivator', value: 'cultivator' },
  { key: 'rotavator', label: 'Rotavator', value: 'rotavator' },
  { key: 'plough', label: 'Plough', value: 'plough' },
  { key: 'harrow', label: 'Harrow', value: 'harrow' },
  { key: 'seeder', label: 'Seeder', value: 'seeder' },
  { key: 'sprayer', label: 'Sprayer', value: 'sprayer' },
 
  { key: 'thresher', label: 'Thresher', value: 'thresher' },
  { key: 'baler', label: 'Baler', value: 'baler' },
  { key: 'post-hole-digger', label: 'Post Hole Digger', value: 'post hole digger' },
  { key: 'mulcher', label: 'Mulcher', value: 'mulcher' },
  { key: 'puddler', label: 'Puddler', value: 'puddler' },
  { key: 'reaper', label: 'Reaper', value: 'reaper' }
  // { key: 'laser-land-leveler', label: 'Laser Land Leveler', value: 'laser land leveler' },
  // { key: 'fertilizer-spreader', label: 'Fertilizer Spreader', value: 'fertilizer spreader' },
 // { key: 'other', label: 'Other', value: 'other' }
];

const tractorBrands = [
  { key: 'all', label: 'All Brands', value: 'all' },
  { key: 'mahindra', label: 'Mahindra', value: 'mahindra' },
  { key: 'john-deere', label: 'John Deere', value: 'john deere' },
  { key: 'swaraj', label: 'Swaraj', value: 'swaraj' },
  { key: 'new-holland', label: 'New Holland', value: 'new holland' },
  { key: 'massey-ferguson', label: 'Massey Ferguson', value: 'massey ferguson' },
  { key: 'kubota', label: 'Kubota', value: 'kubota' },
  { key: 'force', label: 'Force', value: 'force' },
  { key: 'sonalika', label: 'Sonalika', value: 'sonalika' },
    { key: 'eicher', label: 'Eicher', value: 'eicher' },
  { key: 'escort', label: 'Escort', value: 'escort' },
  { key: 'vst', label: 'VST Shakti', value: 'vst shakti' },
   { key: 'hmt', label: 'HMT', value: 'hmt' },
  { key: 'indofarm', label: 'Indofarm', value: 'indofarm' },
  { key: 'ace', label: 'ACE', value: 'ace' },
  { key: 'trakstar', label: 'Trakstar', value: 'trakstar' }


  // { key: 'same-deutz-fahr', label: 'Same Deutz-Fahr', value: 'same deutz-fahr' 
];

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

const NewHome = () => {
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const { location } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const [selectedState, setSelectedState] = useState(''); // string
  const [selectedDistrict, setSelectedDistrict] = useState(''); // string
  const [isNearby, setIsNearby] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryItem, setEnquiryItem] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statesData, setStatesData] = useState({ states: [], districts: {} });
  const [statesLoading, setStatesLoading] = useState(true);

  useEffect(() => {
    setStatesLoading(true);
    axios.get('/states')
      .then((response) => {
        setStatesData(response.data);
      })
      .catch((error) => {
        setStatesData({ states: [], districts: {} });
        console.error('Failed to load states:', error);
      })
      .finally(() => {
        setStatesLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(baseURL).then((response) => {
      setItems(response.data);
      setFilteredData(response.data);
      const query = router.query.q || '';
      if (query) {
        setSearchQuery(query);
        filterData(query, response.data);
      }
    }).finally(() => {
      setLoading(false);
    });
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "New Home Page" });
  }, [router.query.q]);

  const filterData = (
  query,
  items,
  category = selectedCategory,
  brand = selectedBrand,
  state = selectedState,
  district = selectedDistrict,
  nearby = isNearby
) => {
  console.log("filterData", query, "sc", category,brand);

  let filteredResults = items;
  
if (category === 'tractor' ) {
  console.log("item",brand,filteredResults.length)
  if(brand != 'all')
  {
    filteredResults = filteredResults.filter(item =>
      item?.model?.toLowerCase().includes(brand.toLowerCase())
    );
  }
  else{
    filteredResults = filteredResults.filter(item => item.name === "Engine");
  }
}
else 
{
   filteredResults = filteredResults.filter((item) =>
    item?.name?.toLowerCase().includes(query.toLowerCase()) ||
    item?.description?.toLowerCase().includes(query.toLowerCase()) ||
    item?.address?.toLowerCase().includes(query.toLowerCase()) ||
    item?.city?.toLowerCase().includes(query.toLowerCase()) ||
    item?.district?.toLowerCase().includes(query.toLowerCase())
  );

  if (category !== 'all') {
    filteredResults = filteredResults.filter(item =>
      item?.type?.toLowerCase() === category.toLowerCase()
    );
  }
}

  if (state) {
    filteredResults = filteredResults.filter(item =>
      item?.state?.toLowerCase() === state.toLowerCase()
    );
  }

  if (district) {
    filteredResults = filteredResults.filter(item =>
      item?.district?.toLowerCase() === district.toLowerCase()
    );
  }

  if (nearby && location) {
    filteredResults = filteredResults.filter(item => {
      if (!item.latitude || !item.longitude) return false;
      const toRad = (v) => (v * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(item.latitude - location.latitude);
      const dLon = toRad(item.longitude - location.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(location.latitude)) *
        Math.cos(toRad(item.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d < 100;
    });
  }

  setFilteredData(filteredResults);
};


  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    ReactGA.event({
      category: "Items",
      action: "Search",
      label: "Search Box",
      nonInteraction: false,
      transport: "xhr",
    });
    router.push({
      pathname: '/buyer/landing/newHome',
      query: { q: value },
    });
    filterData(value, items);
  };

const handleCategoryChange = (event, newValue) => {
  const newCategory = categories[newValue].value;
  setSelectedCategory(newCategory);
  setSelectedBrand('all');
  filterData(searchQuery, items, newCategory, 'all'); // Pass updated values directly
};

const handleBrandChange = (event, newValue) => {
  const newBrand = tractorBrands[newValue].value;
  setSelectedBrand(newBrand);
  filterData(searchQuery, items, selectedCategory, newBrand);
};
  const handleEnquiryClick = (itemId) => {
    ReactGA.event({
      category: "Items",
      action: "Enquiry",
      label: "Enquiry Button",
    });
    router.push(`/buyer/product/item?id=${itemId}`);
  };

  const handlePostItem = () => {
    setShowPostModal(false);
    router.push('/seller/post');
  };

  const handleStateChange = (event, value) => {
    setSelectedState(value);
    setSelectedDistrict('');
    filterData(searchQuery, items);
  };
  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
    filterData(searchQuery, items);
  };
  const handleNearby = () => {
    setIsNearby(!isNearby);
    filterData(searchQuery, items);
  };

  const handleEnquiryInputChange = (event) => {
    const { name, value } = event.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEnquiry = () => {
    let isFormValid = true;
    if (enquiryForm.name.trim() === '') {
      alert('Your Name is required');
      isFormValid = false;
    }
    if (enquiryForm.phone.trim() === '') {
      alert('Phone number is required');
      isFormValid = false;
    } else if (!/^[0-9]{10}$/.test(enquiryForm.phone)) {
      alert('Invalid phone number format');
      isFormValid = false;
    }
    if (enquiryForm.address.trim() === '') {
      alert('Address is required');
      isFormValid = false;
    }
    if (!isFormValid) return;
    const payload = {
      ...enquiryForm,
      itemId: enquiryItem?.id,
    };
    axios.post('/enquiry', payload)
      .then(() => {
        setEnquiryOpen(false);
        setEnquirySuccess(true);
      })
      .catch((error) => {
        alert('Failed to send enquiry. Please try again.');
        console.error('Error saving data:', error);
      });
  };

  return (
    <Box minHeight="100vh" bgcolor="#f8f9fa">
      <HeaderComponent />
      <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
        {/* Sidebar (Drawer on mobile, Paper on desktop) */}
        {isMobile ? (
          <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
            <SidebarContent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              filterData={filterData}
              items={items}
              searchQuery={searchQuery}
              statesData={statesData}
              statesLoading={statesLoading}
            />
          </Drawer>
        ) : (
          <Paper elevation={2} sx={{ width: 270, minHeight: '100vh', p: 2, bgcolor: '#f4f8f3', borderRadius: 0, borderRight: '1px solid #e0e0e0' }}>
            <SidebarContent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              filterData={filterData}
              items={items}
              searchQuery={searchQuery}
              statesData={statesData}
              statesLoading={statesLoading}
            />
          </Paper>
        )}
        {/* Main Content */}
        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Top Bar: Centered Heading and Search Bar */}
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
            pt: 4,
            pb: 4,
            // bgcolor: '#398378',
            // borderBottomLeftRadius: 32,
            // borderBottomRightRadius: 32,
            // boxShadow: '0 4px 24px 0 #39837822',
          }}>
            <Typography variant="h4" fontWeight={800} color="#398378" mb={2} sx={{ letterSpacing: 1, textAlign: 'center' }}>
              Find Your Next Tractor
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <TextField
                fullWidth
                size="medium"
                variant="outlined"
                placeholder="Search tractors, implements, or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <SearchIcon color="primary" sx={{ mr: 1 }} />
                  ),
                  endAdornment: (
                    <Button variant="contained" color="primary" onClick={() => filterData(searchQuery, items)} sx={{ borderRadius: 8, ml: 1 }}>
                      Search
                    </Button>
                  ),
                  sx: {
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                    fontSize: 18,
                    height: 56,
                  },
                }}
              />
            </Box>
          </Box>
          {/* Item Cards Grid */}
          <Container sx={{ py: 2, flex: 1 }}>
            {loading ? (
              <Box sx={{
                width: '100%',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
              }}>
                <CircularProgress color="primary" size={56} thickness={4} />
                <Typography variant="h6" color="primary" mt={2} fontWeight={600}>
                  Loading...
                </Typography>
              </Box>
            ) : filteredData.length === 0 ? (
              <Box textAlign="center" py={8}>
                <SearchIcon sx={{ fontSize: 64, color: 'grey.400' }} />
                <Typography variant="h5" color="text.secondary" mt={2}>
                  No items found
                </Typography>
                <Typography color="text.secondary">
                  Try adjusting your search criteria or filters
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2} alignItems="stretch">
                {filteredData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', height: '100%' }}>
                    <Card
                      elevation={2}
                      sx={{
                        borderRadius: 3,
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        bgcolor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        transition: 'box-shadow 0.2s',
                        '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.10)' },
                      }}
                    >
                      <Box position="relative">
                        <CardMedia
                          component="img"
                          image={item.image_urls?.[0] || '/placeholder-tractor.jpg'}
                          alt={item.name}
                          sx={{
                            width: '100%',
                            height: 160,
                            objectFit: 'cover',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                          }}
                        />
                        {item.brand && brandImages[item.brand.toLowerCase()] && (
                          <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#fff', borderRadius: 1, p: 0.5, boxShadow: '0 1px 4px #b2dfdb' }}>
                            <img src={brandImages[item.brand.toLowerCase()]} alt={item.brand} style={{ height: 22 }} />
                          </Box>
                        )}
                      </Box>
                       <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1.5 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color="#398378" gutterBottom noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.type === 'ENGINE' && item.model ? item.model : item.name}
                      {item.makeYear && ` (${item.makeYear})`}
                    </Typography>
                    {/* <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                      <MonetizationOnIcon color="success" fontSize="small" />
                      <Typography variant="body2" color="success.main" fontWeight={700}>
                        {item.price ? `₹${item.price.toLocaleString()}` : 'Price on enquiry'}
                      </Typography>
                    </Stack> */}
                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                      <PlaceIcon color="primary" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {item.district}, {item.state}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} mb={0.5}>
                      <Chip
                        label={item.type || 'Equipment'}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 12, borderRadius: 2 }}
                      />
                      {item.model && (
                        <Chip
                          label={item.model}
                          color="default"
                          size="small"
                          sx={{ fontWeight: 500, fontSize: 12, borderRadius: 2 }}
                        />
                      )}
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5, minHeight: 28, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      sx={{ borderRadius: 2, fontWeight: 600, minWidth: 0, px: 0.5 }}
                      onClick={e => {
                        e.stopPropagation();
                        router.push(`/buyer/product/item?id=${item.id}`);
                      }}
                    >
                      More Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      sx={{ borderRadius: 2, fontWeight: 600, minWidth: 0, px: 0.5 }}
                      onClick={e => {
                        e.stopPropagation();
                        setEnquiryItem(item);
                        setEnquiryForm({ name: '', phone: '', address: '', city: '', state: '', zipCode: '' });
                        setEnquiryOpen(true);
                      }}
                    >
                      Contact Seller
                    </Button>
                  </Stack>
                </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
          <Footer />
        </Box>
      </Box>
      {/* Floating Action Button */}
      <IconButton
        color="primary"
        size="large"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: '#398378',
          color: 'white',
          boxShadow: 6,
          '&:hover': { bgcolor: '#2e6d5c' },
          zIndex: 1000,
        }}
        onClick={() => setShowPostModal(true)}
      >
        <AddIcon sx={{ fontSize: 36 }} />
      </IconButton>
      {/* Post Item Dialog */}
      <Dialog open={showPostModal} onClose={() => setShowPostModal(false)}>
        <DialogTitle>
          <AddIcon color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Post New Item
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to post a new tractor or implement?
          </Typography>
          <Typography gutterBottom>
            You'll be redirected to the seller posting page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPostModal(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handlePostItem}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {/* Enquiry Modal Dialog */}
      <Dialog open={enquiryOpen} onClose={() => setEnquiryOpen(false)}>
        <DialogTitle>Enquire about {enquiryItem?.model || enquiryItem?.name}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please enter your enquiry details. The seller will be notified.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={enquiryForm.name}
            onChange={handleEnquiryInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phone"
            type="tel"
            fullWidth
            variant="outlined"
            value={enquiryForm.phone}
            onChange={handleEnquiryInputChange}
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            type="text"
            fullWidth
            variant="outlined"
            value={enquiryForm.address}
            onChange={handleEnquiryInputChange}
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            type="text"
            fullWidth
            variant="outlined"
            value={enquiryForm.city}
            onChange={handleEnquiryInputChange}
          />
          <TextField
            margin="dense"
            label="State"
            name="state"
            type="text"
            fullWidth
            variant="outlined"
            value={enquiryForm.state}
            onChange={handleEnquiryInputChange}
          />
          <TextField
            margin="dense"
            label="Zip Code"
            name="zipCode"
            type="text"
            fullWidth
            variant="outlined"
            value={enquiryForm.zipCode}
            onChange={handleEnquiryInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnquiryOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSendEnquiry}>
            Send Enquiry
          </Button>
        </DialogActions>
      </Dialog>
      {/* Enquiry Success Dialog */}
      <Dialog open={enquirySuccess} onClose={() => setEnquirySuccess(false)}>
        <DialogTitle>Enquiry Sent</DialogTitle>
        <DialogContent>
          <Typography>Your enquiry has been sent to the seller. They will contact you soon.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnquirySuccess(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// SidebarContent component
function SidebarContent({ selectedCategory, setSelectedCategory, selectedBrand, setSelectedBrand, selectedState, setSelectedState, selectedDistrict, setSelectedDistrict, filterData, items, searchQuery, statesData, statesLoading }) {
  return (
    <Box sx={{ width: 240, p: 1 }}>
      <Typography variant="h6" fontWeight={700} color="#398378" mb={2}>
        Filters
      </Typography>
      {/* State & District Filter (moved to top) */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        State
      </Typography>
      <Autocomplete
        options={Array.isArray(statesData.states) ? statesData.states : []}
        getOptionLabel={option => option}
        value={selectedState}
        onChange={(e, value) => {
          setSelectedState(value);
          setSelectedDistrict('');
          filterData(searchQuery, items, selectedCategory, selectedBrand, value, '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="State"
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {statesLoading ? <CircularProgress color="primary" size={18} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{ mb: 2 }}
        loading={statesLoading}
      />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        District
      </Typography>
      <Autocomplete
        options={selectedState && statesData.districts[selectedState] ? statesData.districts[selectedState] : []}
        getOptionLabel={option => option}
        value={selectedDistrict}
        onChange={(e, value) => {
          setSelectedDistrict(value);
          filterData(searchQuery, items, selectedCategory, selectedBrand, selectedState, value);
        }}
        renderInput={(params) => <TextField {...params} label="District" variant="outlined" size="small" />}
        disabled={!selectedState}
        sx={{ mb: 2 }}
      />
      {/* Category Filter */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Category
      </Typography>
      <Stack direction="column" spacing={1} mb={2}>
        {categories.map((category) => (
          <React.Fragment key={category.key}>
            <Button
              variant={selectedCategory === category.value ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              sx={{ borderRadius: 2, justifyContent: 'flex-start', textTransform: 'none', fontWeight: 600 }}
              onClick={() => {
                setSelectedCategory(category.value);
                setSelectedBrand('all');
                filterData(searchQuery, items, category.value, 'all');
              }}
              startIcon={category.icon}
            >
              {category.label}
            </Button>
            {/* Brand Filter nested under Tractor */}
            {category.value === 'tractor' && selectedCategory === 'tractor' && (
              <Box sx={{ ml: 3, mt: 1, mb: 1 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  Brand
                </Typography>
                <Stack direction="column" spacing={1}>
                  {tractorBrands.map((brand) => (
                    <Button
                      key={brand.key}
                      variant={selectedBrand === brand.value ? 'contained' : 'outlined'}
                      color={selectedBrand === brand.value ? undefined : '#296b2cff'}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontWeight: 600,
                        bgcolor: selectedBrand === brand.value ? '#388e3c' : undefined,
                        color: selectedBrand === brand.value ? '#fff' : undefined,
                        '&:hover': selectedBrand === brand.value ? { bgcolor: '#2e7031' } : {},
                      }}
                      onClick={() => {
                        setSelectedBrand(brand.value);
                        filterData(searchQuery, items, 'tractor', brand.value);
                      }}
                    >
                      {brand.label}
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
}

export default NewHome; 