const Property = require('../models/Property');
const User = require('../models/User');
const { sendEmail } = require('../utils/sendEmail');

const postProperty = async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearby } = req.body;
  try {
    const property = new Property({ place, area, bedrooms, bathrooms, nearby, owner: req.user.id });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'firstName lastName email phone');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'firstName lastName email phone');
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProperty = async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearby } = req.body;
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'User not authorized' });
    }
    property.place = place;
    property.area = area;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.nearby = nearby;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'User not authorized' });
    }
    await property.remove();
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likeProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    property.likes += 1;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const interestedInProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'email');
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    const user = await User.findById(req.user.id);
    const subject = 'Interest in your property';
    const message = `User ${user.firstName} ${user.lastName} is interested in your property. Contact them at ${user.email}`;
    await sendEmail(property.owner.email, subject, message);
    await sendEmail(user.email, subject, `You have shown interest in a property. Contact the owner at ${property.owner.email}`);
    res.json({ message: 'Interest shown and emails sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  likeProperty,
  interestedInProperty,
};
