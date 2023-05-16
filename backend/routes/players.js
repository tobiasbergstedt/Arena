import express from 'express';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';
import addScript from '../database/addScript.js';
import updateScript from '../database/updateScript.js';
import deleteScript from '../database/deleteScript.js';

router.get('/', async (req, res) => {
  const colRef = collection(db, 'players');
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });
  // const team = req.body.team;
  // console.log(team);

  // players = players.filter((p) => p.team === team);

  if (players && players.length > 0) {
    res.send(players);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/team/:id', async (req, res) => {
  const colRef = collection(db, 'players');
  let teamId = req.params.id;
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  players = players.filter((p) => p.team === teamId);

  if (players && players.length > 0) {
    res.send(players);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/random', async (req, res) => {
  const colRef = collection(db, 'players');
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (players && players.length > 0) {
    res.send(players[Math.floor(Math.random() * players.length)]);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/cutest', async (req, res) => {
  const colRef = collection(db, 'players');
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (players && players.length > 0) {
    let maxDifferential = players
      .map((h) => h.wins - h.defeats)
      .reduce((acc, cur) => Math.max(acc, cur), -1000);

    let cutest = players.filter((h) => h.wins - h.defeats === maxDifferential);

    res.status(200).send(cutest);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/:id', async (req, res) => {
  const userToken = req?.headers?.authorization?.split(' ')[1];
  const colRef = collection(db, 'players');
  let idString = req.params.id;
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const player = players.filter((p) => p.id === idString)[0];

  if (players.length > 0) {
    if (userToken === player.team) {
      res.status(200).send(player);
      return;
    } else {
      delete player.attributes;
      res.status(200).send(player);
      return;
    }
  }

  res.sendStatus(404);
  return;
});

router.post('/', async (req, res) => {
  if (req.body) {
    let newHamster = {
      name: req.body.name,
      age: Number(req.body.age),
      favFood: req.body.favFood,
      loves: req.body.loves,
      imgName: req.body.imgName,
      wins: Number(req.body.wins),
      defeats: Number(req.body.defeats),
      games: Number(req.body.games),
    };

    var newHamsterId = await addScript(newHamster);
    res.status(200).send({ id: newHamsterId });
    return;
  }

  res.sendStatus(400);
  return;
});

router.put('/:id', async (req, res) => {
  const colRef = collection(db, 'players');
  let idString = req.params.id;
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  players = players.filter((p) => p.id === idString);

  if (players.length > 0) {
    let newData = {
      name: req.body.name || players[0].name,
      age: Number(req.body.age) || players[0].age,
      favFood: req.body.favFood || players[0].favFood,
      loves: req.body.loves || players[0].loves,
      imgName: req.body.imgName || players[0].imgName,
      wins: Number(req.body.wins) || players[0].wins,
      defeats: Number(req.body.defeats) || players[0].defeats,
      games: Number(req.body.games) || players[0].games,
      id: idString,
    };
    if (
      newData.name === players[0].name &&
      newData.age === players[0].age &&
      newData.favFood === players[0].favFood &&
      newData.loves === players[0].loves &&
      newData.imgName === players[0].imgName &&
      newData.wins === players[0].wins &&
      newData.defeats === players[0].defeats &&
      newData.games === players[0].games
    ) {
      res.sendStatus(400);
      return;
    }
    await updateScript(newData);
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
  return;
});

router.delete('/:id', async (req, res) => {
  let toBeDeleted = req.params.id;
  const colRef = collection(db, 'players');
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  players = players.filter((p) => p.id === toBeDeleted);

  if (players.length > 0) {
    await deleteScript(toBeDeleted);
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
  return;
});

export default router;
