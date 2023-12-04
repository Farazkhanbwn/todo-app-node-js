const { validationResult } = require("express-validator");

module.exports.generateErrorObjectExpressValidator = (requestInstance) => {
  const expressValidatorErrorsArray = validationResult(requestInstance);
  const hasErrors = !expressValidatorErrorsArray.isEmpty();
  const errors = generateLoginErrorMessages(
    expressValidatorErrorsArray.array()
  );

  return {
    hasErrors,
    errors,
  };
};

const generateLoginErrorMessages = (errors) => {
  const errorsObject = {};
  errors.forEach((error) => {
    errorsObject[error.path] = error.msg;
  });
  return errorsObject;
};
