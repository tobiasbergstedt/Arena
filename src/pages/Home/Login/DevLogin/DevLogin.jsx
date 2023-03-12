import React, { useContext, useState, useRef } from 'react';
import { UserContext } from 'context/UserContext';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Login from 'api/Login';

import InputText from 'components/inputs/InputText/InputText';
import Button from 'components/Button/Button';
import { ReactComponent as CloseIcon } from 'assets/icons/close-cross-white.svg';

import styles from './DevLogin.module.scss';

const devUsers = [
  { value: '6710254977', name: 'Klara Segerström' },
  { value: '7611085739', name: 'Annie Segerström' },
  { value: '5574639573', name: 'Ulla Strömstedt' },
  { value: '8825364846', name: 'Ibrahim Gustavsson' },
  { value: '7837264485', name: 'Fredrik af Klint' },
  { value: '7654799754', name: 'Ebba Holm' },
];

const DevLogin = ({ onClose, onSuccess }) => {
  const { setUserData, setUserToken, recurringUser } = useContext(UserContext);
  const [inputData, setInputData] = useState(null);
  const [selectedDevUser, setSelectedDevUser] = useState(devUsers[0]);
  const [displayRecurringUserLogin, setDisplayRecurringUserLogin] =
    useState(recurringUser);

  const inputRef = useRef();

  const { t } = useTranslation();

  const { mutate: register } = Login.useDevRegister((data) => {
    setUserData(data.user);
    setUserToken(data.token);
  });

  const { mutate: login } = Login.useDevLogin((data) => {
    // An unregistered user should be sent to onboarding
    if (!data.user.accountRestrictionsCompleted) {
      return register(data.orderReference);
    }
    setUserData(data.user);

    setUserToken(data.token);
  });

  const loginDevUser = (nationalId) => {
    login(nationalId);
  };

  const toggleDevLoginView = () => {
    setDisplayRecurringUserLogin(!displayRecurringUserLogin);
  };

  const validationSchema = Yup.object().shape({
    input: Yup.string()
      .trim()
      .matches(/^[0-9]+$/, 'Personnummer får bara innehålla siffror.')
      .length(10, 'Personnummer måste vara exakt 10 siffror långt.')
      .required('Du måste fylla i ditt personnummer.'),
  });

  const onClickState = () => {
    const isValid = inputData?.result.valid;

    if (isValid) {
      onSuccess();
      loginDevUser(inputData.value);
    } else if (!displayRecurringUserLogin) {
      onSuccess();
      loginDevUser(selectedDevUser.value);
    } else {
      inputRef?.current?.updateValidation();
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => {
          onClose();
        }}
      />
      {!displayRecurringUserLogin ? (
        <>
          <h2>{t('login.welcomeBackHeading')}</h2>
          <select
            name="dev-user"
            id="dev-user"
            value={selectedDevUser.value}
            onChange={(e) => {
              const newUser = devUsers.find((u) => u.value === e.target.value);
              setSelectedDevUser(newUser);
            }}
            placeholder="Välj användare"
          >
            {devUsers.map((user) => (
              <option key={user.value} value={user.value}>
                {user.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <h2 className={styles.h2}>{t('login.welcomeHeading')}</h2>
          <InputText
            ref={inputRef}
            label={t('inputs.inputPersonalId.label')}
            validationSchema={validationSchema}
            onChange={(data) => {
              setInputData(data);
            }}
            maxLength={10}
          />
        </>
      )}
      <Button isBlueButton onClick={onClickState}>
        {!displayRecurringUserLogin
          ? `${t('login.logIn')} ${selectedDevUser.name}`
          : `${t('login.createAccount')}`}
      </Button>
      <Button
        className={styles.switchButton}
        isText
        onClick={toggleDevLoginView}
      >
        {!displayRecurringUserLogin
          ? `${t('login.newUser')}`
          : `${t('login.recurringUser')}`}
      </Button>
    </div>
  );
};

DevLogin.propTypes = {
  onClose: func,
  onSuccess: func,
};

DevLogin.defaultProps = {
  onClose: null,
  onSuccess: null,
};

export default DevLogin;
