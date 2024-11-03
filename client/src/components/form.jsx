import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    registerNumber: '',
    collegeName: '',
    collegeIDPhoto: null,
    email: '',
    mobileNumber: '',
    accommodationRequired: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, collegeIDPhoto: e.target.files[0] }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (formData.registerNumber.length !== 10 || !/^\d+$/.test(formData.registerNumber)) {
      formErrors.registerNumber = 'Registration number must be 10 digits.';
    }
    if (!formData.email.endsWith('@klu.ac.in')) {
      formErrors.email = 'Email must end with @klu.ac.in.';
    }
    if (formData.mobileNumber.length !== 10 || !/^\d+$/.test(formData.mobileNumber)) {
      formErrors.mobileNumber = 'Phone number must be 10 digits.';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await axios.post('https://pyros.onrender.com/api/users/register', data);
      alert('Registered successfully! Slot Code: ' + response.data.slotCode);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
        <div>
            <img src="https://lh3.googleusercontent.com/8fgqJ7SxE52lkKmN8YeNu2EOtR7Jid_uBpeZhvs75sO4vHjyGJnYYWKNxMawuJcK0WqPpPKhuuEddBXfDVbmeRk=w16383" alt="" className='icon' />
        </div>
    <form onSubmit={handleSubmit} className='formdiv'>
        <h2>Registration Form</h2>
      <input type="text" name="name" onChange={handleInputChange} placeholder="Name" required />
      
      <input
        type="text"
        name="registerNumber"
        onChange={handleInputChange}
        placeholder="  Register Number"
        required
      />
      {errors.registerNumber && <p style={{ color: 'yellow',fontWeight: 'bold' }}>{errors.registerNumber}</p>}

      <input
        type="text"
        name="collegeName"
        onChange={handleInputChange}
        placeholder="  College Name"
        required
      />
      <div className='filediv'>
        <h3>ID photo:</h3>
      <input type="file" name="collegeIDPhoto" className='cp' onChange={handleFileChange} required />
      </div>
      <input
        type="email"
        name="email"
        onChange={handleInputChange}
        placeholder="  KLU Email ID"
        required
      />
      {errors.email && <p style={{ color: 'yellow',fontWeight: 'bold' }}>{errors.email}</p>}

      <input
        type="text"
        name="mobileNumber"
        onChange={handleInputChange}
        placeholder="  Mobile Number"
        required
      />
      {errors.mobileNumber && <p style={{ color: 'yellow',fontWeight: 'bold' }}>{errors.mobileNumber}</p>}

      <label className='acc'>
        Accommodation Required:
        <input
          type="checkbox"
          name="accommodationRequired"
          onChange={() =>
            setFormData((prev) => ({
              ...prev,
              accommodationRequired: !prev.accommodationRequired,
            }))
          }
        />
      </label>
      <button type="submit">Register</button>
    </form>
    </div>
  );
}

export default RegisterForm;
