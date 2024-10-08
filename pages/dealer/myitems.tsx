import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table,Button,Input,Segment ,Header,Dropdown,Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';
import Header2 from '../common/header';
import Footer from '../common/footer';
import { useRouter } from 'next/router';
import Link from 'next/link';
function CustomerListComponent() {
  const [data, setData] = useState([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [searchKey, setSearchKey] = useState('name');
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedItemId, setSelectedItemId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("data",data.length)
    if(data.length == 0)
    {
    axios.get('/dealer/items')
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
  });

  const handleRowClick = (index) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleSearchChange = (event) => {
     const { value } = event.target;
     setSearchQuery(value);
    console.log("value",value,data,searchKey)

    const filteredResults = data.filter((item) =>{
      if( searchKey == 'name')
      {
        return item[searchKey]?.toLowerCase().includes(value.toLowerCase());
      }
      else if(searchKey == 'itemId')
      {
        return item['id'].toString()?.includes(value.toLowerCase())
      }
      else
      {
        return item[searchKey]?.toLowerCase().includes(value.toLowerCase())
      }
  });

      setFilteredData(filteredResults);
  };
  const handleDropdownChange = (event, data) => {
    // 'data.value' contains the selected value
    console.log('handleDropdownChange:Selected Value:', data.value);
    setSearchKey(data.value)

  };
  const markSoldItem = (id) => {
    setModalOpen(true);
    setSelectedItemId(id);
  } 
  const handleModalConfirm = () => {
    console.log('markSoldItem:', selectedItemId);
    const url  = '/dealer/markitemsold/' + selectedItemId;
    console.log("url",url)
    axios
    .patch(url)
    .then((response) => {
      console.log('Data saved successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
   

  };
  const handleModalCancel = () => {
    // Close the modal if the user cancels the action
    setModalOpen(false);
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
    <Modal open={modalOpen} onClose={handleModalCancel}>
          <Modal.Header>Confirm Action</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to mark this item as sold?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={handleModalCancel}>
              No
            </Button>
            <Button positive onClick={handleModalConfirm}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
  </Segment>
 

    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={2}>Image</Table.HeaderCell>
          <Table.HeaderCell width={2}>ItemId</Table.HeaderCell>
          <Table.HeaderCell width={3}>Item Name</Table.HeaderCell>
          <Table.HeaderCell width={5}>Name</Table.HeaderCell>
          <Table.HeaderCell width={4}>Phone</Table.HeaderCell>
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
          <img src={item.image_urls[0]} alt="Thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell>{item.phone}</Table.Cell>
           
            {/* <Table.Cell>
              <Button primary onClick={() => handleDetailButtonClick(item._id)}>Aggrement</Button>
            </Table.Cell> */}
          </Table.Row>
          {expandedRowIndex === index && (
              <Table.Row>
                <Table.Cell colSpan="4"> {/* colSpan should match the number of columns in your table */}
                  {/* Add your additional content here */}
                  <p><b>ID</b>: &nbsp;  &nbsp;  &nbsp;{ item.id}</p>
                  <p><b>name</b>: {item.name}</p>
                  <p><b>phone</b>: {item.phone}</p>
                  <p><b>address</b>: {item.address}</p>
                  <p><b>district</b>: {item.district}</p>
                  {/* <p><b>state</b>: {item.state}</p> */}
                  <p><b>createdAt</b>: {item.createdAt}</p>
                  <div>
                  <Link href={`/buyer/product/item?id=${item.id}`}>
                  <Button primary >
                   Open Detail
                  </Button>
                  </Link>
                  <Button primary onClick={()=> markSoldItem(item.id)}>
                   Mark Sold
                  </Button>
                </div>
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