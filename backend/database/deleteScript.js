import { collection, doc, deleteDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function deleteScript(toBeDeleted) {
  const idToRemove = toBeDeleted;

  const colRef = collection(db, 'players');

  const docRef = doc(colRef, idToRemove);

  await deleteDoc(docRef);
}

export default deleteScript;
