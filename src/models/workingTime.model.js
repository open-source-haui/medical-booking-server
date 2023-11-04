const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const workingTimeSchema = mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    maxSlots: {
      type: Number,
      default: 5,
    },
    registeredQuantity: {
      type: Number,
      default: 0,
    },
    workingPlan: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'WorkingPlan',
      required: true,
    },
  },
  { timestamps: true },
);

workingTimeSchema.plugin(toJSON);
workingTimeSchema.plugin(paginate);

const WorkingTime = mongoose.model('WorkingTime', workingTimeSchema);

module.exports = WorkingTime;
