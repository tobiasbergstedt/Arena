import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function addScript(newMessage) {
  const colRef = collection(db, 'chat');
  const newDocRef = await addDoc(colRef, newMessage);

  console.log('Added a new message with id: ', { id: newDocRef.id });

  let newId = newDocRef.id;

  return newId;
}

export default addScript;
