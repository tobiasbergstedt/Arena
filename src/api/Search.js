import { /*useMutation, */ useQuery } from 'react-query';

// import client from './client';

export default {
  useSaveSearchHistory: (/*onSuccessCallback*/) => {
    // return useMutation(
    // async (data) => {
    //   try {
    //     const response = await client.post('lottery/place/search/history', {
    //       ...data,
    //     });
    //     return response;
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    //   { onSuccess: onSuccessCallback }
    // );
  },

  useSearchHistory: () =>
    useQuery(['getSearchHistory'], async () => {
      // try {
      //   const response = await client.get('lottery/place/search/history');
      //   return response.data;
      // } catch (error) {
      //   return Promise.reject(error);
      // }
    }),
};
