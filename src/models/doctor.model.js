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
      default: 'https://th.bing.com/th/id/OIP.gdlq9bpE2CfeazgjCxwvMgAAAA?pid=ImgDet&rs=1',
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
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        default: [],
      },
    ],
  },
  { timestamps: true },
);

doctorSchema.plugin(toJSON);
doctorSchema.plugin(paginate);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
