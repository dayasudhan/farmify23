import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table,Button,Input,Segment ,Header,Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';
import Header2 from '../common/header';
import Footer from '../common/footer';
import { useRouter } from 'next/router';
import ReactGA from "react-ga4";
ReactGA.initialize("G-E36KXVXBE5");
function CustomerListComponent() {
  const [data, setData] = useState([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [searchKey, setSearchKey] = useState('name');
  const router = useRouter();

  useEffect(() => {
    console.log("data",data.length)
    if(data.length == 0)
    {
    axios.get('/dealer/enquiries')
      .then(response => {
        console.log("response",response)
        if(response.status != 403)
        {
          setData(response.data);
          setFilteredData(response.data);
        }
        else
        {
          setData(null);
          setFilteredData(null);
        }
          console.log(response);
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
        router.push('/');
      });
    }
    ReactGA.send({ hitType: "pageview", page: window.location.pathname ,title: "Enquiry Page"});
  });

  const handleRowClick = (index) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleSearchChange = (event) => {
     const { value } = event.target;
     setSearchQuery(value);
    console.log("value",value,data)

    const filteredResults = data.filter((item) =>{
      if( searchKey == 'name')
      {
        item?.['item'][searchKey]?.toLowerCase().includes(value.toLowerCase())
      }
      else if(searchKey == 'itemId')
      {
        item?.['item']['id']?.includes(value.toLowerCase())
      }
      else
      {
        item?.[searchKey]?.toLowerCase().includes(value.toLowerCase())
      }
  });

      setFilteredData(filteredResults);
  };
  const handleDropdownChange = (event, data) => {
    // 'data.value' contains the selected value
    console.log('handleDropdownChange:Selected Value:', data.value);
    setSearchKey(data.value)

  };
  const searchOptions = [
    { key: 1, text: 'Item Name', value: 'name' },
    { key: 3, text: 'ItemId', value: 'itemId' },
    { key: 4, text: 'City', value: 'city' },
    { key: 5, text: 'Phone', value: 'phone' },
  ]
  
  return (
    <div>
          <Segment>
    <Header2 />
      <Segment heading>   
       <Dropdown 
       placeholder='Search Key' 
       search 
       selection 
       defaultValue={searchKey}
       options={searchOptions} 
       onChange={handleDropdownChange}
       />
       <Input
        icon="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
       <Header as='h2' floated='right'>
      Enquiry Table
    </Header>
  </Segment>
 

    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={2}>Image</Table.HeaderCell>
          <Table.HeaderCell width={2}>Enquiry ID</Table.HeaderCell>
          <Table.HeaderCell width={3}>Party Name</Table.HeaderCell>
          <Table.HeaderCell width={4}>Phone</Table.HeaderCell>
          <Table.HeaderCell width={5}>Address</Table.HeaderCell>
          <Table.HeaderCell width={5}>Date</Table.HeaderCell>
          <Table.HeaderCell width={1}></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredData && filteredData.map((item, index) => (
          <React.Fragment key={item.id}>
          <Table.Row  onClick={() => handleRowClick(index)}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
          {/* Add the thumbnail image here */}
          <img src={item.item.image_urls[0]} alt="Thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.phone}</Table.Cell>
            <Table.Cell>{item.address}</Table.Cell>
            <Table.Cell>{new Date(item?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</Table.Cell>

            {/* <Table.Cell>
              <Button primary onClick={() => handleDetailButtonClick(item._id)}>Aggrement</Button>
            </Table.Cell> */}
          </Table.Row>
          {expandedRowIndex === index && (
              <Table.Row>
                <Table.Cell colSpan="7"> {/* colSpan should match the number of columns in your table */}
                  {/* Add your additional content here */}
                  <p><b>Item ID</b>: &nbsp;  &nbsp;  &nbsp;{ item.item.id}</p>
                  <p><b>Seller name</b>: {item.item.seller_name}</p>
                  <p><b>phone</b>: {item.item.phone}</p>
                  <p><b>address</b>: {item.item.address}</p>
                  <p><b>district</b>: {item.item.district}</p>
                  <p><b>createdAt</b>: {new Date(item?.item?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</p>
                  <p><b>Rate</b>: {item.item.price}</p>
                  <p><b>Make Year</b>: {item.item.makeYear}</p>
                  <p><b>model</b>: {item.item.model}</p>
                  <p><b>Insurance Status</b>: {item.item.insurance_status}</p>
                  <p><b>RC</b>: {item.item.rc_present}</p>
                  <p><b>FC</b>: {item.item.fitnessCertificate}</p>
                  <p><b>RTO</b>: {item.item.rto}</p>
                  <p><b>Loan Availability</b>: {item.item.loan_availability}</p>
                  <p><b>Owners</b>: {item.item.no_of_owners}</p>
                  <p><b>More Details</b>: {item.item.description}</p>

                </Table.Cell>
              </Table.Row>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
    {/* <Footer /> */}
  </Segment>
  </div>
  );
}

export default CustomerListComponent;