import express from 'express';
const router = express.Router();
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase.js';
import updateScript from '../database/updateScript.js';

// const generateRounds = (teams) => {
//   const teamIds = teams;

//   const numTeams = teamIds.length;
//   const numRounds = numTeams - 1;
//   const matchesPerRound = numTeams / 2;

//   const rounds = [];

//   for (let round = 0; round < numRounds; round++) {
//     const roundMatches = [];

//     for (let match = 0; match < matchesPerRound; match++) {
//       const homeTeam = teamIds[match];
//       const awayTeam = teamIds[numTeams - 1 - match];

//       roundMatches.push({ homeTeam, awayTeam });
//     }

//     rounds.push(roundMatches);

//     // Rotate the teams for the next round
//     teamIds.splice(1, 0, teamIds.pop());
//   }
//   return rounds;
// };

// const appendTeams = (divisions, teams) => {
//   let allAppendedDivisions = [];
//   let appendedDivision = {};
//   divisions.forEach((division) => {
//     const updatedDivision = { ...division, ['teams']: [] };
//     let matchingTeams = [];
//     teams.forEach((team) => {
//       if (division.id === team.divisionID) {
//         matchingTeams = [...matchingTeams, team.id];
//       }
//     });
//     appendedDivision = { ...updatedDivision, ['teams']: matchingTeams };
//     allAppendedDivisions = [...allAppendedDivisions, appendedDivision];
//   });
//   return allAppendedDivisions;
// };

// const appendRounds = (divisions, appendedTeams) => {
//   let appendedRoundsDivision = {};
//   let updatedDivisions = [];
//   appendedTeams.forEach((division, index) => {
//     let rounds = generateRounds(division.teams);
//     appendedRoundsDivision = { ...divisions[index], ['rounds']: rounds };
//     updatedDivisions = [...updatedDivisions, appendedRoundsDivision];
//   });
//   return updatedDivisions;
// };

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

router.put('/:id', async (req, res) => {
  const colRef = collection(db, 'series');
  let idString = req.params.id;
  let divisions = [];
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    divisions.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  const teamsRef = collection(db, 'teams');
  let teams = [];
  const teamSnapshot = await getDocs(teamsRef);
  teamSnapshot.docs.forEach((docSnapshot) => {
    teams.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  divisions = divisions.filter((p) => p.id === idString);

  if (divisions && divisions.length > 0) {
    if (teams && teams.length > 0) {
      // const divisionsWithTeams = appendTeams(divisions, teams);
      // res.send(appendRounds(divisions, divisionsWithTeams));
      // res.send(divisionsWithTeams);
      // const updated = appendRounds(divisions, divisionsWithTeams);
      // console.log(updated);
      let newData = {
        division: divisions[0].division,
        name: divisions[0].name,
        seasons: {
          season1: {
            dates: {
              round1: '2023-05-05',
              round2: '2023-05-07',
              round3: '2023-05-09',
              round4: '2023-05-11',
              round5: '2023-05-13',
              round6: '2023-05-15',
              round7: '2023-05-17',
              round8: '2023-05-19',
              round9: '2023-05-21',
              round10: '2023-05-23',
              round11: '2023-05-25',
              round12: '2023-05-27',
              round13: '2023-05-29',
              round14: '2023-05-31',
              round15: '2023-06-02',
              round16: '2023-06-04',
              round17: '2023-06-06',
              round18: '2023-06-08',
            },
            rounds: {
              round1: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 5,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 17,
                      period2: 11,
                      period3: 22,
                      period4: 18,
                      period5: 15,
                    },
                    awayBuckets: {
                      period1: 2,
                      period2: 3,
                      period3: 8,
                      period4: 0,
                      period5: 9,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 4,
                    awayPeriods: 1,
                    homeBuckets: {
                      period1: 5,
                      period2: 22,
                      period3: 17,
                      period4: 33,
                      period5: 14,
                    },
                    awayBuckets: {
                      period1: 11,
                      period2: 8,
                      period3: 15,
                      period4: 22,
                      period5: 3,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 3,
                    homeBuckets: {
                      period1: 4,
                      period2: 8,
                      period3: 11,
                      period4: 3,
                      period5: 18,
                    },
                    awayBuckets: {
                      period1: 9,
                      period2: 27,
                      period3: 11,
                      period4: 31,
                      period5: 18,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 2,
                    awayPeriods: 3,
                    homeBuckets: {
                      period1: 15,
                      period2: 11,
                      period3: 7,
                      period4: 31,
                      period5: 2,
                    },
                    awayBuckets: {
                      period1: 17,
                      period2: 9,
                      period3: 22,
                      period4: 28,
                      period5: 11,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 2,
                    awayPeriods: 2,
                    homeBuckets: {
                      period1: 17,
                      period2: 27,
                      period3: 3,
                      period4: 12,
                      period5: 19,
                    },
                    awayBuckets: {
                      period1: 14,
                      period2: 31,
                      period3: 17,
                      period4: 11,
                      period5: 19,
                    },
                  },
                },
              ],
              round2: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round3: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round4: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round5: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round6: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round7: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round8: [
                {
                  homeTeam: '5Rw13q0n6jwa9YuPMOWi',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round9: [
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round10: [
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round11: [
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round12: [
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round13: [
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round14: [
                {
                  homeTeam: 'W3ezB4sNddAJyo6dxGO3',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'lcAkY26DqKiC37A7m67m',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round15: [
                {
                  homeTeam: 'HFoskGnM9L92zGLtNtBv',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round16: [
                {
                  homeTeam: 'EfLMNx26BVeaY2nbBglJ',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'foWJS1ulE5lsS3sG61sC',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round17: [
                {
                  homeTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
              round18: [
                {
                  homeTeam: 'AoQpZMZ9ytsEZaUDlk28',
                  awayTeam: '5Rw13q0n6jwa9YuPMOWi',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'lcAkY26DqKiC37A7m67m',
                  awayTeam: 'E0OoNSfJ3cgseB9JpGBE',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'l9wRqhHfI6kgW1ktI1SL',
                  awayTeam: 'EfLMNx26BVeaY2nbBglJ',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'foWJS1ulE5lsS3sG61sC',
                  awayTeam: 'HFoskGnM9L92zGLtNtBv',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
                {
                  homeTeam: 'Xwpl8x4tcXy9ZFQxlNqG',
                  awayTeam: 'W3ezB4sNddAJyo6dxGO3',
                  result: {
                    homePeriods: 0,
                    awayPeriods: 0,
                    homeBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                    awayBuckets: {
                      period1: 0,
                      period2: 0,
                      period3: 0,
                      period4: 0,
                      period5: 0,
                    },
                  },
                },
              ],
            },
          },
        },
        id: idString,
      };
      // console.log(updated[0].rounds);
      await updateScript(newData, 'series');
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
    return;
  }

  // if (divisions.length > 0) {
  //   let newData = {
  //     id: idString,
  //   };
  //   // if (something) {
  //   //   res.sendStatus(400);
  //   //   return;
  //   // }
  //   await updateScript(newData, 'series');
  //   res.sendStatus(200);
  //   return;
  // }

  res.sendStatus(404);
  return;
});

export default router;
