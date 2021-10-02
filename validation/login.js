const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = validateLoginInput = (data) => {
    const Errors ={};
    
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    
    if (validator.isEmpty(data.email))
        Errors.email = "email is required"
    else if (!validator.isEmail(data.email))
        Errors.email = "invalid email address"

    if (validator.isEmpty(data.password))
        Errors.password = "password is required"
    else if (!validator.isLength(data.password, {min: 8, max: 16}))
        Errors.username = "password must be 8-16 characters long";

    return (
        {
            Errors,
            isValid : isEmpty(Errors)
        }
    )
}

