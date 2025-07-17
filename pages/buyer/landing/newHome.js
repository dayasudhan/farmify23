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
  Badge,
  Paper,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import TractorIcon from '@mui/icons-material/Agriculture';
import axios from 'axios';
import { useAuth } from '../../authContext';
import { useRouter } from 'next/router';
import HeaderComponent from '../../common/header';
import Footer from '../../common/footer';
import ReactGA from "react-ga4";
import Autocomplete from '@mui/material/Autocomplete';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const baseURL = '/items';

const categories = [
  { key: 'all', label: 'All Items', value: 'all', icon: <FilterAltIcon /> },
  { key: 'tractor', label: 'Tractor', value: 'tractor', icon: <TractorIcon /> },
  { key: 'cultivator', label: 'Cultivator', value: 'cultivator' },
  { key: 'rotavator', label: 'Rotavator', value: 'rotavator' },
  { key: 'plough', label: 'Plough', value: 'plough' },
  { key: 'harrow', label: 'Harrow', value: 'harrow' },
  { key: 'seeder', label: 'Seeder', value: 'seeder' },
  { key: 'sprayer', label: 'Sprayer', value: 'sprayer' },
  { key: 'other', label: 'Other', value: 'other' }
];

const tractorBrands = [
  { key: 'all', label: 'All Brands', value: 'all' },
  { key: 'mahindra', label: 'Mahindra', value: '' },
  { key: 'john-deere', label: 'John Deere', value: 'john deere' },
  { key: 'swaraj', label: 'Swaraj', value: 'swaraj' },
  { key: 'new-holland', label: 'New Holland', value: 'new-holland' },
  { key: 'massey-ferguson', label: 'Massey Ferguson', value: 'massey-ferguson' },
  { key: 'kubota', label: 'Kubota', value: 'kubota' },
  { key: 'force', label: 'Force', value: 'force' },
  { key: 'sonalika', label: 'Sonalika', value: 'sonalika' }
];

// Placeholder brand images (replace with your own assets)
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

