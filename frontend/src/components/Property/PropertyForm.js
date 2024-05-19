import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const PropertyForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearby: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/properties', formData);
      alert('Property posted successfully');
    } catch (error) {
      alert('Failed to post property');
    }
  };

  if (!user || !user.isSeller) {
    return <p>You need to be logged in as a seller to post properties.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Place" required />
      <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Area" required />
      <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" required />
      <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" required />
      <input type="text" name="nearby" value={formData.nearby} onChange={handleChange} placeholder="Nearby Amenities" required />
      <button type="submit">Post Property</button>
    </form>
  );
};

export default PropertyForm;
