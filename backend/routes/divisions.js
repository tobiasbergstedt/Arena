import express from 'express';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';

router.get('/', async (req, res) => {
  const colRef = collection(db, 'series');
  let divisions = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    divisions.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (divisions && divisions.length > 0) {
    res.send(divisions);
    return;
  }

  res.sendStatus(404);
  return;
});

export default router;
