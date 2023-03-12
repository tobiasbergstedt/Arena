import { useQuery } from 'react-query';

import client from './client';

export default {
  // returns configurations for project
  useGetActivePlaces: () =>
    useQuery(
      'activePlaces',
      async () => {
        try {
          const response = await client.get('lottery/activeplaces');

          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      { staleTime: 1000 * 120 }
    ),
};
