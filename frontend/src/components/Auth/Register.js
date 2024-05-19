import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <label>
        <input type="checkbox" name="isSeller" checked={formData.isSeller} onChange={handleChange} /> Register as Seller
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
