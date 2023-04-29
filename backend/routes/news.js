import express from 'express';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';

router.get('/', async (req, res) => {
  const colRef = collection(db, 'news');
  let news = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    news.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (news && news.length > 0) {
    res.send(news);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/newsfeed', async (req, res) => {
  const colRef = collection(db, 'news');
  let news = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    news.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const sortedNews = [
    ...news[0].news.sort((a, b) => b.dateAndTime - a.dateAndTime),
  ];
  const latestNews = sortedNews.slice(0, 3);

  if (latestNews && latestNews.length > 0) {
    res.send(latestNews);
    return;
  }

  res.sendStatus(404);
  return;
});

export default router;
