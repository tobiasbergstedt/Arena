import axios from 'axios';
// import { toast } from 'react-toastify';

// import { API_BASE_URL } from 'config/settings';
// import { STORAGE_USER_TOKEN_KEY } from 'config/constants';
// import { session } from 'utils/storage';

const client = axios.create({
  //   baseURL: API_BASE_URL,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // client.interceptors.request.use((request) => {
  //   const accessToken = session.read(STORAGE_USER_TOKEN_KEY)?.accessToken;
  //   if (accessToken) {
  //     request.headers['Authorization'] = `Bearer ${accessToken}`;
  //   }
  //   /**
  //    * Do something before every request
  //    * This is a good place to authorize request if needed
  //    */
  //   // console.log(request);
  //   return request;
  // });
  // client.interceptors.response.use(
  //   (response) => {
  //     /**
  //      * Do something after every response
  //      * For example, check status code etc...
  //      */
  //     return response;
  //   },
  //   (error) => {
  //     const toastError = {
  //       message: error.message,
  //       responseURL: error?.response?.request?.responseURL || '',
  //     };
  //     toast.error(`Error:${toastError.message} ${toastError.responseURL}`, {
  //       theme: 'colored',
  //     });
});

export default client;
