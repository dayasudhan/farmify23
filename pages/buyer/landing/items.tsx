import React, { useState, useEffect } from 'react';
import Item from './item';
import { Grid, Segment, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useAuth } from './../../authContext';
const baseURL = '/items';
const Items = () => {
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState(items);
  const [searchQuery, setSearchQuery] = useState('');
  const { location } = useAuth();
  useEffect(() => {
    console.log('reacteffect',location);
    axios.get(baseURL).then((response) => {
      setItems(response.data);
      setFilteredData(response.data);
      console.log('response', response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    console.log("value", value, items);

    // Filter the data based on the search query
    const filteredResults = items.filter((item) =>
      item?.name?.toLowerCase().includes(value.toLowerCase()) ||
      item?.description?.toLowerCase().includes(value.toLowerCase()) ||
      item?.address?.toLowerCase().includes(value.toLowerCase()) ||
      item?.city?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  return (
    <Segment>
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
    </Segment>
  );
};

export default Items;