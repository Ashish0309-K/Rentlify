import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const PropertyList = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('/api/properties');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.put(`/api/properties/${id}/like`);
      setProperties(properties.map(p => p._id === id ? { ...p, likes: p.likes + 1 } : p));
    } catch (error) {
      alert('Failed to like property');
    }
  };

  const handleInterest = async (id) => {
    try {
      await axios.post(`/api/properties/${id}/interested`);
      alert('Interest shown and email sent to owner');
    } catch (error) {
      alert('Failed to show interest');
    }
  };

  return (
    <div>
      {properties.map(property => (
        <div key={property._id}>
          <h3>{property.place}</h3>
          <p>{property.area} sq ft</p>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.bathrooms} bathrooms</p>
          <p>Nearby: {property.nearby}</p>
          <p>Likes: {property.likes}</p>
          <button onClick={() => handleLike(property._id)}>Like</button>
          {user && <button onClick={() => handleInterest(property._id)}>I'm Interested</button>}
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
