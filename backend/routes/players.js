import express from 'express';
const router = express.Router();
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../database/firebase.js';
import updateScript from '../database/updateScript.js';
import deleteScript from '../database/deleteScript.js';
import addScript from '../database/addScript.js';

const database = 'players';

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
  let teamId = req.params.id;
  const colRef = query(collection(db, 'players'), where('team', '==', teamId));
  let players = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    players.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  // players = players.filter((p) => p.team === teamId);

  if (players && players.length > 0) {
    res.send(players);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/:id', async (req, res) => {
  const userToken = req?.headers?.authorization?.split(' ')[1];
  let idString = req.params.id;
  const docRef = doc(db, 'players', idString);
  const snapshot = await getDoc(docRef);
  const player = { ...snapshot.data(), id: idString };

  if (player) {
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
    let newPlayer = req.body;

    var newPlayerId = await addScript(newPlayer, 'players');
    res.status(200).send({ id: newPlayerId });
    return;
  }

  res.sendStatus(400);
  return;
});

router.post('/transferlist', async (req, res) => {
  let newTransferPlayer = req.body;
  const colRef = query(
    collection(db, 'transferListPlayers'),
    where('playerId', '==', newTransferPlayer.playerId)
  );
  let transferListedPlayers = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    transferListedPlayers.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (transferListedPlayers.length === 0) {
    var newTransferPlayerId = await addScript(
      newTransferPlayer,
      'transferListPlayers'
    );
    res.status(200).send({ id: newTransferPlayerId });
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
  const toBeDeleted = req.params.id;
  const docRef = doc(db, database, toBeDeleted);
  const snapshot = await getDoc(docRef);
  const player = snapshot.data();

  if (player) {
    await deleteScript(toBeDeleted, database);
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
  return;
});

export default router;
