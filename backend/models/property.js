const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  place: { type: String, required: true },
  area: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  nearby: { type: String, required: true },
  likes: { type: Number, default: 0 },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
