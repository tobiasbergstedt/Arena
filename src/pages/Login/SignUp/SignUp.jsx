import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from 'api/firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { func, string, bool, object } from 'prop-types';

import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import InputText from 'components/inputs/InputText/InputText';
import Select from 'components/inputs/Select/Select';
import TermsAndConditionsModal from '../Modals/TermsAndConditionsModal';

import { ReactComponent as ArrowBack } from 'assets/icons/arrow-back.svg';

const SignUp = ({
  animVariants,
  loading,
  setLoading,
  displayError,
  setDisplayError,
  setIsSignIn,
  styles,
}) => {
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
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const selectValues = {
    options: [
      t('login.races.humans'),
      t('login.races.elves'),
      t('login.races.dwarves'),
      t('login.races.orcs'),
    ],
    label: t('login.races.race'),
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

  const handleModal = (event) => {
    event.stopPropagation();
    setIsTermsModalVisible(true);
  };

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
      await updateProfile(auth.currentUser, {
        displayName: signupInputData.userName,
      }).catch((error) => {
        setDisplayError(error.message);
      });
      setLoading(false);
      if (auth.currentUser) {
        navigate('landing');
      }
    } catch (error) {
      setLoading(false);
      setDisplayError(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      createTeam();
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

  useEffect(() => {
    checkIsDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupInputData]);

  return (
    <>
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
          <InputText
            key={label + index}
            value={value}
            onChange={onChange}
            onKeyDown={(event) => handleKeyPress(event)}
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
            agreement={acceptTermsAndConditions}
          >
            <p
              onClick={() => {
                setAcceptTermsAndConditions(!acceptTermsAndConditions);
              }}
            >
              {t('login.iAccept')}
              <span
                className={styles.underLine}
                onClick={(e) => handleModal(e)}
              >
                {t('login.termsAndConditions')}
              </span>{' '}
              {t('login.asWellAs')}
            </p>
          </CheckBox>
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
      <AnimatePresence>
        {isTermsModalVisible && (
          <TermsAndConditionsModal setIsModalVisible={setIsTermsModalVisible} />
        )}
      </AnimatePresence>
    </>
  );
};

SignUp.propTypes = {
  animVariants: object,
  loading: bool,
  setLoading: func,
  displayError: string,
  setDisplayError: func,
  setIsSignIn: func,
  styles: object,
};

SignUp.defaultProps = {
  animVariants: {},
  loading: false,
  setLoading: () => {},
  displayError: '',
  setDisplayError: () => {},
  setIsSignIn: () => {},
  styles: {},
};

export default SignUp;
