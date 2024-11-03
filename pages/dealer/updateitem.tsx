import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Segment, Input, Form, Button, TextArea, Modal, Select ,Checkbox} from 'semantic-ui-react';
import { useAuth } from '../authContext';
import tractorsData from '../tractors.json'; // Import the JSON data
import { useRouter } from 'next/router';
const  SegmentExampleNestedSegments = () => {
  const [item, setItem] = useState(null);   // State to store item details
  const [loading, setLoading] = useState(true);   // State to manage loading state
  const [error, setError] = useState(null);   // State to manage errors
  const [showModal, setShowModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const formRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const { location } = useAuth();
  const [rtos, setRtos] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [geoResult,setGeoResult]=useState(null);
  const [selectedImplementType, setSelectedImplementType] = useState("ENGINE"); // Track selected implement type
  const [insuranceStatus, setInsuranceStatus] = useState(true);
  const [loanAvailability, setLoanAvailability] = useState(false);
  const [rcPresent, setRcPresent] = useState(true);
  const [fitnessCertificate, setFitnessCertificate] = useState(true);
  const [trailorAttached, setTrailorAttached] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(tractorsData.tractors[0].brand);
  const [selectedModel, setSelectedModel] = useState(tractorsData.tractors[0].models[0]);
  const router = useRouter();
  const { id } = router.query;
  const models = tractorsData.tractors.find(tractor => tractor.brand === selectedBrand)?.models || [];
  const implementTypes = ["ENGINE",
    "TRAILER",
    "CULTIVATOR",
    "ROTAVATOR",
    "PLOUGH",
    "HARROW",
    "SEEDER",
    "SPRAYER",
    "LEVELLER",
    "DIGGER",
    "FULL SET", 
    "OTHER"];
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    phone: '',
    address: '',
    email: '',
    landMark: '',
    city: '',
    item_name: '',
    item_year: '',
    item_price: '',
    item_place: '',
    description: '',
    district: '',
    state: '',
    latitude:0,
    longitude:0,
    postcode:'',
    implement_type: 'ENGINE', // Add this field for implement type
    brand:'',
    model: '', // Additional field
    insurance: '', // Additional field
    loan_availability: false, // Additional field
    tractor_make: '', // New field
    hypothetical_status: '', // New field
    loan_status: '', // New field
    insurance_status: true, // Boolean field
    rc_present: true, // Boolean field
    fitnessCertificate: true, // New field
    approximate_cost: '', // New field
    tailor_attached: false, // Boolean field
    tractor_condition: '', // New field
    battery_condition: '', // New field
    tyre_condition: 90, // New field
    implement_or_trailer: '', // New field
    rto: '',
    no_of_owners:1,
    implements:'',
    hoursDriven:''
  });
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
 const initFormData = (item)=>
 {
  console.log("item",item);
      setFormData({
         ...formData,
        id : item.id,
        item_year : item.makeYear,
        hoursDriven : item.hoursDriven,
        hypothetical_status : item.hypothecation_status,
        tyre_condition : item.tyre_condition,
        loan_availability : item.loan_availability,
        loan_status : item.loan_status,
        implements : item.implements,
        item_price : item.price,
        insurance_status :item.insurance_status,
        rc_present : item.rc_present,
        tailor_attached : item.tailor_attached,
        no_of_owners : item.no_of_owners,
        name : item.name,
        address : item.address,
        city : item.city,
        phone : item.phone,
        rto : item.rto,
        state : item.state,
        district : item.district,
        description : item.description,
    })
    setLoanAvailability(item.loan_availability)
    setRcPresent(item.rc_present );
    setFitnessCertificate(item.fitnessCertificate );
    setTrailorAttached(item.tailor_attached );
    setInsuranceStatus(item.insurance_status);
 }
    useEffect(() => {
      
      const url = '/items/' + id;
      console.log("useEffect called",id,url);
      if (id) {
        axios.get(url)
          .then((response) => {
            console.log("useeffect",response.data)
            setItem(response.data);   // Update item state with fetched data
            setLoading(false);   // Set loading to false once data is fetched
            initFormData(response.data);
            
          })
          .catch((error) => {
            console.log("catch error",error)
            setError("Failed to fetch item details.");   // Set error if request fails
            setLoading(false);
          });
    }
  }, []);

  // useEffect(() => {
  //   // Get the passed item data from route params
  //   const { item } = route.params;
  //   if (item) {
  //     initFormData(item);
  //   }
  // }, [route.params]);

  const handleInputChange = (event) => {
   
    const { name, value } = event.target;
    console.log("handleInputChange",name, value)
    setFormData({ ...formData, [name]: value });
    if (name === 'name') {
      setNameError('');
    }
    if (name === 'phone') {
      setPhoneError('');
    }
  };

  const handleStateChange = (_, data) => {
    setFormData({ ...formData, state: data.value, district: '' });
  };

  const handleBrandChange = (_, data) => {
     setSelectedBrand(data.value);
     setSelectedModel(''); // Reset the model when brand changes
    //setFormData({ ...formData, brand: data.value, model: '' });
  };
