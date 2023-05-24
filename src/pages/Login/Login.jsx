import React, { useContext, useEffect, useState } from 'react';
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
import Modal from 'modals/Modal/Modal';
import clsx from 'clsx';

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
  const { signin, user } = useContext(UserContext);
  const [agreement, setAgreement] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
        setSignupInputData({ ...signupInputData, teamName: data });
      },
      label: t('login.inputs.teamName'),
      type: 'text',
    },
    {
      value: signupInputData.userName,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, userName: data });
      },
      label: t('login.inputs.userName'),
      type: 'text',
    },
    {
      value: signupInputData.password,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, password: data });
      },
      label: t('login.inputs.password'),
      type: 'password',
    },
    {
      value: signupInputData.confirmPassword,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, confirmPassword: data });
      },
      label: t('login.inputs.confirmPassword'),
      type: 'password',
    },
    {
      value: signupInputData.email,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, email: data });
      },
      label: t('login.inputs.email'),
      type: 'text',
    },
    {
      value: signupInputData.confirmEmail,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, confirmEmail: data });
      },
      label: t('login.inputs.confirmEmail'),
      type: 'text',
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      handleSignin();
    }
  };

  const checkIsDisabled = () => {
    if (
      !signupInputData.termsAndConditions ||
      signupInputData.race.length === 0 ||
      signupInputData.teamName.length === 0 ||
      signupInputData.userName.length === 0 ||
      signupInputData.password.length === 0 ||
      signupInputData.confirmPassword.length === 0 ||
      signupInputData.email.length === 0 ||
      signupInputData.confirmEmail.length === 0 ||
      signupInputData.password !== signupInputData.confirmPassword ||
      signupInputData.email !== signupInputData.confirmEmail
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const toggleHover = () => setIsHovered(!isHovered);

  useEffect(() => {
    checkIsDisabled();
  }, [signupInputData]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 50);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/landing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={styles.backgroundWrapper} />
      <div className={styles.welcomeWrapper}>
        <h2>{t('login.welcome')}</h2>
        <h1 className={clsx('goldenText', styles.headingTitle)}>
          {t('arena')}
        </h1>
        {isMobile ? (
          <>
            <div
              className={styles.infoButton}
              onClick={() => setIsModalVisible(true)}
            >
              <p>{t('login.information')}</p>
            </div>
            <AnimatePresence>
              {isModalVisible && (
                <Modal canClose onClick={() => setIsModalVisible(false)}>
                  <div className={styles.modalContent}>
                    <h3 className="goldenText">
                      {t('login.welcome')} {t('arena')}
                    </h3>
                    <p>{t('login.gameDescription1')}</p>
                    <p>{t('login.gameDescription2')}</p>
                    <p>{t('login.gameDescription3')}</p>
                    <p>
                      {t('login.gameDescription4')}
                      <span
                        onMouseEnter={() => toggleHover()}
                        onMouseLeave={() => toggleHover()}
                        onClick={() =>
                          (window.location.href = `mailto:${t(
                            'login.contact'
                          )}`)
                        }
                        className={clsx(styles.contactLink, {
                          ['goldenText']: isHovered,
                        })}
                      >
                        {t('login.contact')}
                      </span>
                    </p>
                  </div>
                </Modal>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div>
            <p>{t('login.gameDescription1')}</p>
            <p>{t('login.gameDescription2')}</p>
            <p>{t('login.gameDescription3')}</p>
            <p>
              {t('login.gameDescription4')}
              <span
                onMouseEnter={() => toggleHover()}
                onMouseLeave={() => toggleHover()}
                onClick={() =>
                  (window.location.href = `mailto:${t('login.contact')}`)
                }
                className={clsx(styles.contactLink, {
                  ['goldenText']: isHovered,
                })}
              >
                {t('login.contact')}
              </span>
            </p>
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
                setInputData({ ...inputData, userName: data });
              }}
              onKeyDown={() => handleKeyPress(event)}
              label={t('profilePage.profileInfo.usernameLabel')}
            />
            <InputTextNew
              type="password"
              value={inputData.value}
              onChange={(data) => {
                setInputData({ ...inputData, password: data });
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
                setSignupInputData({ ...signupInputData, race: data });
              }}
              label={selectValues.label}
            />
            {signUpInputs.map(({ onChange, label, value, type }, index) => (
              <InputTextNew
                key={label + index}
                value={value}
                onChange={onChange}
                onKeyDown={() => handleKeyPress(event)}
                label={label}
                type={type}
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
              <Button isDisabled={isDisabled} onClick={createTeam}>
                {t('login.createTeam')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;
