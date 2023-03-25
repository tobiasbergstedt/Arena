import React, { useEffect, useRef, useState } from 'react';
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
  const [agreement, setAgreement] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === MOBILE;

  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    input: Yup.string()
      .trim()
      .min(4, 'Användarnamnet måste vara minst 4 tecken långt.')
      .required('Du måste fylla i ett nytt användarnamn.'),
  });

  const signUpInputs = [
    {
      value: signupInputData.teamName,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, teamName: data.value });
      },
      label: 'Team name',
    },
    {
      value: signupInputData.userName,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, userName: data.value });
      },
      label: 'User name',
    },
    {
      value: signupInputData.password,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, password: data.value });
      },
      label: 'Password',
    },
    {
      value: signupInputData.confirmPassword,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, confirmPassword: data.value });
      },
      label: 'Confirm password',
    },
    {
      value: signupInputData.email,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, email: data.value });
      },
      label: 'Email',
    },
    {
      value: signupInputData.confirmEmail,
      onChange: (data) => {
        setSignupInputData({ ...signupInputData, confirmEmail: data.value });
      },
      label: 'Confirm email',
    },
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 50);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const selectValues = {
    options: ['Humans', 'Elves', 'Dwarves', 'Orcs'],
    label: 'Race',
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
        <h2>Welcome to</h2>
        <h1 className={styles.headingTitle}>Arena</h1>
        {isMobile ? (
          <div className={styles.infoButton}>
            <p>i</p>
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
            <h2>SIGN IN</h2>
            <InputTextNew
              value={inputData.value}
              ref={inputRef}
              validationSchema={validationSchema}
              onChange={(data) => {
                setInputData({ ...inputData, userName: data.value });
              }}
              label={t('profilePage.profileInfo.usernameLabel')}
            />
            <InputTextNew
              value={inputData.value}
              ref={inputRef}
              validationSchema={validationSchema}
              onChange={(data) => {
                setInputData({ ...inputData, password: data.value });
              }}
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
                text={'Remember me'}
              />
              <HoverText text="Forgot password?" />
            </div>
            <div className={styles.buttonsWrapper}>
              <Button onClick={() => navigate('/landing')}>Sign in</Button>
              <p>or</p>
              <Button
                isRegister
                onClick={() => {
                  setIsSignIn(false);
                }}
              >
                Get your very own team!
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
              <h2>SIGN UP</h2>
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
              validationSchema={validationSchema}
              onChange={(data) => {
                setSignupInputData({ ...inputData, race: data });
              }}
              label={selectValues.label}
            />
            {signUpInputs.map(({ onChange, label, value }, index) => (
              <InputTextNew
                key={label + index}
                value={value}
                ref={inputRef}
                validationSchema={validationSchema}
                onChange={onChange}
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
                I accept the{' '}
                <span className={styles.underLine}>terms and conditions</span>{' '}
                as well as the handling of personal information.
              </p>
            </div>
            <div className={styles.buttonsWrapper}>
              <Button>Create team</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;
