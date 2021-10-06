const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = validateLoginInput = (data) => {
    const errors ={};
    // if the user send an empty field it comes with undefined
    // Validator.isEmpty works with strings
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    
    if (validator.isEmpty(data.email))
        errors.email = "email is required"
    else if (!validator.isEmail(data.email))
        errors.email = "invalid email address"

    if (validator.isEmpty(data.password))
        errors.password = "password is required"
    else if (!validator.isLength(data.password, {min: 8, max: 16}))
        errors.password = "password must be 8-16 characters long";

    return (
        {
            errors,
            isValid : isEmpty(errors)
        }
    )
}

