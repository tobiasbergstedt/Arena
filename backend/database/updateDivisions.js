import { collection, doc, updateDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function updateDivisions(newData) {
  const idToUpdate = newData.id;

  console.log(newData);

  const colRef = collection(db, 'series');
  const oldDocRef = doc(colRef, idToUpdate);

  updateDoc(oldDocRef, newData);
}

export default updateDivisions;
