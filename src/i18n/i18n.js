import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          arena: 'Arena',
          global: {
            countryCode: '+46',
            countryAbbr: 'sv',
            localeString: 'sv-SE',
            loading: 'Loading...',
            gold: 'gold',
          },
          pageTitles: {
            home: 'Start',
            squad: 'Squad',
            player: 'Player',
            marketplace: 'Marketplace',
            sellPlayer: 'Sell Player',
            tactics: 'Tactics',
          },
          error: {
            teamNotFound: 'Team name not found.',
          },
          copyright: {
            copyright: 'Copyright',
            copyrightSymbol: '©',
            copyrightHolder: '2023, Tobias Bergstedt',
          },
          menu: {
            lastGame: 'Last game - ',
            nextGame: 'Next game - ',
            vs: 'vs',
            gameMenu: 'Game menu',
            home: 'Home',
            myClub: 'My Club',
            finances: 'Finances',
            league: 'League',
            games: 'Games',
            squad: 'Squad',
            practise: 'Practise',
            tactics: 'Tactics',
            scouting: 'Scouting',
            physician: 'Physician',
            magician: 'Magician',
            marketplace: 'Marketplace',
            artefacts: 'Artefacts',
            stadium: 'Stadium',
            graveyard: 'Graveyard',
            guru: 'Guru',
            aboutMenu: 'About the game',
            betting: 'Betting',
            lore: 'Lore',
            rules: 'Rules',
            buyCoins: ' Buy Coins',
            search: 'Search',
            contact: 'Contact',
          },
          communityChat: {
            title: 'Community chat',
            inputPlaceholder: 'Type your message here...',
          },
          login: {
            welcome: 'Welcome to',
            information: 'i',
            gameDescription1:
              'Arena is a manager game in a fantasy setting. Join the fight with the other teams with the ambition to raise the Koodudorf Cup.',
            gameDescription2:
              'In the game, you can choose between 4 races for your team - Humans, Dwarves, Elves and Orcs. You can buy and sell players and artefacts. Hire coaches and magicians, make tactical moves in preparition for the games, as well as take part in all else that occurs in this magical world called Mambenna.',
            gameDescription3:
              'You don’t have to download anything to play, just use your browser to take part. It’s completely free to play.',
            gameDescription4:
              'If you have any questions, feel free to contact us at: ',
            contact: 'info@playthearena.com',
            signIn: 'Sign in',
            signUp: 'Sign up',
            rememberMe: 'Remember me',
            forgotPassword: 'Forgot password?',
            or: 'or',
            getYourOwn: 'Get your very own team!',
            races: {
              race: 'Race',
              humans: 'Humans',
              elves: 'Elves',
              dwarves: 'Dwarves',
              orcs: 'Orcs',
            },
            inputs: {
              teamName: 'Team name',
              userName: 'User name',
              password: 'Password',
              confirmPassword: 'Confirm password',
              email: 'Email',
              confirmEmail: 'Confirm email',
            },
            iAccept: 'I accept the ',
            termsAndConditions: 'terms and conditions',
            asWellAs: 'as well as the handling of personal information.',
            createTeam: 'Create team',
          },
          termsAndConditions: {
            heading: 'Terms and Conditions',
            text: `These Terms and Conditions ("Agreement") govern your use of Arena Inc.'s services and website ("Services"). By accessing or using our Services, you agree to be bound by this Agreement. If you do not agree with any part of these terms, please refrain from using our Services.`,
            listItem1: {
              subHeading: '1. Acceptance of Terms',
              subItem1:
                '1.1 By accessing or using our Services, you affirm that you are of legal age and have the capacity to enter into a binding agreement. If you are accessing our Services on behalf of a company or organization, you represent that you have the authority to bind such entity to this Agreement.',
              subItem2:
                '1.2 We reserve the right to modify or update these Terms and Conditions at any time without prior notice. By continuing to use our Services after any changes, you accept and agree to the revised terms.',
            },
            listItem2: {
              subHeading: '2. Intellectual Property',
              subItem1:
                '2.1 All content, materials, and trademarks on our website are the intellectual property of Arena Inc. or its licensors. You may not reproduce, modify, distribute, or exploit any content from our Services without prior written permission from us.',
              subItem2:
                '2.2 You retain ownership of any content you submit or transmit through our Services. However, by submitting or transmitting such content, you grant Arena Inc. a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display it for the purpose of providing our Services.',
            },
            listItem3: {
              subHeading: '3. Use of Services',
              subItem1:
                '3.1 You agree to use our Services in compliance with all applicable laws and regulations. You are solely responsible for your use of our Services and any consequences that may arise from it.',
              subItem2:
                '3.2 You must not engage in any activity that may interfere with or disrupt the functionality of our Services or compromise the security of our systems.',
              subItem3:
                '3.3 Arena Inc. reserves the right to suspend or terminate your access to our Services if we reasonably believe that you have violated these Terms and Conditions or engaged in any illegal or unauthorized activities.',
            },
            listItem4: {
              subHeading: '4. Privacy',
              subItem1:
                '4.1 We collect and process personal data in accordance with our Privacy Policy, which forms an integral part of this Agreement.',
              subItem2:
                '4.2 By using our Services, you consent to the collection, storage, and processing of your personal data as outlined in our Privacy Policy.',
            },
            listItem5: {
              subHeading: '5. Limitation of Liability',
              subItem1:
                '5.1 To the fullest extent permitted by applicable law, Arena Inc. and its officers, directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our Services.',
              subItem2:
                '5.2 Arena Inc. shall not be liable for any loss, damage, or disruption to your computer systems or data resulting from the use of our Services.',
              subItem3:
                '5.3 We do not warrant or guarantee the accuracy, completeness, or reliability of any content on our website or obtained through our Services.',
            },
            listItem6: {
              subHeading: '6. Governing Law and Jurisdiction',
              subItem1:
                '6.1 This Agreement shall be governed by and construed in accordance with the laws of Sweden. Any disputes arising out of or relating to this Agreement shall be subject to the exclusive jurisdiction of the courts located in Göteborg, Sweden.',
            },
            listItem7: {
              subHeading: '7. Severability',
              subItem1:
                '7.1 If any provision of this Agreement is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.',
            },
          },
          landing: {
            online: 'online',
            world: 'World',
            news: 'News',
            readMore: 'Read more',
            moreNews: 'More news',
            leaguePosition: 'League position',
            wins: 'W',
            draws: 'D',
            losses: 'L',
            plusMinus: '+/-',
            points: 'P',
          },
          general: {
            edit: 'Edit',
            return: 'Return',
          },
          errorMessages: {
            alreadyHighestBidder: 'You already have the highest bid.',
            bidMustBeHigher: 'Your bid must be higher than the current bid.',
            successful:
              'Your bid was registered successfully, congratulations!',
          },
          playerProfile: {
            salary: 'Salary',
            bid: 'Bid',
            matchForm: 'Match form',
            injuryLevel: 'Injury level',
            attributes: 'Attributes',
            round: 'Round',
            attempts: 'Attempts',
            successful: 'Successful',
            stats: 'Stats',
            ranking: 'Ranking',
            personal: 'Personal',
            statistics: 'Statistics',
            bestSuited: 'Best suited',
            positions: 'Positions',
            transfer: 'Transfer',
            history: 'History',
            team: 'Team',
            cityOfOrigin: 'City of origin',
            from: 'From',
            to: 'To',
            sum: 'Sum',
            loyalHistory:
              '{{playerName}} has been loyal to {{teamName}} for his entire career, after being brought up from the clubs youth department.',
            release: 'Release',
            confirmDelete:
              'Are you sure you want to release {{playerName}}? This action is irreversible. The player will be lost forever.',
            sell: 'Sell',
            transferListInfo:
              'When placed on the transfer list, the player will be sold after deadline has passed. Unless no bids comes in, in which case {{playerName}} will remain at your club.',
            endDateInfo: '7 days from now',
            transferInfo: 'Transfers go through every hour',
            startingBid: 'Starting bid',
          },
          buttons: {
            confirm: 'Confirm',
            cancel: 'Cancel',
            edit: 'Edit',
          },
          marketplace: {
            heading: 'Search',
            subHeading: 'Transfer list',
            result: 'result',
            results: 'results',
            placeBid: 'Place bid',
            newBid: 'New bid',
            highestBid: 'Highest bid:',
            deadline: 'Deadline:',
            description:
              'Leave fields/dropdowns blank to exclude values from search.',
            resultDescriptionPlayers:
              'Click the arrow on a player to bid or see more information about them.',
            resultDescriptionArtefacts:
              'Click the arrow on an item to show bid input fields.',
            players: 'Players',
            artefacts: 'Artefacts',
            search: 'Search',
            searching: 'Searching',
            races: {
              any: 'Any race',
              human: 'Human',
              elf: 'Elf',
              dwarf: 'Dwarf',
              orc: 'Orc',
            },
            dropdowns: {
              race: 'Race',
              position: 'Position',
              minInjury: 'Min. injury',
              maxInjury: 'Max. injury',
              artefactType: 'Artefact type',
            },
            inputs: {
              minSalary: 'Minimum salary',
              maxSalary: 'Maximum salary',
              minBid: 'Minimum bid',
              maxBid: 'Maximum bid',
            },
            displaying: 'Displaying',
          },
          nextLastGame: {
            teamNotFound: 'Team not found',
          },
          artefacts: {
            any: 'Any artefact',
            amulet: 'Amulet',
            aura: 'Aura',
            cantaniRing: 'Cantani ring',
            gryphonBoots: 'Gryphon boots',
            mithrilArmor: 'Mithril armor',
            shadowBrew: 'Shadow brew',
            siicusTattoo: 'Siicus tattoo',
            short: {
              any: 'anyArtefact',
              amulet: 'amulet',
              aura: 'Aura',
              cantaniRing: 'cantaniRing',
              gryphonBoots: 'gryphonBoots',
              mithrilArmor: 'mithrilArmor',
              shadowBrew: 'shadowBrew',
              siicusTattoo: 'siicusTattoo',
            },
            description: {
              aura: 'Permanent effect',
              amulet: 'Permanent effect',
              cantaniRing: 'Permanent effect',
              gryphonBoots: 'Permanent effect',
              mithrilArmor: 'Permanent effect',
              shadowBrew: 'Temporary effect',
              siicusTattoo: 'Permanent effect',
            },
          },
          positions: {
            any: 'Any position',
            goalkeeper: 'Goalkeeper',
            centralDefender: 'Central defender',
            leftRightDefender: 'Left/right defender',
            centralMidfielder: 'Central midfielder',
            leftRightMidfielder: 'Left/right midfielder',
            centralForward: 'Central forward',
            leftRightForward: 'Left/right forward',
            short: {
              any: 'Any pos.',
              goalkeeper: 'GK',
              centralDefender: 'CD',
              leftRightDefender: 'LD/RD',
              centralMidfielder: 'CM',
              leftRightMidfielder: 'LM/RM',
              centralForward: 'CF',
              leftRightForward: 'LF/RF',
            },
          },
          statistics: {
            goals: 'Goals',
            hoops: 'Hoops',
            intercepts: 'Intercepts',
            assists: 'Assists',
            saves: 'Saves',
            blocks: 'Blocks',
          },
          club: {
            teamInfo: 'Team information',
            league: 'League',
            positions: 'Positions',
            dedicated: 'Dedicated',
            supportersClub: ' Supporters Club',
            stadium: 'Stadium',
            noStadium: ' does not have its own stadium yet.',
            about: 'About the team',
            noAbout: ' has not written anything about this team yet.',
            supporterSize: 'Size',
            supporterExpectations: 'Expectations',
            fanFavorite: 'Fan favourite',
            raceDistribution: 'Race distribution',
            team: 'Team',
            history: 'History',
            player: 'Player',
            awards: 'Awards',
            season: 'Season',
            position: 'Position',
            points: 'Points',
            role: 'Role',
            place: 'Place',
            noAwardsHistory: `doesn't seem to have won any player awards
            yet.`,
            noTeamHistory: `doesn't seem to have any team
            history yet.`,
          },
          cookieBanner: {
            heading: 'Accept cookies?',
            text: 'By clicking “Accept”, you consent to the storage of cookies on your device to improve website navigation and analyze website usage. By declining or deleting cookies, your experience may not be optimal.',
            accept: 'Accept',
            decline: 'Decline',
          },
        },
      },
    },
  });

export default i18n;
