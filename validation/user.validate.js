const Joi = require('joi');

const addressSchema = {
    street: Joi.string().trim().min(5).max(100).allow(),
    city: Joi.string().trim().min(2).max(20).required(),
    state: Joi.string().trim().min(2).max(20).required(),
    phoneNumber: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required()
        .error(new Error('Provide Correct Mobile Number')),
}

const userSchema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().trim().alter({
        POST: (schema) => schema.required(),
        PUT: (schema) => schema.forbidden(),
        PATCH: (schema) => schema.forbidden(),
    }),
    password: Joi.string().min(5).max(25).alter({
        POST: (schema) => schema.required(),
        PUT: (schema) => schema.forbidden(),
        PATCH: (schema) => schema.forbidden(),
    }),

    address: Joi.object().keys(addressSchema).required(),
}



// const validateUser = async (body, requestType) => {
//     const schema = Joi.object({
//         user: Joi.object().keys(userSchema),
//         client:Joi.any()
//     })
//     return schema.tailor(requestType).validate(body);
// }

const validateUser = async (body, requestType) => {
    const schema = Joi.object().keys(userSchema)
    return schema.tailor(requestType).validate(body);
}

const validateClient = async (body) => {
    const schema = Joi.object().keys(clientSchema)
    return schema.validate(body);
}




module.exports = { validateUser, }