import React, { useState } from 'react';
import axios from 'axios';

function CreateDealer() {
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        password: '',
        address: '',
        district: '',
        state: '',
        city: '',
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/dealer', formData);

            if (response.status === 200) {
                alert('Dealer created successfully!');
                setFormData({
                    username: '',
                    phone: '',
                    password: '',
                    address: '',
                    district: '',
                    state: '',
                    city: '',
                    name: ''
                });
            } else {
                alert('Failed to create dealer');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the dealer.');
        }
    };

    // Inline styles for the form
    const styles = {
        formContainer: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
        formTitle: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#333',
        },
        formGroup: {
            marginBottom: '15px',
        },
        formLabel: {
            display: 'block',
            fontSize: '16px',
            marginBottom: '5px',
            color: '#333',
        },
        formControl: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
        submitButton: {
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        submitButtonHover: {
            backgroundColor: '#218838',
        },
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Create a Dealer</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>District:</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Dealer Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.formControl}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
                >
                    Create Dealer
                </button>
            </form>
        </div>
    );
}

export default CreateDealer;
