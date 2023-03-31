import { useQuery } from 'react-query';

// import client from './client';

export default {
  // returns list of all the people
  useList: () =>
    useQuery('peopleList', async () => {
      // try {
      //   const response = await client.get('people');
      //   return response.data;
      // } catch (error) {
      //   return Promise.reject(error);
      // }
    }),
  // return one specific person
  useDetail: (id, enabled) =>
    useQuery(
      ['peopleDetail', id],
      // async () => {
      //   try {
      //     const response = await client.get(`people/${id}`);
      //     return response.data;
      //   } catch (error) {
      //     return Promise.reject(error);
      //   }
      // },
      { enabled }
    ),
};

/*
Usage
const { data, isLoading, isSuccess } = People.useList();
const { data: detailData, isSuccess: detailIsSuccess } = People.useDetail(
    '1',
    loadDetail
);
*/
