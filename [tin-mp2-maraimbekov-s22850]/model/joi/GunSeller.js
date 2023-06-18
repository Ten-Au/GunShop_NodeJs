const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "number.base":
                err.message = "validNumber";
                break;
            case "string.min":
                err.message = `min_${err.local.limit}`;
                break;
            case "string.max":
                err.message = `max_${err.local.limit}`;
                break;
            case "number.greater":
                err.message = `min_number`;
                break;
            case "number.less":
                err.message = `max_number`;
                break;
            default:
                break
        }
    });
    return errors;
}
const gunSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    gunNick: Joi.string()
        .min(2)
        .max(15)
        .required()
        .error(errMessages),
    experience: Joi.string()
        .optional()
        .allow("")
        .error(errMessages),
    salary: Joi.number()
        .greater(5000)
        .less(50000)
        .required()
        .error(errMessages)
});

module.exports = gunSchema;