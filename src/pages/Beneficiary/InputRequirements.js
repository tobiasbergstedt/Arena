import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  personalId: Yup.string()
    .required('You have to fill in your personal id')
    .min(10, 'Has to be at least 10 digits')
    .max(13, 'Can not be longer than 12 digits and a hyphen'),
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name cannot be longer than 40 characters'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^\S+@\S+\.\S+$/, 'Must be valid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must have at least 8 characters')
    .matches(
      /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?][0-9a-zA-Z]*$/,
      'Need one special character'
    )
    .matches(/.*[0-9].*/, 'Need at least one digit '),
});
const formOptions = { resolver: yupResolver(formSchema) };

export default formOptions;
