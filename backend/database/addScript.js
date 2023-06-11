import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function addScript(newItem, database) {
  const colRef = collection(db, database);
  const newDocRef = await addDoc(colRef, newItem);

  console.log(`Added a new item to collection "${database}" with id: `, {
    id: newDocRef.id,
  });

  let newId = newDocRef.id;

  return newId;
}

export default addScript;
