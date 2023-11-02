const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const healthFormSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    workingTime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkingTime',
      required: true,
    },
    numberOrder: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancel'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

healthFormSchema.plugin(toJSON);
healthFormSchema.plugin(paginate);

const HealthForm = mongoose.model('HealthForm', healthFormSchema);

module.exports = HealthForm;
