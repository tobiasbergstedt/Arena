import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import throttle from 'lodash.throttle';
import { useNavigate } from 'react-router-dom';

import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';

import Copyright from 'components/Copyright/Copyright';
import InputTextNew from 'components/inputs/InputText/InputTextNew';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import HoverText from 'components/HoverText/HoverText';
import Button from 'components/Button/Button';
import Select from 'components/inputs/Select/Select';

import { ReactComponent as ArrowBack } from 'assets/icons/arrow-back.svg';

import styles from './Login.module.scss';
import { UserContext } from 'context/UserContext';
import {
  createUserWithEmailAndPassword,
  // sendEmailVerification,
  // updateProfile,
} from 'firebase/auth';
import { auth } from 'api/firebase';
import Spinner from 'components/Spinner/Spinner';

const Login = () => {
  const [inputData, setInputData] = useState({ userName: '', password: '' });
  const [signupInputData, setSignupInputData] = useState({
    teamName: '',
    race: '',
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    confirmEmail: '',
    termsAndConditions: false,
  });
  const [displayError, setDisplayError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin } = useContext(UserContext);
  const [agreement, setAgreement] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === MOBILE;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const createTeam = async () => {
    setDisplayError('');
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        signupInputData.email,
        signupInputData.password
      ).catch((error) => {
        setDisplayError(error.message);
      });
      // await sendEmailVerification(auth.currentUser).catch((error) => {
      //   setDisplayError(error.message);
      // });
      // await updateProfile(auth.currentUser, {
      //   displayName: signupInputData.userName,
      // }).catch((error) => {
      //   setDisplayError(error.message);
      // });
      setLoading(false);
      if (auth.currentUser) {
        navigate('landing');
      }
    } catch (error) {
      setLoading(false);
      setDisplayError(error.message);
    }
  };

  const handleSignin = async () => {
    setDisplayError('');
    try {
      setLoading(true);
      await signin(inputData.userName, inputData.password);
      setLoading(false);
      navigate('landing');
    } catch (error) {
      setLoading(false);
      setDisplayError(error.message);
      console.log(error.message);
    }
  };

  const signUpInputs = [
    {
      value: signupInputData.teamName,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, teamName: data.value });
      },
      label: t('login.inputs.teamName'),
    },
    {
      value: signupInputData.userName,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, userName: data.value });
      },
      label: t('login.inputs.userName'),
    },
    {
      value: signupInputData.password,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, password: data.value });
      },
      label: t('login.inputs.password'),
    },
    {
      value: signupInputData.confirmPassword,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, confirmPassword: data.value });
      },
      label: t('login.inputs.confirmPassword'),
    },
    {
      value: signupInputData.email,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, email: data.value });
      },
      label: t('login.inputs.email'),
    },
    {
      value: signupInputData.confirmEmail,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, confirmEmail: data.value });
      },
      label: t('login.inputs.confirmEmail'),
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      handleSignin();
    }
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 50);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const selectValues = {
    options: [
      t('login.races.humans'),
      t('login.races.elves'),
      t('login.races.dwarves'),
      t('login.races.orcs'),
    ],
    label: t('login.races.race'),
  };

  const animVariants = {
    initial: { x: `${windowWidth}px`, opacity: 0 },
    visible: {
      x: '0px',
      opacity: 1,
      transition: { duration: 1 },
    },
    after: { x: `${windowWidth}px`, opacity: 0, transition: { duration: 1 } },
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      key="pageWrapper"
      className={styles.innerWrapper}
    >
      <div className={styles.welcomeWrapper}>
        <h2>{t('login.welcome')}</h2>
        <h1 className={styles.headingTitle}>{t('arena')}</h1>
        {isMobile ? (
          <div className={styles.infoButton}>
            <p>{t('login.information')}</p>
          </div>
        ) : (
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            corporis autem accusamus exercitationem, similique doloremque
            commodi nam ipsum ea unde impedit labore animi repudiandae
            accusantium aliquam in ex, repellendus ipsa! Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Laudantium, in natus, ipsam
            ratione excepturi aperiam sit, reiciendis magni tempora quam nobis.
            Eos suscipit aut cumque quam veniam quia aliquid autem! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Deleniti id aut
            provident eligendi accusamus eum non ullam necessitatibus numquam,
            earum aliquam sed, officiis ipsa obcaecati quisquam eaque vel facere
            quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae tempora cupiditate eaque! Accusantium delectus in ut
            fugiat corporis ea aliquid quam quae esse sapiente natus explicabo,
            mollitia eum amet ullam.
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {isSignIn ? (
          <motion.div
            key={'signinWrapper'}
            variants={animVariants}
            initial="initial"
            animate="visible"
            exit="after"
            className={styles.signinWrapper}
          >
            <h2 className={styles.signIn}>{t('login.signIn')}</h2>
            <InputTextNew
              value={inputData.value}
              onChange={(data) => {
                setInputData({ ...inputData, userName: data.value });
              }}
              onKeyDown={() => handleKeyPress(event)}
              label={t('profilePage.profileInfo.usernameLabel')}
            />
            <InputTextNew
              type="password"
              value={inputData.value}
              onChange={(data) => {
                setInputData({ ...inputData, password: data.value });
              }}
              onKeyDown={() => handleKeyPress(event)}
              label={t('profilePage.profileInfo.passwordLabel')}
            />
            <div className={styles.optionsWrapper}>
              <CheckBox
                onChange={(event) => {
                  setAgreement(event.target.checked);
                }}
                onClick={() => {
                  setAgreement(!agreement);
                }}
                agreement={agreement}
                text={t('login.rememberMe')}
              />
              <HoverText text={t('login.forgotPassword')} />
            </div>
            <div className={styles.buttonsWrapper}>
              {loading && (
                <div className={styles.loadingLogin}>
                  <Spinner />
                </div>
              )}
              {displayError && <p>{displayError}</p>}
              <Button onClick={handleSignin}>{t('login.signIn')}</Button>
              <p>{t('login.or')}</p>
              <Button
                isRegister
                onClick={() => {
                  setIsSignIn(false);
                }}
              >
                {t('login.getYourOwn')}
              </Button>
            </div>
            <Copyright />
          </motion.div>
        ) : (
          <motion.div
            key={'signupWrapper'}
            variants={animVariants}
            initial="initial"
            animate="visible"
            exit="after"
            className={styles.signupWrapper}
          >
            <div className={styles.headingWrapper}>
              <h2>{t('login.signUp')}</h2>
              <ArrowBack
                className={styles.arrowBack}
                onClick={() => {
                  setIsSignIn(true);
                }}
              />
            </div>
            <Select
              value={signupInputData.race}
              options={selectValues.options}
              onChange={(data) => {
                setSignupInputData({ ...inputData, race: data });
              }}
              label={selectValues.label}
            />
            {signUpInputs.map(({ onChange, label, value }, index) => (
              <InputTextNew
                key={label + index}
                value={value}
                onChange={onChange}
                onKeyDown={() => handleKeyPress(event)}
                label={label}
              />
            ))}
            <div className={styles.optionsWrapper}>
              <CheckBox
                isLarge
                onChange={(event) => {
                  setAcceptTermsAndConditions(event.target.checked);
                }}
                onClick={() => {
                  setAcceptTermsAndConditions(!acceptTermsAndConditions);
                }}
                agreement={acceptTermsAndConditions}
              />
              <p
                onClick={() => {
                  setAcceptTermsAndConditions(!acceptTermsAndConditions);
                }}
              >
                {t('login.iAccept')}
                <span className={styles.underLine}>
                  {t('login.termsAndConditions')}
                </span>{' '}
                {t('login.asWellAs')}
              </p>
            </div>
            {loading && (
              <div className={styles.loading}>
                <Spinner />
              </div>
            )}
            {displayError && <p>{displayError}</p>}
            <div className={styles.buttonsWrapper}>
              <Button onClick={createTeam}>{t('login.createTeam')}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;
