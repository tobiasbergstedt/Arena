import { useQuery } from 'react-query';

import client from './client';

export default {
  // returns configurations for project
  useGetConfig: () =>
    useQuery('configurations', async () => {
      try {
        const response = await client.get('user/configurations');
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }),
  useGetNextShowStart: () =>
    useQuery('nextShow', async () => {
      try {
        const response = await client.get('show/nextshow');
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }),
};
