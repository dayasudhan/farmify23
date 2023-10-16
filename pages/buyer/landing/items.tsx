import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import Item from './item';
import { Grid, Segment,Input,Header,Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const baseURL = '/items';
const Items = () => {
  const [items, setItems] = React.useState([
  ]);
  const [filteredData, setFilteredData] = useState(items);
  const [searchQuery, setSearchQuery] = useState('');
  React.useEffect(() => {
    console.log('reacteffect');

    axios.get(baseURL).then((response) => {
      setItems(response.data);
      setFilteredData(response.data)
      console.log('response', response.data);
    });
  }, []);
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
   console.log("value",value,items)

   //Filter the data based on the search query
   const filteredResults = items.filter((item) =>
     {
      return (item?.['name']?.toLowerCase().includes(value.toLowerCase()) ||
       item?.['description']?.toLowerCase().includes(value.toLowerCase())||  
       item?.['address1']?.toLowerCase().includes(value.toLowerCase())|| 
       item?.['city']?.toLowerCase().includes(value.toLowerCase()))
    }
   );

     setFilteredData(filteredResults);
 };
  return (
    <Segment>
     <Segment heading>
    
   
    {/* <Dropdown 
    placeholder='Search Key' 
    search 
    selection 
    // defaultValue={searchKey}
    // options={searchOptions} 
    // onChange={handleDropdownChange} 
     /> */}
    <Input
     icon="search"
     placeholder="Search..."
     value={searchQuery}
     onChange={handleSearchChange}
   />
    {/* <Header as='h2' floated='right'>
   Customer Table
 </Header> */}
</Segment>
      <Grid Doubling container columns={3}>
        <Grid.Row columns={4}>
          {filteredData?.map((element) => (
            <Grid.Column>
              <Item data={element} />
            </Grid.Column>
          ))}
          {/* {menu?.map((element) => (
            <Grid.Column>
              <Item data={element} />
            </Grid.Column>
          ))}
          {menu?.map((element) => (
            <Grid.Column>
              <Item data={element} />
            </Grid.Column>
          ))} */}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Items;
