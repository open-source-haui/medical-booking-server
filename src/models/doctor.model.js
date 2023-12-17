const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dzlxu2dlv/image/upload/v1699383442/medical-booking/image/gxc7kzckxzpzkkoctxr7.jpg',
    },
    degree: {
      type: String,
      trim: true,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      require: true,
    },
  },
  { timestamps: true },
);

doctorSchema.plugin(toJSON);
doctorSchema.plugin(paginate);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
