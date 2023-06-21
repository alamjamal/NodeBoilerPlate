const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugin');



const userSchema = mongoose.Schema(
  {
    // roles: {type: String, enum : ['user','client'],required: true},
    // user: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: user,
	// },

    name: {type: String,required: true,trim: true,},
    email: {type: String,required: true,unique: true, trim: true, lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }},
    },
    password: {type: String,required: true,trim: true, minlength: 4, 
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }},
        private: true, 
    },
    address: {
        street:{type: String,required: true,trim: true,},
        city:{type: String,required: true,trim: true,},
        state:{type: String,required: true,trim: true,},
        phoneNumber:{type: String,required: true,trim: true,length:10},
	},
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);


userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};


userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


userSchema.pre("findOneAndUpdate", function (next) {
  const user = this;
  if (user.getUpdate().password !== undefined) {
    bcrypt.hash(user.getUpdate().password, 8, (err, hash) => {
      if (err) return next(err);
      user.getUpdate().password = hash;
      return next();
    });
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
