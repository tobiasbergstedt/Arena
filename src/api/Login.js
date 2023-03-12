import { useMutation } from 'react-query';
import client from './client';

export default {
  useDevRegister: (onSuccessCallback) => {
    return useMutation(
      async (orderReference) => {
        try {
          const postData = {
            orderReference: orderReference,
            phoneNumber: '',
            email: '',
            source: null,
            signUpOffer: null,
            depositLimitDay: 3000,
            depositLimitWeek: 3000,
            depositLimitMonth: 3000,
          };
          const response = await client.post('user/auth/register', postData);
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { onSuccess: onSuccessCallback }
    );
  },

  useDevLogin: (onSuccessCallback) => {
    return useMutation(
      async (nationalIdNo) => {
        try {
          const response = await client.get(
            `user/auth/dev/login/${nationalIdNo}`
          );
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { onSuccess: onSuccessCallback }
    );
  },
};
