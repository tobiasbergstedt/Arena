import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase.js';

async function addTransferPlayer(newTransferPlayer) {
  const colRef = collection(db, 'transferListPlayers');
  const newDocRef = await addDoc(colRef, newTransferPlayer);

  console.log('Added a new transfer listed player with id: ', {
    id: newDocRef.id,
  });

  let newId = newDocRef.id;

  return newId;
}

export default addTransferPlayer;
