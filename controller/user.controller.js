const createError = require('http-errors')
const { validateUser} = require('../validation/user.validate')
const { User  , Client} = require('../model');
const bcrypt = require("bcryptjs");
const {sendWelcomeEmail} = require('../_helper/sendEmail')
const {setValue, getValue,  redisClient} = require('../_helper/init_redis')
const axios = require('axios')
const Agenda = require("agenda");

// const pick = require('../_helper/pick');
const catchAsync = require('../_helper/catchAsync');

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../_helper/jwt_helper')




const createUser = catchAsync(async (req, res) => {
  const { error } = await validateUser(req.body, req.method)
  if (error) throw createError.BadRequest(error.message)
  const isUser = await User.find({email:req.body.email})
  if(isUser.length !== 0) throw createError.Conflict("User Already Found ")
  const user = await new User(req.body).save()
  res.send(user)
});

const updateUser = catchAsync(async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) throw createError.BadRequest('Not A Valid Id')
  const { error } = await validateUser(req.body, req.method)
  if (error) throw createError.BadRequest(error.message)
  const user = await User.findByIdAndUpdate(req.params.id, {...req.body}, { new: true })
  if(!user) throw createError.BadRequest('User Not Found')
  res.send(user)
});


const getUser = catchAsync(async (req, res) => {
  const result = await User.find({})
  res.send(result)
});



const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) throw createError.BadRequest()
  const agency = await User.findOne({ email: email })
  // const isMatch =zwait agency.isPasswordMatch(req.body.pasword);
  if (agency && bcrypt.compareSync(password, agency.password)) {
    const accessToken = await signAccessToken(agency.id)
    const refreshToken = await signRefreshToken(agency.id)
    res.send({ accessToken, refreshToken })
  } else {
    throw createError.NotFound('Username/password not valid')
  }
});



const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) throw createError.BadRequest()
  const userId = await verifyRefreshToken(refreshToken)
  const accessToken = await signAccessToken(userId)
  const refToken = await signRefreshToken(userId)
  res.send({ accessToken: accessToken, refreshToken: refToken })

});

const Test = catchAsync(async (req, res) => {

});


const logOut = catchAsync(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) throw createError.BadRequest()
  const userId = await verifyRefreshToken(refreshToken)
  result = await redisClient.DEL(userId)
  res.send({message:"Log Out SuccessFully"})
});





module.exports = {
  createUser,
  getUser,
  login,
  refreshToken,
  logOut,
  updateUser,
};

