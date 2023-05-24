import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function addPlayerScript(newTeam) {
  const colRef = collection(db, 'players');
  const newDocRef = await addDoc(colRef, newTeam);

  console.log('Added a new player with id: ', { id: newDocRef.id });

  let newId = newDocRef.id;

  return newId;
}

export default addPlayerScript;
