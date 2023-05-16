import { collection, doc, updateDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function updateTransferArtefact(newData) {
  const idToUpdate = newData.id;

  const colRef = collection(db, 'transferListArtefacts');
  const oldDocRef = doc(colRef, idToUpdate);

  updateDoc(oldDocRef, newData);
}

export default updateTransferArtefact;
