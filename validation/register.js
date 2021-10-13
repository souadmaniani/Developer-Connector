const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = validateRegisterInput = (data) => {
    const errors ={};
    
    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;

    if (validator.isEmpty(data.name))
        errors.name = " Name is required"
    else  if (!validator.isLength(data.name, {min: 2, max: 30}))
    errors.name = "Name must be between 2 and 30 characters";
    
    if (validator.isEmpty(data.email))
        errors.email = "Email is required"
    else if (!validator.isEmail(data.email))
        errors.email = "Invalid email address"

    if (validator.isEmpty(data.password))
        errors.password = "Password is required"
    else if (!validator.isLength(data.password, {min: 8, max: 16}))
        errors.password = "Password must be 8-16 characters long";

    if (validator.isEmpty(data.password2))
        errors.password2 = "Password confirm is required"
    else if (!validator.equals(data.password2, data.password))
        errors.password2 = "Password does not match"; 

    return (
        {
            errors,
            isValid : isEmpty(errors)
        }
    )
}

