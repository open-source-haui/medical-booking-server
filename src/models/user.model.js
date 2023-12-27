const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Địa chỉ email không hợp lệ');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('Mật khẩu phải chứa ít nhất 8 ký tự');
        }
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Mật khẩu phải chứa ít nhất một chữ cái và một số');
        }
      },
      private: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dzlxu2dlv/image/upload/v1699383593/medical-booking/image/sp1cmswjqpwuszoo3bzw.jpg',
    },
    gender: {
      type: String,
      trim: true,
      enum: ['Nam', 'Nữ', 'Khác'],
      default: 'Khác',
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
    },
    job: {
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
    nation: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    roles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Role',
      },
    ],
    numberLogined: {
      type: Number,
      default: 0,
    },
    dateLastLogined: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isEmail = function (email) {
  return validator.isEmail(email);
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 7);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
