import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// import { firebaseConfig } from './firebaseConfig.json';

const firebaseConfig = {
  apiKey: 'AIzaSyCSPoKh587qhhP4weHhGX1-ZzHiWLb7nSg',
  authDomain: 'arena-5ce01.firebaseapp.com',
  projectId: 'arena-5ce01',
  storageBucket: 'arena-5ce01.appspot.com',
  messagingSenderId: '59820358918',
  appId: '1:59820358918:web:813538c23a7a543b86b287',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
