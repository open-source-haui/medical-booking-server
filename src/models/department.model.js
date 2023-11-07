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
      default:
        'https://res.cloudinary.com/dzlxu2dlv/image/upload/v1699383342/medical-booking/image/fbyu4yeghrmcggfof8gl.jpg',
    },
    leader: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Doctor',
    },
  },
  { timestamps: true },
);

departmentSchema.plugin(toJSON);
departmentSchema.plugin(paginate);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
