function validateBody(validationSchema) {
  return async function validateBodyMiddleware(req, res, next) {
    try {
      const { body } = req;
      req.body = await validationSchema.validate(body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validateBody;
