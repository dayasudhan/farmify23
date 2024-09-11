import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Segment, Input, Form, Button, TextArea, Modal, Select ,Checkbox} from 'semantic-ui-react';
import { useAuth } from './../authContext';
const  SegmentExampleNestedSegments = () => {
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
    tyre_condition: '', // New field
    implement_or_trailer: '', // New field
    rto: '',
    no_of_owners:1,
    implements:'',
    hoursDriven:''
  });
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // Make a single axios call to fetch both states and districts
    axios
      .get('/states')
      .then((response) => {
        const { states, districts ,rto} = response.data;
        setStates(states); // Assuming the API response contains an array of state options
        setDistricts(districts);
        setRtos(rto);
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              
              const apiKey = '04a5800be4bb465bb63d271f5b3941e4';
              const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  if (data.results && data.results.length > 0) {
                    const districtInfo = data.results[0].components;
                    const address = data.results[0].formatted.replace("unnamed road,", "");
                    // console.log("districtInfo",districtInfo)
                    setFormData({
                      ...formData,
                      latitude,
                      longitude,
                      postcode:districtInfo.postcode,
                      state: districtInfo.state,
                      district: districtInfo.state_district.replace(' District', ''),
                      address: `${districtInfo.county}, ${address}`,
                      city:districtInfo['suburb']?districtInfo['suburb']:districtInfo['village']?districtInfo['village']:districtInfo['town'],
                    });
                  } else {
                    alert('District information not found.');
                  }
                })
                .catch((error) => {
                  console.error('Error fetching district information:', error);
                });
            },
            (error) => {
              console.error('Error getting location:', error.message);
              setFormData({ ...formData, state: response.data?.states[0] ,
                district: response.data?.districts[response.data?.states[0]][0]});
            }
          );
        } else {
          console.error('Geolocation is not available in this browser.');
          setFormData({ ...formData, state: response.data?.states[0] ,
            district: response.data?.districts[response.data?.states[0]][0]});
        }
      })
      .catch((error) => {
        console.error('Error fetching states and districts:', error);
      });
  }, []);
 
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

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e) => {

    //setFormData({ ...formData, loan_availability: loanAvailability,rc_present:rcPresent,
     // tailor_attached:trailorAttached ,insurance_status:insuranceStatus,fitnessCertificate:fitnessCertificate});

    console.log("handlesubmit",formData)
    e.preventDefault();
    if (isSubmitting) return; 
    let isFormValid = true;

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

    if (selectedFiles.length == 0) {
      alert('At least add One Image');
      isFormValid = false;
    }



    if (!isFormValid) {
      return; // Prevent form submission if there are errors
    }
    setIsSubmitting(true);
    const formDataFinal = new FormData();
    selectedFiles.forEach((file, i) => {
      formDataFinal.append('images', file);
    });
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        formDataFinal.append(key, value);
      }
    }
    try {
      await axios.post('/upload', formDataFinal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
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
            <h3>Item Details</h3>
          </Segment>
          <p />
          <Form ref={formRef} onSubmit={handleSubmit}>
            
             
              <Form.Field>
              <label>Item Type</label>
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
              <Input
                name="model"
                focus
                placeholder="Engine Model..."
                value={formData.model}
                onChange={handleInputChange}
              />
            </Form.Field>
            <p />
            <Form.Field>
              <Input
                name="item_year"
                focus
                placeholder="Engine Manufacture Year"
                value={formData.item_year}
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
                placeholder="Hpothetical Status"
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

            <Form.Field>
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
            </div>
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
