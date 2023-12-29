const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const healthFormSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    department: {
      type: String,
      required: true,
    },
    numberOrder: {
      type: Number,
      required: true,
    },
    numberConfirm: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    dateOrder: {
      type: Date,
      default: Date.now(),
    },
    deniedReason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

healthFormSchema.plugin(toJSON);
healthFormSchema.plugin(paginate);

const HealthForm = mongoose.model('HealthForm', healthFormSchema);

module.exports = HealthForm;
