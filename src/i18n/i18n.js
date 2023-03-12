import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      sv: {
        translation: {
          global: {
            countryCode: '+46',
            countryAbbr: 'sv',
          },
          menu: {
            overview: 'Översikt',
            map: 'Hem',
            beneficiary: 'Engagemang',
            profile: 'Profil',
            places: 'Platser',
          },
          splashScreen: {
            heading: 'Välkommen till',
            loadingText: 'Laddar din pangeovärld...',
          },
          login: {
            openBankIDHeading: 'Öppna BankID',
            openBankIDText:
              'Fortsätt genom att öppna appen BankID på din mobil eller dator.',
            openBankIDButton: 'Öppna appen BankID',
            openDevLoginButton: 'Dev Login',
            welcomeHeading: 'Välkommen till Pangeo',
            welcomeBackHeading: 'Välkommen tillbaka',
            logIn: 'Logga in',
            createAccount: 'Skapa konto',
            newUser: 'Ny användare',
            recurringUser: 'Jag har redan ett konto',
            almostDoneHeading: 'Strax klart',
            almostDoneText:
              'Vi har nu skapat en profil åt dig. Fyll i några enkla kompletterande uppgifter för att börja spela.',
            continue: 'Fortsätt',
          },
          modals: {
            testModal: {
              heading: 'Test modal',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
          },
          mapPage: {
            heading: 'Map',
            loadUser: 'Load user',
          },
          homePage: {
            logIn: 'Logga in',
            logInLater: 'Logga in senare',
            searchSheet: {
              label: 'Sök plats i Pangeo',
              placeholder: 'Sök på ort, gata etc.',
              previousSearches: 'Tidigare sökningar',
              noResults: 'Inget sökresultat',
            },
          },
          overviewPage: {
            heading: 'Overview',
            setUserToken: 'Set userToken',
            logout: 'Logout user',
          },
          beneficiaryPage: {
            heading: 'Beneficiary',
            showModal: 'Show Modal',
          },
          profilePage: {
            editProfile: 'Redigera profil',
            logIn: 'Logga in',
            createAccount: 'Bli medlem',
            walletSection: {
              myWallet: 'Min plånbok',
              viewTransactions: 'Se alla transaktioner',
              balance: 'Saldo',
            },
            menu: {
              settingsHeader: 'Inställningar',
              personalInfo: 'Personlig info',
              notifications: 'Notifikationer',
              payments: 'Betalningar',
              gameLimits: 'Spelgränsningar',
              gameStop: 'Spelstopp',
              helpHeader: 'Hjälp',
              needHelp: 'Behöver du hjälp?',
              whatDoYouThinkAboutUs: 'Vad tycker du om oss?',
              legalHeader: 'Juridiskt',
              thisIsPangeo: 'Det här är Pangeo',
              gamePlan: 'Vinstplan',
              winners: 'Vinnare',
              userAgreement: 'Användarvillkor',
              integrityPolicy: 'Integritetspolicy',
            },
            personalInfo: {
              label: 'Personlig information',
              name: 'Förnamn och efternamn',
              mobilePhone: 'Mobilnummer',
              add: 'Lägg till',
              addText:
                'Lägg till ditt mobilnummer för att vi enkelt kan lorem ipsum dolor sit amet.',
              edit: 'Ändra',
              editText:
                'Ändra ditt mobilnummer nedan för att vi enkelt ska kunna lorem ipsum dolor.',
              deleteAccount: 'Radera konto',
              deleteHeading: 'Radera för gott?',
              deleteText:
                'Är du säker på att du vill radera ditt konto? Genom att radera ditt konto kommer du permanent bli av med din profil och din vinsthistorik. ',
              deleteTextWarning: 'Det här går inte att ångra.',
              goBackHeading: 'Gå bakåt utan att spara?',
              goBackText:
                'Välj avbryt om du vill gå tillbaka och spara. Annars går dina ändringar förlorade.',
              activePinsText:
                'Du har aktiva pins för den här veckans dragning. ',
              creditsInWalletText: 'Du har krediter kvar i din spelplånbok. ',
              makeSureText:
                'Innan du kan radera ditt konto, se till att du varken har några aktiva pins eller krediter kvar i din spelplånbok.',
              cancel: 'Avbryt',
              confirm: 'Ja, radera',
              dontSave: 'Spara inte',
              close: 'Stäng',
              verifyButton: 'Verifiering av mobilnummer',
              verificationSent: 'Vi har skickat en verifieringskod till',
              sendNewCodeButton: 'Skicka ny kod',
              noCodeText:
                'Om du inte fått någon kod inom 30 sekunder kan vi skicka ny kod.',
            },
            profileInfo: {
              usernameLabel: 'Användarnamn',
              swapImageButton: 'Byt bild',
              editNameMessage:
                'En kombination av bokstäver och siffror samt ett specialtecken, så som ".” “-” “_", är tillåtet. Se till att du inte använder några blanksteg.',
              save: 'Spara',
              cancel: 'Avbryt',
              imageCropInformation: 'Du kan nu zooma eller flytta din bild',
              imageUpdatedMessage: 'Din profilbild är uppdaterad',
            },
          },
          cookieBanner: {
            heading: 'Acceptera cookies?',
            text: 'Genom att klicka på “Acceptera” samtycker du till lagring av cookies på din enhet för att förbättra navigeringen på webbplatsen och analysera webbplatsens användning.',
            accept: 'Acceptera',
            decline: 'Neka',
          },
          inputs: {
            inputPersonalId: {
              personalId: 'Personal number (YYMMDDXXXX)',
              label: 'Personnr. (ÅÅMMDDXXXX)',
              placeholder: 'Personal number',
            },
            inputEmail: {
              label: 'Email adress',
              placeholder: 'Email',
            },
            inputPhone: {
              placeholder: 'phone number',
            },
          },
          gameTopBar: {
            gameBreak: 'Spelpaus',
            selfTest: 'Självtest',
            gameLimits: 'Spelgränser',
          },
          countDown: {
            gameStart: 'Vi är live om',
            prizeValue: 'Storkovan idag:',
          },
        },
      },
    },
  });

export default i18n;
