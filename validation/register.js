const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = validateRegisterInput = (data) => {
    const errors ={};
    
    data.username = isEmpty(data.username) ? '' : data.username;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.passwordConfirm = isEmpty(data.passwordConfirm) ? '' : data.passwordConfirm;

    if (validator.isEmpty(data.username))
        errors.username = "Username is required"
    else  if (!validator.isLength(data.username, {min: 2, max: 30}))
    errors.username = "Username must be between 2 and 30 characters";
    
    if (validator.isEmpty(data.email))
        errors.email = "Email is required"
    else if (!validator.isEmail(data.email))
        errors.email = "Invalid email address"

    if (validator.isEmpty(data.password))
        errors.password = "Password is required"
    else if (!validator.isLength(data.password, {min: 8, max: 16}))
        errors.password = "Password must be 8-16 characters long";

    if (validator.isEmpty(data.passwordConfirm))
        errors.passwordConfirm = "Password confirm is required"
    else if (!validator.equals(data.passwordConfirm, data.password))
        errors.passwordConfirm = "Password does not match"; 

    return (
        {
            errors,
            isValid : isEmpty(errors)
        }
    )
}

