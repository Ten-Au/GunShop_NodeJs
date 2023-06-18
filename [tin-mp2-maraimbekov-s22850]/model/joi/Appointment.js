const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "notEmpty";
                break;
            case "date.base":
                err.message = "notEmpty";
                break;
            case "date.min":
                err.message = "min_date";
                break;
            case "date.max":
                err.message = "max_date";
                break;
            case "string.min":
                err.message = `min_${err.local.limit}`;
                break;
            case "string.max":
                err.message = `max_${err.local.limit}`;
                break;
            case "number.base":
                err.message = "validNumber"
                break;
            default:
                break;
        }
    });
    return errors;
}

const appSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    cId: Joi.number()
        .required()
        .error(errMessages),
    gunId: Joi.number()
        .required()
        .error(errMessages),
    date: Joi.date()
        .min("now")
        .max("2024-01-01")
        .required()
        .error(errMessages),
    location: Joi.string()
        .min(10)
        .max(60)
        .required()
        .error(errMessages)
});

module.exports = appSchema;