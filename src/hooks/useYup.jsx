import { useState } from 'react';
import { validate } from 'utils/validation';

function useYup(schema) {
  const [errors, setErrors] = useState(null);
  const doValidate = async (data) => {
    const result = await validate(schema, data);
    if (result.valid) {
      setErrors(null);
    } else {
      setErrors(result.errors);
    }
  };
  return [errors, setErrors, doValidate];
}

export default useYup;
