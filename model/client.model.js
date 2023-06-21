const { string } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON } = require('./plugin');
const {Agency} = require('./user.model')

const clientSchema = mongoose.Schema(
  {
    EventName: {type: String},
    EventId: {type: String},
    MarketId: {type: String},

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
clientSchema.plugin(toJSON);


clientSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};


clientSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

clientSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
