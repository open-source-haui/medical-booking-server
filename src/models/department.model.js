const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const departmentSchema = mongoose.Schema(
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
      default: 'https://th.bing.com/th/id/OIP.o60vefi2fWgYc_2YA-PYOAHaHa?pid=ImgDet&w=550&h=550&rs=1',
    },
    leader: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Doctor',
      required: true,
    },
  },
  { timestamps: true },
);

departmentSchema.plugin(toJSON);
departmentSchema.plugin(paginate);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
