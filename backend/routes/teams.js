import express from 'express';
const router = express.Router();
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../database/firebase.js';
import addScript from '../database/addScript.js';
import updateScript from '../database/updateScript.js';

router.get('/', async (req, res) => {
  const colRef = collection(db, 'teams');
  let teams = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    teams.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  if (teams && teams.length > 0) {
    res.send(teams);
    return;
  }

  res.sendStatus(404);
  return;
});

// router.get('/level/:number', async (req, res) => {
//   let numberString = req.params.number;
//   const colRef = collection(db, 'series');
//   // const divRef = collection(db, 'teams');
//   const q1 = query(colRef, where('division', '==', numberString));
//   // const q2 = query(divRef, where('userUID', '==', numberString));
//   let divisions = [];
//   const snapshot = await getDocs(q1);
//   // const snapshot2 = await getDocs(q2);
//   snapshot.docs.forEach((docSnapshot) => {
//     divisions.push({ ...docSnapshot.data(), id: docSnapshot.id });
//   });

//   // divisions = divisions.filter((p) => p.id === idString);

//   if (divisions.length > 0) {
//     res.status(200).send(divisions);
//     return;
//   }

//   res.sendStatus(404);
//   return;
// });

router.get('/:id', async (req, res) => {
  const colRef = collection(db, 'teams');
  let idString = req.params.id;
  const q = query(colRef, where('userUID', '==', idString));
  let teams = [];
  const snapshot = await getDocs(q);
  snapshot.docs.forEach((docSnapshot) => {
    teams.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  // teams = teams.filter((p) => p.id === idString);

  if (teams.length > 0) {
    res.status(200).send(teams[0]);
    return;
  }

  res.sendStatus(404);
  return;
});

// const elfTeamNames = [
//   'Starwood Warriors',
//   'Golden Arrows',
//   'Moonlit Gladiators',
//   'Silver Streaks',
//   'Emerald Eagles',
//   'Celestial Blades',
//   'Twilight Titans',
//   'Elven Archers',
//   'Forest Flames',
//   'Enchanted Arrows',
//   'Mystic Minotaurs',
//   'Phoenix Fire',
//   'Arcane Assassins',
//   'Fae Flyers',
//   'Nimble Nymphs',
//   'Serene Storms',
//   'Shadow Shurikens',
//   'Mystic Mariners',
//   'Moonstone Mavericks',
//   'Radiant Raiders',
//   'Emerald Enigmas',
//   'Sapphire Stallions',
//   'Enchanted Eagles',
//   'Celestial Centaurs',
//   'Elven Eagles',
//   'Starlight Strikers',
//   'Golden Guardians',
//   'Moonlit Marvels',
//   'Silver Shadows',
//   'Fae Flames',
//   'Arcane Aces',
//   'Twilight Tempests',
//   'Enchanted Embers',
//   'Nimble Nemeses',
//   'Mystic Magicians',
//   'Phoenix Phenoms',
//   'Celestial Cyclones',
//   'Forest Foes',
//   'Radiant Rovers',
//   'Emerald Elite',
//   'Sapphire Storms',
//   'Mystic Monarchs',
//   'Shadow Sharks',
//   'Moonstone Mercenaries',
//   'Starwood Stormers',
//   'Golden Griffins',
//   'Moonlit Magicians',
//   'Silver Sabres',
//   'Fae Flyers',
//   'Nimble Nightingales',
//   'Serene Sorcerers',
//   'Shadow Slayers',
//   'Mystic Mystics',
//   'Phoenix Phantoms',
//   'Arcane Arrows',
//   'Twilight Titans',
//   'Enchanted Enigmas',
//   'Celestial Cavaliers',
//   'Elven Enforcers',
//   'Forest Falcons',
//   'Radiant Renegades',
//   'Emerald Eagles',
//   'Sapphire Stallions',
//   'Mystic Mariners',
//   'Moonstone Marauders',
//   'Starwood Soldiers',
//   'Golden Gladiators',
//   'Moonlit Mavericks',
//   'Silver Serpents',
//   'Fae Flames',
//   'Arcane Assassins',
//   'Twilight Tornadoes',
//   'Enchanted Emperors',
//   'Nimble Navigators',
//   'Mystic Mages',
//   'Phoenix Pharaohs',
//   'Celestial Chargers',
//   'Forest Fury',
//   'Radiant Raptors',
//   'Emerald Elite',
//   'Sapphire Squalls',
//   'Mystic Mariners',
//   'Shadow Scouts',
//   'Moonstone Mariners',
//   'Starwood Strikers',
//   'Golden Griffons',
//   'Moonlit Marauders',
//   'Silver Scorpions',
//   'Fae Flyers',
//   'Nimble Nymphs',
//   'Serene Sylphs',
//   'Shadow Snipers',
//   'Mystic Monks',
//   'Phoenix Flames',
//   'Arcane Archers',
//   'Twilight Thunder',
//   'Enchanted Emissaries',
//   'Celestial Crusaders',
//   'Elven Elders',
//   'Forest Furies',
// ];

// const humanTeams = [
//   'Azure Kings',
//   'Bayside Titans',
//   'Crimson Stars',
//   'Diamond Eagles',
//   'Evergreen Lions',
//   'Flame Knights',
//   'Golden Phoenix',
//   'Harvest Wolves',
//   'Imperial Tigers',
//   'Jade Falcons',
//   'Knight Owls',
//   'Lunar Stallions',
//   'Majestic Griffins',
//   'Noble Knights',
//   'Ocean Storm',
//   'Prairie Stallions',
//   'Radiant Suns',
//   'Royal Warriors',
//   'Sapphire Panthers',
//   'Thunder Hawks',
//   'Unity Lions',
//   'Valiant Knights',
//   'Wild Stallions',
//   'Xenon Crusaders',
//   'Yellow Jackets',
//   'Zealous Lions',
//   'Apex Predators',
//   'Bold Bears',
//   'Challenger Sharks',
//   'Dynamic Dragons',
//   'Endurance Rhinos',
//   'Fierce Falcons',
//   'Gladiator Warriors',
//   'Honorable Huskies',
//   'Iron Titans',
//   'Jubilant Jaguars',
//   'King Cobras',
//   'Lucky Leopards',
//   'Mighty Moose',
//   'Nimble Gazelles',
//   'Onyx Panthers',
//   'Proud Pumas',
//   'Radiant Raptors',
//   'Silver Sharks',
//   'Titanic Turtles',
//   'Untamed Lions',
//   'Vicious Vultures',
//   'Winged Warriors',
//   'Xenial Lions',
//   'Yellowstone Eagles',
//   'Zealot Zebras',
//   'Aurora Angels',
//   'Blaze Blazers',
//   'Celtic Knights',
//   'Divine Defenders',
//   'Electric Eels',
//   'Fortune Fighters',
//   'Glorious Gladiators',
//   'Heroic Hawks',
//   'Ironclad Iguanas',
//   'Jovial Jaguars',
//   'Knockout Kings',
//   'Lone Wolves',
//   'Majestic Mustangs',
//   'Noble Nighthawks',
//   'Orbiting Owls',
//   'Phoenix Flames',
//   'Rapid Runners',
//   'Sonic Storm',
//   'Triumphant Trojans',
//   'Ultimate Unicorns',
//   'Valorous Vipers',
//   'Wild Wolverines',
//   'Xenogenic Xenops',
//   'Yellowtail Yaks',
//   'Zeppelin Zealots',
//   'Astral Avengers',
//   'Battling Bison',
//   'Charming Cheetahs',
//   'Dreaming Dragons',
//   'Enigma Elephants',
//   'Fabled Foxes',
//   'Glorious Gazelles',
//   'Hazy Hornets',
//   'Iron Eagles',
//   'Jungle Jaguars',
//   'Kingly Kangaroos',
//   'Lionhearted Lions',
//   'Midnight Mavericks',
//   'Nebula Navigators',
//   'Ornery Ostriches',
//   'Pegasus Pioneers',
//   'Quicksilver Quails',
//   'Raging Rams',
//   'Stalwart Stallions',
//   'Terrific Tornadoes',
//   'Underdog Unicorns',
//   'Victorious Vultures',
//   'Whirlwind Warriors',
//   'Xenophobic Xerus',
//   'Yellow-billed Yellowhammers',
//   'Zen Zephyrs',
// ];

router.post('/populate', async (req, res) => {
  if (req.body) {
    const newTeam = {
      teamName: req.body.teamName,
      divisionID: req.body.divisionID,
      userUID: null,
      reputation: 1000,
      dateFounded: '2023-04-09',
      stadiumId: null,
      about: '',
      logo: '',
      supporterNumbers: 1000,
      supporterDistribution: [20, 50, 10, 20],
      fanFavorite: null,
      fanExpectations: Math.floor(Math.random() * 10),
      leaguePositionHistory: [],
      playerAwardsHistory: [],
    };

    console.log(newTeam);
    var newTeamId = await addScript(newTeam);
    res.status(200).send({ id: newTeamId });
    return;
  }

  res.sendStatus(400);
  return;
});

router.put('/random', async (req, res) => {
  let { userUID, race, teamName } = req.body;
  const colRef = collection(db, 'teams');
  const q = query(
    colRef,
    where('userUID', '==', null),
    where('race', '==', race)
  );
  let teams = [];
  const snapshot = await getDocs(q);
  snapshot.docs.forEach((docSnapshot) => {
    teams.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const randomIndex = Math.floor(Math.random() * teams.length);
  const randomTeam = teams[randomIndex];

  if (teams.length > 0) {
    let newData = {
      ...randomTeam,
      userUID: userUID,
      teamName: teamName,
    };
    await updateScript(newData, 'teams');
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
  return;
});

export default router;