// Add state/district data (for demo, you can replace with your own data)
const states = [
  { label: 'Karnataka', districts: ['Bagalkot', 'Bangalore', 'Davanagere'] },
  { label: 'Maharashtra', districts: ['Pune', 'Nashik', 'Nagpur'] },
  { label: 'Punjab', districts: ['Ludhiana', 'Amritsar', 'Patiala'] },
];

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
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setItems(response.data);
      setFilteredData(response.data);
      const query = router.query.q || '';
      if (query) {
        setSearchQuery(query);
        filterData(query, response.data);
      }
    });
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "New Home Page" });
  }, [router.query.q]);

  const filterData = (query, items) => {
    console.log("filterData",query);
    let filteredResults = items.filter((item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase()) ||
      item?.description?.toLowerCase().includes(query.toLowerCase()) ||
      item?.address?.toLowerCase().includes(query.toLowerCase()) ||
      item?.city?.toLowerCase().includes(query.toLowerCase()) ||
      item?.district?.toLowerCase().includes(query.toLowerCase())
    );
    if (selectedCategory !== 'all') {
      filteredResults = filteredResults.filter(item =>
        item?.type?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (selectedCategory === 'tractor' && selectedBrand !== 'all') {
      filteredResults = filteredResults.filter(item =>
        item?.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }
    if (selectedState) {
      filteredResults = filteredResults.filter(item =>
        item?.state?.toLowerCase() === selectedState.label.toLowerCase()
      );
    }
    if (selectedDistrict) {
      filteredResults = filteredResults.filter(item =>
        item?.district?.toLowerCase() === selectedDistrict.toLowerCase()
      );
    }
    if (isNearby && location) {
      // Simple nearby filter: within 100km (replace with your own logic)
      filteredResults = filteredResults.filter(item => {
        if (!item.latitude || !item.longitude) return false;
        const toRad = (v) => (v * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(item.latitude - location.latitude);
        const dLon = toRad(item.longitude - location.longitude);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(location.latitude)) *
            Math.cos(toRad(item.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d < 100; // within 100km
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
    setSelectedCategory(categories[newValue].value);
    setSelectedBrand('all');
    filterData(searchQuery, items);
  };

  const handleBrandChange = (event, newValue) => {
   console.log("handleBrandChange",tractorBrands[newValue].value);
    setSelectedBrand(tractorBrands[newValue].value);
    filterData(tractorBrands[newValue].value, items);
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

  const formatPrice = (price) => {
    if (!price) return 'Price on enquiry';
    return `₹${price.toLocaleString()}`;
  };

  const getLocationText = (item) => {
    const parts = [];
    if (item?.district) parts.push(item.district);
    if (item?.city) parts.push(item.city);
    if (item?.state) parts.push(item.state);
    return parts.join(', ') || 'Location not specified';
  };

  const handleStateChange = (event, value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
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

  return (
    <Box minHeight="100vh" bgcolor="#f8f9fa">
      <HeaderComponent />
      {/* Hero Section with Search */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #398378 0%, #764ba2 100%)',
          m: 0,
          py: 6,
          borderRadius: 0,
        }}
      >
        <Container>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} textAlign="center">
              {/* <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                <TractorIcon sx={{ fontSize: 48, verticalAlign: 'middle', mr: 1 }} />
                Tractree
              </Typography> */}
              <Typography
                variant="subtitle1"
                sx={{ color: 'white', mb: 4 }}
              >
                Find the perfect tractor and implements for your farm
              </Typography>
              <Box maxWidth={600} mx="auto">
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
                    sx: {
                      borderRadius: '50px',
                      backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Filter Section */}
      <Paper elevation={0} sx={{ m: 0, py: 2, bgcolor: 'white' }}>
        <Container>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FilterAltIcon color="primary" />
                <Typography variant="h6" fontWeight={500}>
                  Filter by Category
                </Typography>
                <Tabs
                  value={categories.findIndex(c => c.value === selectedCategory)}
                  onChange={handleCategoryChange}
                  textColor="primary"
                  indicatorColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ ml: 2 }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category.key}
                      label={category.label}
                      icon={category.icon}
                      iconPosition="start"
                      sx={{
                        borderRadius: '20px',
                        mx: 0.5,
                        bgcolor: selectedCategory === category.value ? '#398378' : '#f8f9fa',
                        color: selectedCategory === category.value ? 'white' : '#333',
                        fontWeight: selectedCategory === category.value ? 700 : 400,
                        minHeight: 40,
                      }}
                    />
                  ))}
                </Tabs>
              </Stack>
              {/* Brand Filter for Tractors */}
              {selectedCategory === 'tractor' && (
                <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                  <LocalOfferIcon color="secondary" />
                  <Typography variant="subtitle1" fontWeight={500}>
                    Filter by Brand
                  </Typography>
                  <Box sx={{ display: 'flex', overflowX: 'auto', ml: 2 }}>
                    {tractorBrands.map((brand) => (
                      <Box
                        key={brand.key}
                        onClick={() => {
                          setSelectedBrand(brand.value);
                          filterData(searchQuery, items);
                        }}
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 2,
                          bgcolor: selectedBrand === brand.value ? '#398378' : '#eafbe7',
                          boxShadow: selectedBrand === brand.value ? 4 : 1,
                          mx: 1,
                          px: 2,
                          py: 1,
                          display: 'flex',
                          alignItems: 'center',
                          border: selectedBrand === brand.value ? '2px solid #398378' : '1px solid #b2dfdb',
                          transition: 'all 0.2s',
                        }}
                      >
                        {brandImages[brand.value] && (
                          <img src={brandImages[brand.value]} alt={brand.label} style={{ height: 28, marginRight: 8, borderRadius: 4, background: '#fff' }} />
                        )}
                        <Typography color={selectedBrand === brand.value ? 'white' : '#398378'} fontWeight={600} fontSize={15}>
                          {brand.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} md={4} textAlign={{ xs: 'left', md: 'right' }}>
              <Chip
                label={`${filteredData.length} items found`}
                color="primary"
                sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      {/* Search by State, District, and Nearby */}
      <Box maxWidth={900} mx="auto" mt={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={states}
              getOptionLabel={option => option.label}
              value={selectedState}
              onChange={handleStateChange}
              renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={selectedState ? selectedState.districts : []}
              getOptionLabel={option => option}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              renderInput={(params) => <TextField {...params} label="District" variant="outlined" />}
              disabled={!selectedState}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant={isNearby ? 'contained' : 'outlined'}
              color="success"
              startIcon={<MyLocationIcon />}
              onClick={handleNearby}
              sx={{ borderRadius: 8, width: '100%' }}
            >
              Near Me
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Items Grid */}
      <Container sx={{ py: 4 }}>
        {filteredData.length === 0 ? (
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
          <Grid container spacing={3}>
            {filteredData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => router.push(`/buyer/product/item?id=${item.id}`)}
                >
                  <Box position="relative">
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image_urls?.[0] || '/placeholder-tractor.jpg'}
                      alt={item.name}
                      sx={{
                        objectFit: 'cover',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    />
                    <Chip
                      label={item.type || 'Equipment'}
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    />
                    {item.price && (
                      <Chip
                        label={formatPrice(item.price)}
                        color="success"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          borderRadius: 2,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {item.type === 'ENGINE' && item.model ? item.model : item.name}
                      {item.makeYear && ` (${item.makeYear})`}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <PlaceIcon color="primary" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {getLocationText(item)}
                      </Typography>
                    </Stack>
                    {item.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<EmailIcon />}
                      sx={{ borderRadius: 2, mt: 1 }}
                      onClick={e => {
                        e.stopPropagation();
                        handleEnquiryClick(item.id);
                      }}
                    >
                      More Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
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
      <Footer />
    </Box>
  );
};

export default NewHome; 