const handleModelChange = (_, data) => {
     setSelectedModel(data.value);
     //setFormData({ ...formData, model: data.value, });
  };

  const handleFCChange = (_, data) => {
    setFitnessCertificate(data.checked)
    setFormData({ ...formData, fitnessCertificate: data.checked});
  };
  const handleRCPresent = (_, data) => {
    setRcPresent(data.checked)
    setFormData({ ...formData, rc_present: data.checked});
  };
  const handleLoanAvailable = (_, data) => {
    setLoanAvailability(data.checked)
    setFormData({ ...formData, loan_availability: data.checked});
  };
  const handleTailorAttached = (_, data) => {
    console.log("handleTailorAttached",data)
    setTrailorAttached(data.checked)
    setFormData({ ...formData, tailor_attached: data.checked});
  };
  const handleInsuranceStatus = (_, data) => {
    setInsuranceStatus(data.checked)
    setFormData({ ...formData, insurance_status: data.checked});
  };

  const handleNoOfOwners = (_, data) => {
    setFormData({ ...formData, no_of_owners: data.value,});
  };

  const handleTyreCondition = (_, data) => {
    setFormData({ ...formData, tyre_condition: data.value,});
  };

  const handleImplementTypeChange = (_, data) => {
    setSelectedImplementType(data.value)
    setFormData({ ...formData, implement_type: data.value });
  };
  const handleRTOSChange = (_, data) => {
    setFormData({ ...formData, rto: data.value });
  };
  const handleDistrictChange = (_, data) => {
    setFormData({ ...formData, district: data.value });
  };

 
  const handleSubmit = async (e) => {

    
    console.log("handlesubmit",formData)
    e.preventDefault();
    if (isSubmitting) return; 
    let isFormValid = true;

    if(selectedImplementType != "OTHER")
    {
       const itemName = `${selectedImplementType.charAt(0).toUpperCase()}${selectedImplementType.slice(1).toLowerCase()}`;
       formData.item_name = itemName;
    }

    if(selectedBrand == ''){
      alert('item brand required');
      return;
     }
     if(selectedModel == ''){
      alert('item model required');
      return;
     }
     else {
      let brand = selectedBrand;
      let model = selectedModel;
      if(selectedModel == 'Other')
      {
        brand = ''
      }
      if(selectedBrand == 'Other')
      {
        model = ''
      }
      formData.model = brand + ' ' +model;
    }
    if (formData.item_name.trim() === '' && formData.model.trim()==='') {
      alert('Seller Item Name is required');
      isFormValid = false;
    }

    // if (formData.item_price.trim() === '') {
    //   alert('Seller Item Price/Rate is required');
    //   isFormValid = false;
    // }

    if (formData.name.trim() === '') {
      alert('Seller Name is required');
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
      alert('Seller Address is required');
      isFormValid = false;
    }
    if (formData.state.trim() === '') {
      alert('Seller state is required');
      isFormValid = false;
    }
    if (formData.district.trim() === '') {
      alert('Seller district is required');
      isFormValid = false;
    }
     if (!isFormValid) {
      return; // Prevent form submission if there are errors
    }
    setIsSubmitting(true);
    const formDataFinal = new FormData();
      formDataFinal.append("id","133");
      console.log("formDatafinal",formDataFinal,formData)
    try {
      await axios.post('/dealer/item', formData).then((response) => {
        setTimeout(() => {
          setResponseText(`Item Posted Successfully With Id : ${response?.data?.id}`);
          setShowModal(true);
        }, 1000);
      }).catch((error) => {
        console.error('error', error);
      });
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
    finally {
      setIsSubmitting(false); // Reset the submitting state after submission
    }
  };

  const closeModal = () => {
    setShowModal(false);
    //location.reload();
  };

  return (
    
    <Segment.Group>
      <Segment.Group horizontal>
        <Segment>
         
          <Segment textAlign="center">
            <h3>Update Item Details</h3>
          </Segment>
          <p />
          <Form ref={formRef} onSubmit={handleSubmit}>
            
             
              <Form.Field>
              <label>Item2 Type</label>
              <Select
                name="type"
                options={implementTypes.map((i) => ({ key: i, text: i, value: i }))}
                value={formData.implement_type || (implementTypes.length > 0 ? implementTypes[0] : '')}
                onChange={handleImplementTypeChange}
              />
            </Form.Field>
            {
            (selectedImplementType === 'ENGINE')? 
          (
          <>
              <Form.Field>
              <label>Brand</label>
              <Select
                name="brand"
                options={tractorsData.tractors.map((tractor, index) => ({ key: tractor, text: tractor.brand, value: tractor.brand }))}
                value={selectedBrand || (tractorsData.tractors.length > 0 ? tractorsData.tractors[0].brand : '')}
                onChange={handleBrandChange}
              />
            </Form.Field>
            {selectedBrand !== '' && (
            <Form.Field>
              <label>Model</label>
              <Select
                name="model"
                options={models.map((model, index) => ({ key:model , text: model, value: model }))}
                value={selectedModel || (models.length > 0 ? models[0] : '')}
                onChange={handleModelChange}
              />
            </Form.Field>
            )}  
            <p />
            <Form.Field>
              <Input
                name="item_year"
                focus
                placeholder="Engine Manufacture Year"
                value={item?.makeYear || formData.item_year}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="hoursDriven"
                focus
                placeholder="Hours Driven"
                value={formData.hoursDriven}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="hypothetical_status"
                focus
                placeholder="Hypothetical Status"
                value={formData.hypothetical_status}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="loan_status"
                focus
                placeholder="Loan Status"
                value={formData.loan_status}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="implements"
                focus
                placeholder="Other Implements if any"
                value={formData.implements}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="item_price"
                focus
                placeholder="Engine Rate/Price..."
                value={formData.item_price}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
    
              <TextArea
                name="description"
                rows={2}
                placeholder="Description..."
                value={formData.description}
                defaultValue={formData.description}
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
             <Checkbox
              name="Loan"
                checked={loanAvailability}
                label={"Loan Availability"}
                value={formData.loan_availability ? 'true' : 'false'}
                onChange={                 
                    handleLoanAvailable
                }
              />
            </Form.Field>
            <Form.Field>
             <Checkbox
              name="insuranceStatus"
                checked={insuranceStatus}
                label={"Insurance Status"}
                value={formData.insurance_status ? 'true' : 'false'}
                onChange={                  
                    handleInsuranceStatus
                }
              />
            </Form.Field>
            <Form.Field>
             <Checkbox
              name="rc"
                checked={rcPresent}
                label={"RC Status"}
                value={formData.rc_present ? 'true' : 'false'}
                onChange={handleRCPresent         
                }
              />
            </Form.Field>
            <Form.Field>
             <Checkbox
              name="fc"
                checked={fitnessCertificate}
                label={"FC"}
                value={formData.fitnessCertificate ? 'true' : 'false'}
                onChange={handleFCChange}
              />
            </Form.Field>
            <Form.Field>
             <Checkbox
              name="tailorAttached"
                checked={trailorAttached}
                label={"Tailor Attached"}
                value={formData.tailor_attached ? 'true' : 'false'}
                onChange={ handleTailorAttached}
              />
            </Form.Field>
             <Form.Field>
              <label>Tyre Condition</label>
              <Select
                name="tyre"
                options={Array.from({ length: 10 }, (_, i) => 100 - i * 10).map((i) => ({ key: i, text: i, value: i }))}
                value={formData.tyre_condition }
                onChange={handleTyreCondition}
              />
            </Form.Field>
            <Form.Field>
              <label>Number of previous owners</label>
              <Select
                name="type"
                options={Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({ key: i, text: i, value: i }))}
                value={formData.no_of_owners }
                onChange={handleNoOfOwners}
              />
            </Form.Field>
            </>
            ):(
              <>
              <Form.Field>
                <Input
                  name="item_name"
                  focus
                  placeholder="Item Name..."
                  value={formData.item_name}
                  onChange={handleInputChange}
                />
              </Form.Field>
              <p />
              <Form.Field>
                <Input
                  name="item_year"
                  focus
                  placeholder="Item Manufacture Year"
                  value={formData.item_year}
                  onChange={handleInputChange}
                />
              </Form.Field>
              <p />
              <Form.Field>
                <Input
                  name="item_price"
                  focus
                  placeholder="Item Rate/Price..."
                  value={formData.item_price}
                  onChange={handleInputChange}
                />
              </Form.Field>
              <p />
              <Form.Field>
      
                <TextArea
                  name="description"
                  rows={2}
                  placeholder="Description..."
                  value={formData.description}
                  defaultValue={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Field>
              </>
            )}
            <Form.Field>
              <label>Seller Details</label>
              <Input
                name="name"
                focus
                placeholder="Name..."
                value={formData.name}
                defaultValue={formData.name}
                onChange={handleInputChange}
              />
              {nameError && <div className="error">{nameError}</div>}
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="phone"
                focus
                placeholder="Phone Number"
                value={formData.phone}
                defaultValue={formData.phone}
                onChange={handleInputChange}
              />
               
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="city"
                focus
                placeholder="Village/City..."
                value={formData.city}
                defaultValue={formData.city}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="address"
                focus
                placeholder="Address..."
                value={formData.address}
                defaultValue={formData.address}
                onChange={handleInputChange}
              />
            </Form.Field>

            {/* <Form.Field>
              <label>State</label>
              <Select
                name="state"
                options={states.map((state) => ({ key: state, text: state, value: state }))}
                value={formData.state || (states.length > 0 ? states[0] : '')}
                onChange={handleStateChange}
              />
            </Form.Field>
            <Form.Field>
              <label>District</label>
              <Select
                name="district"
                options={formData.state ? districts[formData.state].map((district) => ({ key: district, text: district, value: district })) : []}
                value={formData.district || (formData.state && districts[formData.state].length > 0 ? districts[formData.state][0] : '')}
                onChange={handleDistrictChange}
              />
            </Form.Field> 
            <Form.Field>
              <label>RTO</label>
              <Select
                name="RTOS"
                options={formData.state ? rtos[formData.state].map((rto) => ({ key: rto, text: rto, value: rto })) : []}
                value={formData.rto || (formData.state && rtos[formData.state].length > 0 ? rtos[formData.state][0] : '')}
                onChange={handleRTOSChange}
              />
            </Form.Field>
            <div>
              <label htmlFor="images">Image:</label>
              <input
                type="file"
                id="images"
                accept="images/*"
                multiple
                onChange={handleImageChange}
              />
            </div>*/}
            <div style={{ display: 'flex' }}>
              <Button primary style={{ marginLeft: 'auto' }} disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
          <Modal open={showModal} onClose={closeModal}>
            <Modal.Header>Response</Modal.Header>
            <Modal.Content>
              <p>{responseText}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={closeModal}>Close</Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </Segment.Group>
    </Segment.Group>
  );
};

export default SegmentExampleNestedSegments;
