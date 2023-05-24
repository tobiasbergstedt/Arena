// import { useState } from 'react';
import fixUrl from 'utils/fix-url';
import styles from './Club.module.scss';

const Club = () => {
  // const [myTeamName, setMyTeamName] = useState('');
  // const [myTeamId, setMyTeamId] = useState('');
  // const [myTeamRace, setMyTeamRace] = useState('');
  // const players = [];
  // const teams = [
  //   { id: '3zdKjR8SqqyfJmUdlqEi', name: 'Dragonfire FC', race: 'Dwarf' },
  //   { id: '5Rw13q0n6jwa9YuPMOWi', name: 'Flame Knights', race: 'Human' },
  //   { id: '6FuG3XTfaA9CYURo5xze', name: 'Moonlit Gladiators', race: 'Elf' },
  //   { id: '7LjO621LXCljNmmZVbZv', name: 'Golden Arrows', race: 'Elf' },
  //   { id: '9OZCxah28Em9D465q75p', name: 'Bayside Titans', race: 'Human' },
  //   { id: 'AoQpZMZ9ytsEZaUDlk28', name: 'Deepdelvers', race: 'Dwarf' },
  //   { id: 'BFXgClnXGy4O5OAZO6CI', name: 'Frostbiters', race: 'Orc' },
  //   { id: 'CQBn6l7q38sYM5MtMNCH', name: 'Elven Archers', race: 'Elf' },
  //   { id: 'DuAuj6zAUzgT61FcIS26', name: 'Skullcrushers', race: 'Orc' },
  //   { id: 'E0OoNSfJ3cgseB9JpGBE', name: 'Starwood Warriors', race: 'Elf' },
  //   { id: 'EfLMNx26BVeaY2nbBglJ', name: 'Crimson Stars', race: 'Human' },
  //   { id: 'HFoskGnM9L92zGLtNtBv', name: 'Jade Falcons', race: 'Human' },
  //   { id: 'IlDYcplkqcFK4YE1kh1f', name: 'Emerald Eagles', race: 'Elf' },
  //   { id: 'J5fSfUlBXtIfYqdmykWM', name: 'Thundering Hammers', race: 'Dwarf' },
  //   { id: 'KgYpgcHDFRIPYyU9cw50', name: 'Evergreen Lions', race: 'Human' },
  //   { id: 'LZsjwMaDESUNFTmWn8qR', name: 'Orcslayers United', race: 'Dwarf' },
  //   { id: 'MpI2FLKN5rlelrsjJ0Op', name: 'Ironbeards FC', race: 'Dwarf' },
  //   { id: 'ND6Jfw0K8tYcJujd5EZ3', name: 'Razorclaws', race: 'Orc' },
  //   { id: 'NbF4qOfYLfVujmqTA0zA', name: 'Ironfists', race: 'Orc' },
  //   { id: 'QIq05Ef77Og8mR3H0zO6', name: 'Chaosbringers', race: 'Orc' },
  //   { id: 'W3ezB4sNddAJyo6dxGO3', name: 'Mithril Miners', race: 'Dwarf' },
  //   { id: 'Xwpl8x4tcXy9ZFQxlNqG', name: 'Stonehewers', race: 'Dwarf' },
  //   { id: 'a76aSI3Pkk2vawxGENc6', name: 'Grimstone Giants', race: 'Dwarf' },
  //   { id: 'bhPgFfZctxmDLT9Ozt2d', name: 'Fireblades', race: 'Orc' },
  //   { id: 'cWmNiCJqYNFdIgAwGDjB', name: 'Bonebreakers', race: 'Orc' },
  //   { id: 'cjVWIzZo5K2moqeq6Wcx', name: 'Diamond Eagles', race: 'Human' },
  //   { id: 'fFnslH9uLMMRV1Q6j02g', name: 'Azure Kings', race: 'Human' },
  //   { id: 'foWJS1ulE5lsS3sG61sC', name: 'Imperial Tigers', race: 'Human' },
  //   { id: 'gI4FNOrjmMYpcuznJldQ', name: 'Forest Flames', race: 'Elf' },
  //   { id: 'h8XO2bjRNXLIzq0hg3jX', name: 'Blackforge United', race: 'Dwarf' },
  //   { id: 'igCDdlpPm6yQhEbwePJh', name: 'Thunderbolts', race: 'Orc' },
  //   { id: 'l9wRqhHfI6kgW1ktI1SL', name: 'Bloodscreamers', race: 'Orc' },
  //   { id: 'lcAkY26DqKiC37A7m67m', name: 'Enchanted Arrows', race: 'Elf' },
  //   { id: 'rCyVl591cCTBR19yswqr', name: 'Goldvein FC', race: 'Dwarf' },
  //   { id: 'tGwbFUSvcRpPwtS1Ca2m', name: 'Harvest Wolves', race: 'Human' },
  //   { id: 'tmiwjaiLKbls0XiUHJMt', name: 'Deathshadows', race: 'Orc' },
  //   { id: 'vu9pYcdADTnlWiowtegF', name: 'Celestial Blades', race: 'Elf' },
  //   { id: 'y90Ib6FZOpIJ4mkUcWQb', name: 'Twilight Titans', race: 'Elf' },
  //   { id: 'ysxF8plpj69Ns2BoKzeG', name: 'Silver Streaks', race: 'Elf' },
  //   { id: 'zPbJN7AEcSk9mS4xPgbd', name: 'Golden Phoenix', race: 'Human' },
  // ];
  // const elfCities = [
  //   'Aerendil',
  //   'Luthandor',
  //   'Alveron',
  //   'Silverwyn',
  //   'Thalendor',
  //   'Aranelle',
  //   'Eldermere',
  //   'Quelthas',
  //   'Starhaven',
  //   'Everdawn',
  //   'Eldarien',
  //   'Queltharia',
  //   'Thalindor',
  //   'Aerendell',
  //   'Lorendil',
  //   'Silvandor',
  //   'Caladriëlle',
  //   'Eldoria',
  //   'Sylvera',
  //   'Verdanthir',
  // ];
  // const dwarfCities = [
  //   'Ironpeak',
  //   'Stonehelm',
  //   'Hammerhold',
  //   'Goldenvault',
  //   'Granitebeard',
  //   'Forgeholm',
  //   'Deepstone',
  //   'Silverhammer',
  //   'Oakenshield',
  //   'Copperforge',
  //   'Ironholm',
  //   'Stoneshield',
  //   'Granitepeak',
  //   'Hammerfall',
  //   'Goldenspire',
  //   'Mithrilhold',
  //   'Stonebeard',
  //   'Silveraxe',
  //   'Frosthammer',
  //   'Craghammer',
  // ];
  // const orcCities = [
  //   'Bloodfang',
  //   'Grimtok',
  //   'Ironmaw',
  //   'Skullsmash',
  //   'Darkthorn',
  //   'Brimstone',
  //   'Bonecrusher',
  //   'Blackaxe',
  //   'Gorehowl',
  //   'Rotgut',
  //   'Gorefang',
  //   'Skullcrush',
  //   'Razorgut',
  //   'Bloodspire',
  //   'Blackthorn',
  //   'Ironjaw',
  //   'Shadowfang',
  //   'Ravenskull',
  //   'Thornmaw',
  //   'Ironhide',
  // ];
  // const humanCities = [
  //   'Ashbourne',
  //   'Fairhaven',
  //   'Willowbrook',
  //   'Oakwood',
  //   'Millbourne',
  //   'Ironcrest',
  //   'Stonefield',
  //   'Thornville',
  //   'Greyhaven',
  //   'Riverdale',
  //   'Havenbrook',
  //   'Alderdale',
  //   'Fairmeadow',
  //   'Stormholm',
  //   'Oakhurst',
  //   'Silverreach',
  //   'Riverside',
  //   'Woodhaven',
  //   'Hearthglade',
  //   'Ironridge',
  // ];
  // const dwarfNames = [
  //   'Baldrik',
  //   'Durgin',
  //   'Grimbold',
  //   'Keldran',
  //   'Thrumm',
  //   'Hammersong',
  //   'Rockshield',
  //   'Stonespire',
  //   'Flintbeard',
  //   'Gloinbar',
  //   'Orik',
  //   'Brondor',
  //   'Thormar',
  //   'Grimbeard',
  //   'Durin',
  //   'Bouldrak',
  //   'Ironjaw',
  //   'Sunderstone',
  //   'Frostbeard',
  //   'Graniteborn',
  // ];
  // const elfNames = [
  //   'Aerendir',
  //   'Lorawen',
  //   'Celdirebor',
  //   'Eldariel',
  //   'Nimrodel',
  //   'Thalarel',
  //   'Aralindë',
  //   'Galadrieth',
  //   'Silviana',
  //   'Faelar',
  //   'Eladriel',
  //   'Sylvaris',
  //   'Lorethion',
  //   'Erevan',
  //   'Thalasind',
  //   'Eldorin',
  //   'Nimloth',
  //   'Amarae',
  //   'Caladwen',
  //   'Eldoria',
  // ];
  // const orcNames = [
  //   'Grommash',
  //   'Durgok',
  //   'Razgar',
  //   'Gharnok',
  //   'Mogrok',
  //   'Throk',
  //   'Urzog',
  //   'Drakar',
  //   'Gorefang',
  //   'Gruzh',
  //   'Nazgrim',
  //   'Skarash',
  //   'Drekthar',
  //   'Rokhan',
  //   'Zugor',
  //   'Gurkash',
  //   'Thargor',
  //   'Bashnok',
  //   'Grishnak',
  //   'Gorgash',
  // ];
  // const humanNames = [
  //   'Aldric',
  //   'Aricen',
  //   'Gareth',
  //   'Brynmor',
  //   'Cedricus',
  //   'Eldrian',
  //   'Finnian',
  //   'Kaelen',
  //   'Lucian',
  //   'Severin',
  //   'Emrys',
  //   'Wystan',
  //   'Leofric',
  //   'Yorick',
  //   'Rowan',
  //   'Bramwell',
  //   'Edric',
  //   'Lysander',
  //   'Oberon',
  //   'Perrin',
  // ];
  // const positions = [
  //   'Goalkeeper',
  //   'Central defender',
  //   'Left/right defender',
  //   'Central midfielder',
  //   'Left/right midfielder',
  //   'Central forward',
  //   'Left/right forward',
  // ];
  // const generatePlayers = async () => {
  //   const allTeams = [...teams];
  //   function generateRandomTeam() {
  //     var min = 0;
  //     var max = 39;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   function generateRandomInjuryLevel() {
  //     var min = 0;
  //     var max = 10;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   function generateRandomAttributeValue() {
  //     var min = 7;
  //     var max = 13;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   function generateRandomAttemptValue() {
  //     var min = 50;
  //     var max = 150;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   function generateRandomStatsValue() {
  //     var min = 0;
  //     var max = 49;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   function generateRandomRankingsValue() {
  //     var min = 1;
  //     var max = 100;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   function generateRandomTransferSum() {
  //     var min = 0;
  //     var max = 100000;
  //     var interval = 500;
  //     var randomNumber =
  //       Math.floor(Math.random() * ((max - min) / interval + 1)) * interval;
  //     return randomNumber;
  //   }
  //   function generateTransferHistory(myTeamName) {
  //     var min = 0;
  //     var max = 1;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     var transferHistory = [];
  //     for (let index = 0; index < randomNumber; index++) {
  //       transferHistory.push({
  //         boughtBy: myTeamName,
  //         date: '2023-01-01',
  //         soldBy: allTeams[generateRandomTeam()].name,
  //         sum: generateRandomTransferSum(),
  //       });
  //     }
  //     return transferHistory;
  //   }
  //   function generateRandomPosition() {
  //     var min = 0;
  //     var max = 6;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return positions[randomNumber];
  //   }
  //   function generateFit() {
  //     const positions = [];
  //     const generatedNumbers = [];
  //     const generatedPositions = [];
  //     for (let index = 0; index < 3; index++) {
  //       var min = 70;
  //       var max = 100;
  //       var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //       generatedNumbers.push(randomNumber);
  //       const position = generateRandomPosition();
  //       positions.slice(randomNumber, 1);
  //       generatedPositions.push(position);
  //       positions.push({
  //         fit: randomNumber,
  //         position: position,
  //       });
  //     }
  //     positions.sort((a, b) => b.fit - a.fit);
  //     return positions;
  //   }
  //   function generateCity(myTeamRace, index) {
  //     if (myTeamRace === 'Elf') {
  //       return elfCities[index];
  //     } else if (myTeamRace === 'Orc') {
  //       return orcCities[index];
  //     } else if (myTeamRace === 'Dwarf') {
  //       return dwarfCities[index];
  //     } else if (myTeamRace === 'Human') {
  //       return humanCities[index];
  //     }
  //   }
  //   function generateName(myTeamRace, index) {
  //     if (myTeamRace === 'Elf') {
  //       return elfNames[index];
  //     } else if (myTeamRace === 'Orc') {
  //       return orcNames[index];
  //     } else if (myTeamRace === 'Dwarf') {
  //       return dwarfNames[index];
  //     } else if (myTeamRace === 'Human') {
  //       return humanNames[index];
  //     }
  //   }
  //   function generateSalary() {
  //     var min = 500;
  //     var max = 1500;
  //     var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     return randomNumber;
  //   }
  //   teams.forEach((myTeam) => {
  //     for (let index = 0; index < 20; index++) {
  //       const player = {
  //         artefacts: [],
  //         attempts: {
  //           assists: generateRandomAttemptValue(),
  //           blocks: generateRandomAttemptValue(),
  //           goals: generateRandomAttemptValue(),
  //           hoops: generateRandomAttemptValue(),
  //           intercepts: generateRandomAttemptValue(),
  //           saves: generateRandomAttemptValue(),
  //         },
  //         attributes: [
  //           { attribute: 'stamina', value: generateRandomAttributeValue() },
  //           { attribute: 'passing', value: generateRandomAttributeValue() },
  //           { attribute: 'shooting', value: generateRandomAttributeValue() },
  //           { attribute: 'dribbling', value: generateRandomAttributeValue() },
  //           { attribute: 'speed', value: generateRandomAttributeValue() },
  //           { attribute: 'marking', value: generateRandomAttributeValue() },
  //           { attribute: 'strength', value: generateRandomAttributeValue() },
  //           { attribute: 'tackling', value: generateRandomAttributeValue() },
  //           { attribute: 'composure', value: generateRandomAttributeValue() },
  //           { attribute: 'positioning', value: generateRandomAttributeValue() },
  //           { attribute: 'goalkeeping', value: generateRandomAttributeValue() },
  //           { attribute: 'aggression', value: generateRandomAttributeValue() },
  //           { attribute: 'vision', value: generateRandomAttributeValue() },
  //           {
  //             attribute: 'interceptions',
  //             value: generateRandomAttributeValue(),
  //           },
  //           { attribute: 'technique', value: generateRandomAttributeValue() },
  //           { attribute: 'discipline', value: generateRandomAttributeValue() },
  //           { attribute: 'creativity', value: generateRandomAttributeValue() },
  //           { attribute: 'leadership', value: generateRandomAttributeValue() },
  //         ],
  //         cityOfOrigin: generateCity(myTeam.race, index),
  //         injuryLevel: generateRandomInjuryLevel(),
  //         matchForm: generateRandomRankingsValue(),
  //         name: generateName(myTeam.race, index),
  //         number: index + 1,
  //         position: generateFit(),
  //         race: myTeam.race,
  //         salary: generateSalary(),
  //         stats: {
  //           assists: generateRandomStatsValue(),
  //           blocks: generateRandomStatsValue(),
  //           goals: generateRandomStatsValue(),
  //           hoops: generateRandomStatsValue(),
  //           intercepts: generateRandomStatsValue(),
  //           saves: generateRandomStatsValue(),
  //         },
  //         statsRanking: {
  //           assists: [
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //           ],
  //           blocks: [
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //           ],
  //           goals: [
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //           ],
  //           hoops: [
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //           ],
  //           intercepts: [
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //           ],
  //           saves: [
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //             generateRandomRankingsValue(),
  //           ],
  //         },
  //         team: myTeam.id,
  //         transferHistory: generateTransferHistory(myTeam.nameame),
  //       };
  //       players.push(player);
  //     }
  //   });
  //   console.log(players);
  // };

  // const handleAddPlayers = async () => {
  //   await generatePlayers();

  //   for (const player of players) {
  //     await fetch(fixUrl('/players'), {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(player),
  //     });
  //   }
  // };

  const handleDeletePlayer = async (playerID) => {
    await fetch(fixUrl(`/players/${playerID}`), {
      method: 'DELETE',
    });
  };

  return (
    <div>
      <div>
        <h2 className={styles.heading}>Hej</h2>
        <p>Vad gör du?</p>
        {/* <button
          onClick={() => {
            handleAddPlayers();
          }}
        >
          Generate
        </button> */}
        <button
          onClick={() => {
            handleDeletePlayer('zj8CRrJ9b0cBePUf6EMP');
          }}
        >
          Delete zj8CRrJ9b0cBePUf6EMP
        </button>
      </div>
    </div>
  );
};

export default Club;
