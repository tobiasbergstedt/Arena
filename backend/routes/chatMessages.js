import express from 'express';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';
import addScript from '../database/addScript.js';

router.get('/', async (req, res) => {
  const colRef = collection(db, 'chat');
  let messages = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    messages.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (messages && messages.length > 0) {
    messages.sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime));
    const sortedMessages = messages.slice(0, 30).reverse();
    res.send(sortedMessages);
    return;
  }

  res.sendStatus(404);
  return;
});

router.post('/', async (req, res) => {
  if (
    req.body &&
    req.body.content &&
    req.body.sentBy &&
    req.body.uid &&
    req.body.dateAndTime
  ) {
    let newMessage = {
      content: req.body.content,
      sentBy: req.body.sentBy,
      uid: req.body.uid,
      dateAndTime: req.body.dateAndTime,
    };

    var newMessageId = await addScript(newMessage, 'chat');
    res.status(200).send({ id: newMessageId });
    return;
  }

  res.sendStatus(400);
  return;
});

export default router;
