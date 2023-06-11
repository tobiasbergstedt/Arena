import express from 'express';
import * as cron from 'node-cron';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';
import updateScript from '../database/updateScript.js';

router.get('/', async (req, res) => {
  const {
    race,
    position,
    minInjury,
    maxInjury,
    minSalary,
    maxSalary,
    minBid,
    maxBid,
  } = req.query;

  const transferListColRef = collection(db, 'transferListPlayers');
  let transferList = [];
  const transferListSnapshot = await getDocs(transferListColRef);
  transferListSnapshot.docs.forEach((docSnapshot) => {
    transferList.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const teamsListColRef = collection(db, 'teams');
  let teamsList = [];
  const teamsListSnapshot = await getDocs(teamsListColRef);
  teamsListSnapshot.docs.forEach((docSnapshot) => {
    teamsList.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const playersListColRef = collection(db, 'players');
  let matchingPlayers = [];

  const playersListSnapshot = await getDocs(playersListColRef);
  playersListSnapshot.docs.forEach((docSnapshot) => {
    const matchingTransferObject = transferList.find(
      (transferObject) => transferObject.playerId === docSnapshot.id
    );

    if (matchingTransferObject) {
      matchingPlayers.push({
        id: docSnapshot.id,
        ...docSnapshot.data(),
        ...matchingTransferObject,
      });
    }
  });

  let filteredPlayers = matchingPlayers;
  if (race) {
    filteredPlayers = filteredPlayers.filter((item) => item.race === race);
  }
  if (position) {
    filteredPlayers = filteredPlayers.filter((item) =>
      item.position.some((value) => value.position === position)
    );
  }
  if (minInjury) {
    filteredPlayers = filteredPlayers.filter(
      (item) => item.injuryLevel >= Number(minInjury)
    );
  }
  if (maxInjury) {
    filteredPlayers = filteredPlayers.filter(
      (item) => item.injuryLevel <= Number(maxInjury)
    );
  }
  if (minSalary) {
    filteredPlayers = filteredPlayers.filter(
      (item) => item.salary >= Number(minSalary)
    );
  }
  if (maxSalary) {
    filteredPlayers = filteredPlayers.filter(
      (item) => item.salary <= Number(maxSalary)
    );
  }
  if (minBid) {
    filteredPlayers = filteredPlayers.filter(
      (item) => item.bid[0] >= Number(minBid)
    );
  }
  if (maxBid) {
    filteredPlayers = filteredPlayers.filter(
      (item) => item.bid[0] <= Number(maxBid)
    );
  }

  const filteredPlayerswithTeamName = await Promise.all(
    filteredPlayers.map(async (item) => {
      const team = teamsList.find((team) => team.id === item.team);
      return { ...item, teamName: team.teamName };
    })
  );

  if (filteredPlayerswithTeamName && filteredPlayerswithTeamName.length > 0) {
    res.send(filteredPlayerswithTeamName);
    return;
  }

  res.sendStatus(404);
  return;
});

router.get('/artefacts', async (req, res) => {
  const { artefactType, minBid, maxBid } = req.query;

  const transferListColRef = collection(db, 'transferListArtefacts');
  let transferList = [];
  const transferListSnapshot = await getDocs(transferListColRef);
  transferListSnapshot.docs.forEach((docSnapshot) => {
    transferList.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const artefactsListColRef = collection(db, 'artefacts');
  let artefactsList = [];
  const artefactsListSnapshot = await getDocs(artefactsListColRef);
  artefactsListSnapshot.docs.forEach((docSnapshot) => {
    artefactsList.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const matchingArtefacts = [];
  artefactsList.forEach((artefact) => {
    const id = artefact.id;
    const data1 = artefact;
    transferList.forEach((transferObject) => {
      const data2 = transferObject;
      if (data2.artefactId === id) {
        matchingArtefacts.push({ id, ...data1, ...data2 });
      }
    });
  });

  let filteredArtefacts = matchingArtefacts;
  if (artefactType) {
    filteredArtefacts = filteredArtefacts.filter(
      (item) => item.type === artefactType
    );
  }
  if (minBid) {
    filteredArtefacts = filteredArtefacts.filter(
      (item) => item.bid[0] >= Number(minBid)
    );
  }
  if (maxBid) {
    filteredArtefacts = filteredArtefacts.filter(
      (item) => item.bid[0] <= Number(maxBid)
    );
  }

  if (artefactsList && artefactsList.length > 0) {
    res.send(filteredArtefacts);
    return;
  }

  res.sendStatus(404);
  return;
});

router.put('/artefacts/:id', async (req, res) => {
  const colRef = collection(db, 'transferListArtefacts');
  let { idString, bid, bidder } = req.body;
  let artefactsList = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    artefactsList.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  artefactsList = artefactsList.filter((p) => p.id === idString);

  if (artefactsList.length > 0) {
    let newData = {
      artefactId: artefactsList[0].artefactId,
      endDate: artefactsList[0].endDate,
      bid: bid,
      bidder: bidder,
      id: idString,
    };
    if (
      newData.bid === artefactsList[0].bid &&
      newData.bidder === artefactsList[0].bidder
    ) {
      res.sendStatus(400);
      return;
    }
    await updateScript(newData, 'transferListArtefacts');
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
  return;
});

cron.schedule('0 * * * *', () => {
  console.log('Running every full hour.');
});

export default router;
