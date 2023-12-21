const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');

const healthFormSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Địa chỉ email không hợp lệ');
        }
      },
    },
    fullName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: ['Nam', 'Nữ', 'Khác'],
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    cmndNumber: {
      type: String,
      trim: true,
    },
    codeInsurance: {
      type: String,
      trim: true,
    },
    cmndImg: {
      type: String,
      trim: true,
    },
    insuranceImg: {
      type: String,
      trim: true,
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
    reason: {
      type: String,
      default: '',
    },
    note: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

healthFormSchema.plugin(toJSON);
healthFormSchema.plugin(paginate);

const HealthForm = mongoose.model('HealthForm', healthFormSchema);

module.exports = HealthForm;
