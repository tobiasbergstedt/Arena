import { useMutation } from 'react-query';
import client from './client';

export default {
  useUserData: (onSuccess) => {
    return useMutation(
      async () => {
        try {
          const response = await client.get('user');
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { onSuccess: onSuccess }
    );
  },
  useUserBalance: (onSuccess) => {
    return useMutation(
      async () => {
        try {
          const response = await client.get('user/wallet');
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { onSuccess: onSuccess }
    );
  },
  useUploadImage: (onSuccess) => {
    return useMutation(
      async (base64String) => {
        try {
          const response = await client.post('user/profileimage', {
            fileExtension: '.jpeg',
            profileImage: base64String,
          });
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { onSuccess: onSuccess }
    );
  },
};
