const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = validateExperienceInput=(data)=>{
    const errors = {};

    data.title = isEmpty(data.title) ? '' : data.title;
    data.company = isEmpty(data.company) ? '' : data.company;
    data.from = isEmpty(data.from) ? '' : data.from;

    if (validator.isEmpty(data.title))
        errors.title = "Job title field is required"
    if (validator.isEmpty(data.company))
        errors.company = "Job company field is required"
    if (validator.isEmpty(data.from))
        errors.from = "Job from field is required"
    
    return  {
        errors,
        isValid: isEmpty(errors)
    }
}