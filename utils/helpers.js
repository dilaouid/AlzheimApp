export const pushErrors = (errors, field, msg) => {
  if (errors.hasOwnProperty(field)) {
    errors[field] = msg;
  } else {
    errors[field] = msg;
  }
  return errors;
};
