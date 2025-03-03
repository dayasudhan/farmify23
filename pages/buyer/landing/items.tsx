import React, { useState, useEffect } from 'react';
import Item from './item';
import { Grid, Segment, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useAuth } from './../../authContext';
import { useRouter } from 'next/router';
import Header from '../../common/header';
import Footer from '../../common/footer';
import 'semantic-ui-css/semantic.css';
const baseURL = '/items';
import ReactGA from "react-ga4";


const Items = () => {
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { location } = useAuth();
  const router = useRouter();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setItems(response.data);
      setFilteredData(response.data);
      
      // Check if there's a search query in the URL
      const query = router.query.q || '';
      if (query) {
        setSearchQuery(query);
        filterData(query, response.data);
      }
    });

      ReactGA.send({ hitType: "pageview", page: window.location.pathname ,title: "Landing Page"});

  }, [router.query.q]);

  const filterData = (query, items) => {
    const filteredResults = items.filter((item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase()) ||
      item?.description?.toLowerCase().includes(query.toLowerCase()) ||
      item?.address?.toLowerCase().includes(query.toLowerCase()) ||
      item?.city?.toLowerCase().includes(query.toLowerCase())||
      item?.district?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    ReactGA.event({
      category: "Items",
      action: "Search",
      label: "Search Box", // optional
      //value: value, // optional, must be a number
      nonInteraction: false, // optional, true/false
      transport: "xhr", // optional, beacon/xhr/image
    });
    // Update the URL with the search query
    router.push({
      pathname: '/buyer/landing/items',
      query: { q: value },
    });

    filterData(value, items);
  };

  return (
    <Segment>
     <Header />
      <Segment>
        <Input
          icon="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Segment>
      <Grid stackable columns={3}>
        <Grid.Row>
          {filteredData?.map((element, index) => (
            <Grid.Column key={index}>
              <Item data={element} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Footer /> 
    </Segment>
  );
};

export default Items;
