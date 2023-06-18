const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "string.min":
                err.message = `min_${err.local.limit}`;
                break;
            case "string.max":
                err.message = `max_${err.local.limit}`;
                break;
            case "string.pattern.base":
                err.message = `validPhone`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const cusSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    nickName: Joi.string()
        .min(2)
        .max(15)
        .optional()
        .allow("")
        .error(errMessages),
    phoneNumber: Joi.string() //edit later
        .pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/)
        .required()
        .error(errMessages),
    password: Joi.string()
        .allow("")
});

module.exports = cusSchema;