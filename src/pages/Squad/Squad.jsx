import { useContext, useEffect, useState } from 'react';

import { UserContext } from 'context/UserContext';
import fixUrl from 'utils/fix-url';

import Page from 'components/Page/Page';
import PlayerTemplate from 'components/PlayerTemplate/PlayerTemplate';

import styles from './Squad.module.scss';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Spinner from 'components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const Squad = () => {
  const { userTeam } = useContext(UserContext);
  const [players, setPlayers] = useState();

  const { t } = useTranslation();

  // const [teams, setTeams] = useState([]);
  // const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      if (userTeam?.length !== 0) {
        const response = await fetch(fixUrl(`/players/team/${userTeam.id}`));
        const apiData = await response.json();
        setPlayers(apiData);
      }
    }
    getPlayers();
    // async function getTeams() {
    //   const response = await fetch(fixUrl('/teams'));
    //   const apiData = await response.json();
    //   setTeams(apiData);
    // }
    // getTeams();
    // async function getDivisions() {
    //   const response = await fetch(fixUrl('/divisions'));
    //   const apiData = await response.json();
    //   setDivisions(apiData);
    // }
    // getDivisions();
  }, [userTeam]);

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
  //   // 'Mystic Minotaurs',
  //   // 'Phoenix Fire',
  //   // 'Arcane Assassins',
  //   // 'Fae Flyers',
  //   // 'Nimble Nymphs',
  //   // 'Serene Storms',
  //   // 'Shadow Shurikens',
  //   // 'Mystic Mariners',
  //   // 'Moonstone Mavericks',
  //   // 'Radiant Raiders',
  //   // 'Emerald Enigmas',
  //   // 'Sapphire Stallions',
  //   // 'Enchanted Eagles',
  //   // 'Celestial Centaurs',
  //   // 'Elven Eagles',
  //   // 'Starlight Strikers',
  //   // 'Golden Guardians',
  //   // 'Moonlit Marvels',
  //   // 'Silver Shadows',
  //   // 'Fae Flames',
  //   // 'Arcane Aces',
  //   // 'Twilight Tempests',
  //   // 'Enchanted Embers',
  //   // 'Nimble Nemeses',
  //   // 'Mystic Magicians',
  //   // 'Phoenix Phenoms',
  //   // 'Celestial Cyclones',
  //   // 'Forest Foes',
  //   // 'Radiant Rovers',
  //   // 'Emerald Elite',
  //   // 'Sapphire Storms',
  //   // 'Mystic Monarchs',
  //   // 'Shadow Sharks',
  //   // 'Moonstone Mercenaries',
  //   // 'Starwood Stormers',
  //   // 'Golden Griffins',
  //   // 'Moonlit Magicians',
  //   // 'Silver Sabres',
  //   // 'Fae Flyers',
  //   // 'Nimble Nightingales',
  //   // 'Serene Sorcerers',
  //   // 'Shadow Slayers',
  //   // 'Mystic Mystics',
  //   // 'Phoenix Phantoms',
  //   // 'Arcane Arrows',
  //   // 'Twilight Titans',
  //   // 'Enchanted Enigmas',
  //   // 'Celestial Cavaliers',
  //   // 'Elven Enforcers',
  //   // 'Forest Falcons',
  //   // 'Radiant Renegades',
  //   // 'Emerald Eagles',
  //   // 'Sapphire Stallions',
  //   // 'Mystic Mariners',
  //   // 'Moonstone Marauders',
  //   // 'Starwood Soldiers',
  //   // 'Golden Gladiators',
  //   // 'Moonlit Mavericks',
  //   // 'Silver Serpents',
  //   // 'Fae Flames',
  //   // 'Arcane Assassins',
  //   // 'Twilight Tornadoes',
  //   // 'Enchanted Emperors',
  //   // 'Nimble Navigators',
  //   // 'Mystic Mages',
  //   // 'Phoenix Pharaohs',
  //   // 'Celestial Chargers',
  //   // 'Forest Fury',
  //   // 'Radiant Raptors',
  //   // 'Emerald Elite',
  //   // 'Sapphire Squalls',
  //   // 'Mystic Mariners',
  //   // 'Shadow Scouts',
  //   // 'Moonstone Mariners',
  //   // 'Starwood Strikers',
  //   // 'Golden Griffons',
  //   // 'Moonlit Marauders',
  //   // 'Silver Scorpions',
  //   // 'Fae Flyers',
  //   // 'Nimble Nymphs',
  //   // 'Serene Sylphs',
  //   // 'Shadow Snipers',
  //   // 'Mystic Monks',
  //   // 'Phoenix Flames',
  //   // 'Arcane Archers',
  //   // 'Twilight Thunder',
  //   // 'Enchanted Emissaries',
  //   // 'Celestial Crusaders',
  //   // 'Elven Elders',
  //   // 'Forest Furies',
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
  //   // 'Knight Owls',
  //   // 'Lunar Stallions',
  //   // 'Majestic Griffins',
  //   // 'Noble Knights',
  //   // 'Ocean Storm',
  //   // 'Prairie Stallions',
  //   // 'Radiant Suns',
  //   // 'Royal Warriors',
  //   // 'Sapphire Panthers',
  //   // 'Thunder Hawks',
  //   // 'Unity Lions',
  //   // 'Valiant Knights',
  //   // 'Wild Stallions',
  //   // 'Xenon Crusaders',
  //   // 'Yellow Jackets',
  //   // 'Zealous Lions',
  //   // 'Apex Predators',
  //   // 'Bold Bears',
  //   // 'Challenger Sharks',
  //   // 'Dynamic Dragons',
  //   // 'Endurance Rhinos',
  //   // 'Fierce Falcons',
  //   // 'Gladiator Warriors',
  //   // 'Honorable Huskies',
  //   // 'Iron Titans',
  //   // 'Jubilant Jaguars',
  //   // 'King Cobras',
  //   // 'Lucky Leopards',
  //   // 'Mighty Moose',
  //   // 'Nimble Gazelles',
  //   // 'Onyx Panthers',
  //   // 'Proud Pumas',
  //   // 'Radiant Raptors',
  //   // 'Silver Sharks',
  //   // 'Titanic Turtles',
  //   // 'Untamed Lions',
  //   // 'Vicious Vultures',
  //   // 'Winged Warriors',
  //   // 'Xenial Lions',
  //   // 'Yellowstone Eagles',
  //   // 'Zealot Zebras',
  //   // 'Aurora Angels',
  //   // 'Blaze Blazers',
  //   // 'Celtic Knights',
  //   // 'Divine Defenders',
  //   // 'Electric Eels',
  //   // 'Fortune Fighters',
  //   // 'Glorious Gladiators',
  //   // 'Heroic Hawks',
  //   // 'Ironclad Iguanas',
  //   // 'Jovial Jaguars',
  //   // 'Knockout Kings',
  //   // 'Lone Wolves',
  //   // 'Majestic Mustangs',
  //   // 'Noble Nighthawks',
  //   // 'Orbiting Owls',
  //   // 'Phoenix Flames',
  //   // 'Rapid Runners',
  //   // 'Sonic Storm',
  //   // 'Triumphant Trojans',
  //   // 'Ultimate Unicorns',
  //   // 'Valorous Vipers',
  //   // 'Wild Wolverines',
  //   // 'Xenogenic Xenops',
  //   // 'Yellowtail Yaks',
  //   // 'Zeppelin Zealots',
  //   // 'Astral Avengers',
  //   // 'Battling Bison',
  //   // 'Charming Cheetahs',
  //   // 'Dreaming Dragons',
  //   // 'Enigma Elephants',
  //   // 'Fabled Foxes',
  //   // 'Glorious Gazelles',
  //   // 'Hazy Hornets',
  //   // 'Iron Eagles',
  //   // 'Jungle Jaguars',
  //   // 'Kingly Kangaroos',
  //   // 'Lionhearted Lions',
  //   // 'Midnight Mavericks',
  //   // 'Nebula Navigators',
  //   // 'Ornery Ostriches',
  //   // 'Pegasus Pioneers',
  //   // 'Quicksilver Quails',
  //   // 'Raging Rams',
  //   // 'Stalwart Stallions',
  //   // 'Terrific Tornadoes',
  //   // 'Underdog Unicorns',
  //   // 'Victorious Vultures',
  //   // 'Whirlwind Warriors',
  //   // 'Xenophobic Xerus',
  //   // 'Yellow-billed Yellowhammers',
  //   // 'Zen Zephyrs',
  // ];

  // const dwarfTeams = [
  //   'Ironbeards FC',
  //   'Mithril Miners',
  //   'Stonehewers',
  //   'Orcslayers United',
  //   'Dragonfire FC',
  //   'Thundering Hammers',
  //   'Goldvein FC',
  //   'Grimstone Giants',
  //   'Deepdelvers',
  //   'Blackforge United',
  //   // 'Frostbeard FC',
  //   // 'Mountain Kings',
  //   // 'Hearthguard FC',
  //   // 'Glimmering Golds',
  //   // 'Runeaxe United',
  //   // 'Doomhammers',
  //   // 'Diamond Dwarves',
  //   // 'Fireforge FC',
  //   // 'Bloodstone United',
  //   // 'Bronzebeards',
  //   // 'Shadowminers',
  //   // 'Bitterbrew FC',
  //   // 'Molten Maulers',
  //   // 'Silver Shields',
  //   // 'Craghoppers',
  //   // 'Ironfoot United',
  //   // 'Stoneguard FC',
  //   // 'Rockpickers',
  //   // 'Crystal Crushers',
  //   // 'Flamebeard United',
  //   // 'Gemcutters FC',
  //   // 'Hardrock Hooligans',
  //   // 'Mithral Marvels',
  //   // 'Netherstone FC',
  //   // 'Thunderstrike United',
  //   // 'Onyx Obliterators',
  //   // 'Dragonspur FC',
  //   // 'Steelshanks',
  //   // 'Goldbloods United',
  //   // 'Grumblebellys',
  //   // 'Deepearth FC',
  //   // 'Blackrock Blades',
  //   // 'Frostclan United',
  //   // 'Mountain Men',
  //   // 'Forgefire FC',
  //   // 'Bloodaxe United',
  //   // 'Bronzeguards',
  //   // 'Shadowstrike FC',
  //   // 'Boulderbreakers',
  //   // 'Molten Makers',
  //   // 'Silverbeards',
  //   // 'Cragtoppers',
  //   // 'Ironclad United',
  //   // 'Stonewall FC',
  //   // 'Rockroasters',
  //   // 'Crystal Cleavers',
  //   // 'Firebelly United',
  //   // 'Gembusters FC',
  //   // 'Hardstone Hitters',
  //   // 'Mithril Mavericks',
  //   // 'Nethertunnels FC',
  //   // 'Thunderthumpers',
  //   // 'Obsidian Ogres',
  //   // 'Dragonwing FC',
  //   // 'Steelstorm',
  //   // 'Goldgear United',
  //   // 'Goblinbashers',
  //   // 'Deepmines FC',
  //   // 'Blackrock Bruisers',
  //   // 'Frostfire United',
  //   // 'Mountain Dwarves',
  //   // 'Forgefist FC',
  //   // 'Bloodiron United',
  //   // 'Bronzecrests',
  //   // 'Shadowstrike United',
  //   // 'Boulderbreakers',
  //   // 'Molten Metalheads',
  //   // 'Silvermines',
  //   // 'Cragclimbers',
  //   // 'Ironstone United',
  //   // 'Stonemount FC',
  //   // 'Rocksmashers',
  //   // 'Crystal Cutters',
  //   // 'Firestorm United',
  //   // 'Gembusters FC',
  //   // 'Hardhammer Hitters',
  //   // 'Mithril Maulers',
  //   // 'Nethershaft FC',
  //   // 'Thunderous Thumpers',
  //   // 'Obsidian Outlaws',
  //   // 'Dragonbreath FC',
  //   // 'Steelshields',
  //   // 'Goldgear Giants',
  //   // 'Goblingrinders',
  //   // 'Deepshaft FC',
  //   // 'Blackrock Barbarians',
  //   // 'Frostbeard Fury',
  //   // 'Mountain Movers',
  //   // 'Forgefighters FC',
  //   // 'Bloodsteel United',
  //   // 'Bronzetop',
  //   // 'Shadowfists',
  //   // 'Boulderbashers',
  //   // 'Molten Mercenaries',
  //   // 'Silverstars',
  //   // 'Cragclimbers',
  //   // 'Ironwall United',
  //   // 'Stonecrushers FC',
  // ];

  // const orcTeams = [
  //   'Bloodscreamers',
  //   'Skullcrushers',
  //   'Bonebreakers',
  //   'Ironfists',
  //   'Razorclaws',
  //   'Frostbiters',
  //   'Chaosbringers',
  //   'Deathshadows',
  //   'Thunderbolts',
  //   'Fireblades',
  //   // 'Shadowstalkers',
  //   // 'Demonwings',
  //   // 'Flamefists',
  //   // 'Doomguards',
  //   // 'Nightbringers',
  //   // 'Stormcallers',
  //   // 'Deathstrikers',
  //   // 'Skulltakers',
  //   // 'Bonechewers',
  //   // 'Bloodguzzlers',
  //   // 'Gorehowlers',
  //   // 'Deathravens',
  //   // 'Frostfury',
  //   // 'Crimsonkillers',
  //   // 'Fearsome',
  //   // 'Dreadlords',
  //   // 'Darkblades',
  //   // 'Wrathweavers',
  //   // 'Slayers',
  //   // 'Ravagers',
  //   // 'Berserkers',
  //   // 'Wargods',
  //   // 'Hellfire',
  //   // 'Dreadclaws',
  //   // 'Shadowweavers',
  //   // 'Terrorblades',
  //   // 'Soulflayers',
  //   // 'Chaosseekers',
  //   // 'Bloodfury',
  //   // 'Doomhammers',
  //   // 'Nightstalkers',
  //   // 'Deathblades',
  //   // 'Ironjaw',
  //   // 'Bonegrinders',
  //   // 'Skullsmashers',
  //   // 'Thunderhooves',
  //   // 'Firefists',
  //   // 'Demonbloods',
  //   // 'Flamecallers',
  //   // 'Doomriders',
  //   // 'Nightshades',
  //   // 'Stormravens',
  //   // 'Bloodrages',
  //   // 'Shadowclaws',
  //   // 'Deathstorm',
  //   // 'Frostbites',
  //   // 'Chaoslords',
  //   // 'Skulldevils',
  //   // 'Bonewraiths',
  //   // 'Ironshields',
  //   // 'Razorfury',
  //   // 'Flameseekers',
  //   // 'Thunderaxes',
  //   // 'Firehunters',
  //   // 'Demonrunners',
  //   // 'Doomblades',
  //   // 'Nightshadows',
  //   // 'Stormrages',
  //   // 'Bloodhunters',
  //   // 'Shadowguards',
  //   // 'Deathfury',
  //   // 'Frostfangs',
  //   // 'Chaoscrushers',
  //   // 'Skullbrawlers',
  //   // 'Boneguardians',
  //   // 'Ironbreakers',
  //   // 'Razorbites',
  //   // 'Flamehunters',
  //   // 'Thunderfury',
  //   // 'Firestalkers',
  //   // 'Demonfury',
  //   // 'Doombringers',
  //   // 'Nightblades',
  //   // 'Stormweavers',
  //   // 'Bloodsoul',
  //   // 'Shadowreapers',
  //   // 'Deathsmashers',
  //   // 'Frostfist',
  //   // 'Chaosstrike',
  //   // 'Skullhunters',
  //   // 'Bonecrushers',
  //   // 'Ironfury',
  //   // 'Razorclaws',
  //   // 'Flameshadows',
  //   // 'Thunderstrike',
  //   // 'Firedemons',
  //   // 'Demonstrike',
  //   // 'Doomguards',
  //   // 'Nightstrike',
  //   // 'Stormbringers',
  //   // 'Bloodblades',
  //   // 'Shadowcrushers',
  //   // 'Deathrage',
  //   // 'Frostlords',
  //   // 'Chaosbrutes',
  //   // 'Skullwarriors',
  //   // 'Bonepiercers',
  //   // 'Ironaxes',
  //   // 'Razorfangs',
  //   // 'Flamedevils',
  //   // 'Thunderwarriors',
  //   // 'Firedrakes',
  //   // 'Demonbrutes',
  //   // 'Doomstrikers',
  //   // 'Nightthunder',
  //   // 'Stormscreamers',
  // ];

  // const allTeams = elfTeamNames
  //   .slice(0, 10)
  //   .concat(
  //     humanTeams.slice(0, 10),
  //     dwarfTeams.slice(0, 10),
  //     orcTeams.slice(0, 10)
  //   );

  // const myArray = [
  //   'L01wQw2sAvamv7rJUu0J',
  //   'bX8OyThgrItcYjcXeOgd',
  //   'hQvQNIUPAI0HjDSz6Jq4',
  //   'lfZpimIRKDaNNU6mTMDw',
  // ];

  // const maxSelections = 10;
  // const counter = {};

  // myArray.forEach((item) => {
  //   counter[item] = 0;
  // });

  // const handleAddTeam = async () => {
  //   function getRandomItem() {
  //     const availableItems = myArray.filter(
  //       (item) => counter[item] < maxSelections
  //     );

  //     const randomIndex = Math.floor(Math.random() * availableItems.length);

  //     const chosenItem = availableItems[randomIndex];
  //     counter[chosenItem]++;

  //     return chosenItem;
  //   }

  //   allTeams.forEach(async (team) => {
  //     await fetch(fixUrl('/teams/populate'), {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ teamName: team, divisionID: getRandomItem() }),
  //     });
  //   });
  // };

  // const updatedTeamsArray = teams.map((team) => {
  //   // const matchedTeam = divisions.find(({ id }) => id === team.divisionID);
  //   const matchedTeam = 'L01wQw2sAvamv7rJUu0J' === team.divisionID;
  //   console.log(matchedTeam);
  //   return matchedTeam ? { ...team, divisionID: 'Imperial League' } : team;
  // });

  // console.log('Players: ', players);

  return (
    <Page pageTitle={t('pageTitles.squad')}>
      {!players ? (
        <div className={styles.isLoading}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <ItemHeadings
              heading={t('pageTitles.squad')}
              subHeading={
                userTeam ? userTeam.teamName : t('error.teamNotFound')
              }
              hasButton={t('general.edit')}
            />
          </div>
          <div className={styles.playersWrapper}>
            {players.map(
              ({
                id,
                name,
                position,
                number,
                artefacts,
                salary,
                matchForm,
                race,
                injuryLevel,
              }) => (
                <PlayerTemplate
                  key={id}
                  id={id}
                  name={name}
                  position={position[0].position}
                  number={number}
                  artefacts={artefacts}
                  salary={salary}
                  matchForm={matchForm}
                  race={race}
                  injuryLevel={injuryLevel}
                />
              )
            )}
          </div>
        </>
      )}
      {/* {updatedTeamsArray.map(
        ({ id, teamName, divisionID }) =>
          divisionID === 'Imperial League' && (
            <div key={id}>
              <h3>Team name: {teamName}</h3>
              <p>{divisionID}</p>
            </div>
          )
      )} */}
      {/* <button disabled onClick={handleAddTeam}>
        Add teams
      </button> */}
    </Page>
  );
};

export default Squad;
