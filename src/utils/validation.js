function mapValidationErrors(yupError) {
  let errors = {};
  yupError.inner.forEach((valErr, index) => {
    errors[valErr.path] = yupError.errors[index];
  });
  return errors;
}

export async function validate(schema, data) {
  try {
    await schema.validate(data, { abortEarly: false });
    return { valid: true };
  } catch (error) {
    const validationErrors = mapValidationErrors(error);
    return { valid: false, errors: validationErrors };
  }
}
