const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = validateProfileInput = (data) => {
  const errors = {};

  data.handle = isEmpty(data.handle) ? "" : data.handle;
  data.status = isEmpty(data.status) ? "" : data.status;
  data.skills = isEmpty(data.skills) ? "" : data.skills;

  if (validator.isEmpty(data.handle)) errors.handle = "Handle is required";
  else if (!validator.isLength(data.handle, { min: 2, max: 30 }))
    errors.handle = "Handle must be 2-30 characters long";

  if (validator.isEmpty(data.status)) errors.status = "Status is required";
  if (validator.isEmpty(data.skills)) errors.skills = "Skills are required";
  if (!isEmpty(data.website) && !validator.isURL(data.website))
    errors.website = "Invalid Url";

  if (!isEmpty(data.youtube) && !validator.isURL(data.youtube))
    errors.youtube = "Invalid Url";
  if (!isEmpty(data.twitter) && !validator.isURL(data.twitter))
    errors.twitter = "Invalid Url";
  if (!isEmpty(data.linkedin) && !validator.isURL(data.linkedin))
    errors.linkedin = "Invalid Url";
  if (!isEmpty(data.facebook) && !validator.isURL(data.facebook))
    errors.facebook = "Invalid Url";
  if (!isEmpty(data.instagram) && !validator.isURL(data.instagram))
    errors.instagram = "Invalid Url";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
