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
  Autocomplete
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
  { key: 'ace', label: 'ACE', value: 'ace' }
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
    filteredResults = filteredResults.filter(item => item.model === '');
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
      item?.state?.toLowerCase() === state.label.toLowerCase()
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
                  textColor="white"
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
                          //filterData(searchQuery, items);
                          filterData(searchQuery, items, selectedCategory, brand.value);
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
                        {/* {brandImages[brand.value] && (
                          <img src={brandImages[brand.value]} alt={brand.label} style={{ height: 28, marginRight: 8, borderRadius: 4, background: '#fff' }} />
                        )} */}
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
          <Grid container spacing={2} alignItems="stretch">
            {filteredData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', height: '100%' }}>
                <Card
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #eee',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    bgcolor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
                  }}
                >
                  <Box position="relative">
                    <CardMedia
                      component="img"
                      image={item.image_urls?.[0] || '/placeholder-tractor.jpg'}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
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
                        variant="outlined"
                        color="success"
                        size="small"
                        fullWidth
                        sx={{ borderRadius: 2, fontWeight: 600, minWidth: 0, px: 0.5 }}
                        onClick={e => {
                          e.stopPropagation();
                          router.push(`/buyer/product/item?id=${item.id}#contact`);
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