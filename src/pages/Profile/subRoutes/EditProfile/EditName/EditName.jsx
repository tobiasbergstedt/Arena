import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from 'context/UserContext';
import client from 'api/client';

import Button from 'components/Button/Button';
import InputText from 'components/inputs/InputText/InputText';
import SubPage from 'components/SubPage/SubPage';

import styles from './EditName.module.scss';
import { useTranslation } from 'react-i18next';

const EditName = () => {
  const { userName, setUserName } = useContext(UserContext);
  const [inputData, setInputData] = useState(null);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const inputRef = useRef();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  const validationSchema = Yup.object().shape({
    input: Yup.string()
      .trim()
      .min(4, 'Användarnamnet måste vara minst 4 tecken långt.')
      .required('Du måste fylla i ett nytt användarnamn.')
      .notOneOf(
        [userName],
        'Du kan inte byta till ditt befintliga användarnamn.'
      ),
  });

  const onClickState = () => {
    const isValid = inputData?.result.valid;
    const sendData = async () => {
      const newUserName = inputData.value;
      const postBody = {
        newUsername: newUserName,
      };
      const response = await client.put('user/changeusername', postBody);
      return response?.data;
    };

    if (isValid) {
      sendData();
      setUserName(inputData.value);
      navigate('/profile/edit-profile');
    } else {
      inputRef?.current?.updateValidation();
    }
  };

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      setIsValueChanged(inputData?.value !== userName);
    }
  }, [inputData]);

  return (
    <SubPage
      label={t('profilePage.profileInfo.usernameLabel')}
      slugs={slugs}
      isValueChanged={isValueChanged}
    >
      <div className={styles.wrapper}>
        <InputText
          value={userName}
          ref={inputRef}
          validationSchema={validationSchema}
          onChange={(data) => {
            setInputData(data);
          }}
          label={t('profilePage.profileInfo.usernameLabel')}
          infoMessage={t('profilePage.profileInfo.editNameMessage')}
        />
        <Button onClick={onClickState}>
          {t('profilePage.profileInfo.save')}
        </Button>
      </div>
    </SubPage>
  );
};

export default EditName;
