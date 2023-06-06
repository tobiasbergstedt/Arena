import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { func, string, bool, object } from 'prop-types';

import { UserContext } from 'context/UserContext';

import Button from 'components/Button/Button';
import Copyright from 'components/Copyright/Copyright';
import HoverText from 'components/HoverText/HoverText';
import Spinner from 'components/Spinner/Spinner';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import InputText from 'components/inputs/InputText/InputText';

const SignIn = ({
  animVariants,
  loading,
  setLoading,
  displayError,
  setDisplayError,
  setIsSignIn,
  styles,
}) => {
  const { signin } = useContext(UserContext);

  const [agreement, setAgreement] = useState(false);
  const [inputData, setInputData] = useState({ userName: '', password: '' });

  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      handleSignin();
    }
  };

  return (
    <motion.div
      key={'signinWrapper'}
      variants={animVariants}
      initial="initial"
      animate="visible"
      exit="after"
      className={styles.signinWrapper}
    >
      <h2 className={styles.signIn}>{t('login.signIn')}</h2>
      <InputText
        value={inputData.value}
        onChange={(data) => {
          setInputData({ ...inputData, userName: data });
        }}
        onKeyDown={(event) => handleKeyPress(event)}
        label={t('login.inputs.email')}
      />
      <InputText
        type="password"
        value={inputData.value}
        onChange={(data) => {
          setInputData({ ...inputData, password: data });
        }}
        onKeyDown={(event) => handleKeyPress(event)}
        label={t('login.inputs.password')}
      />
      <div className={styles.optionsWrapper}>
        <CheckBox
          onChange={(event) => {
            setAgreement(event.target.checked);
          }}
          agreement={agreement}
        >
          <HoverText
            text={t('login.rememberMe')}
            onClick={() => {
              setAgreement(!agreement);
            }}
          />
        </CheckBox>
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
  );
};

SignIn.propTypes = {
  animVariants: object,
  loading: bool,
  setLoading: func,
  displayError: string,
  setDisplayError: func,
  setIsSignIn: func,
  styles: object,
};

SignIn.defaultProps = {
  animVariants: {},
  loading: false,
  setLoading: () => {},
  displayError: '',
  setDisplayError: () => {},
  setIsSignIn: () => {},
  styles: {},
};

export default SignIn;
