const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = validatePostInput = (data) => {
    const errors ={};

    data.text = isEmpty(data.text) ? '' : data.text;
    
    if (!validator.isLength(data.text, {min: 10, max: 300}))
        errors.text = "Text field must be 10-300 characters long";

    if (validator.isEmpty(data.text))
        errors.text = "Text field is required"

    return (
        {
            errors,
            isValid : isEmpty(errors)
        }
    )
}

