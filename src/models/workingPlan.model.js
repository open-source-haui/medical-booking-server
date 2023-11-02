const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { format } = require('date-fns');
const viLocale = require('date-fns/locale/vi');

const workingPlanSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    dayOfWeek: {
      type: String,
    },
  },
  { timestamps: true },
);

workingPlanSchema.pre('save', function (next) {
  const dayOfWeekInVietnamese = format(this.date, 'EEEE', { locale: viLocale });
  this.dayOfWeek = dayOfWeekInVietnamese;
  next();
});

workingPlanSchema.plugin(toJSON);
workingPlanSchema.plugin(paginate);

const WorkingPlan = mongoose.model('WorkingPlan', workingPlanSchema);

module.exports = WorkingPlan;
