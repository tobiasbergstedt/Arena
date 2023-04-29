import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function addScript(newTeam) {
  const colRef = collection(db, 'teams');
  const newDocRef = await addDoc(colRef, newTeam);

  console.log('Added a new team with id: ', { id: newDocRef.id });

  let newId = newDocRef.id;

  return newId;
}

export default addScript;
