import { collection, doc, deleteDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function deleteScript(toBeDeleted, database) {
  const idToRemove = toBeDeleted;

  const colRef = collection(db, database);

  const docRef = doc(colRef, idToRemove);

  await deleteDoc(docRef);
}

export default deleteScript;
