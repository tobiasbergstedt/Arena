import express from 'express';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';

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

  const transferListColRef = collection(db, 'transferList');
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
  let playersList = [];
  // const myQuery = query(playersListColRef, where('race', '==', race));
  // const playersListSnapshot = await getDocs(myQuery);
  const playersListSnapshot = await getDocs(playersListColRef);
  playersListSnapshot.docs.forEach((docSnapshot) => {
    playersList.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  let transferListItems = transferList[0].players;
  const matchingPlayers = playersList
    .filter((transferObject) => {
      return transferListItems.some(
        (player) => player.id === transferObject.id
      );
    })
    .map((transferObject) => {
      const player = transferListItems.find(
        (player) => player.id === transferObject.id
      );
      return { ...transferObject, ...player };
    });

  let filteredPlayers = matchingPlayers;
  if (race) {
    filteredPlayers = filteredPlayers.filter((item) => item.race === race);
  }
  if (position) {
    // filteredPlayers = filteredPlayers.filter((item) =>
    //   item.position.some((value) => position.includes(value))
    // );
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
    // console.log('Min bid: ', minBid);
    // console.log('Bid 0: ', item.bid[0]);
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

  if (playersList && playersList.length > 0) {
    res.send(filteredPlayerswithTeamName);
    return;
  }

  res.sendStatus(404);
  return;
});

export default router;
