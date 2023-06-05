import { collection, doc, updateDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function updateTeam(newData) {
  const idToUpdate = newData.id;

  const colRef = collection(db, 'teams');
  const oldDocRef = doc(colRef, idToUpdate);

  updateDoc(oldDocRef, newData);
}

export default updateTeam;
