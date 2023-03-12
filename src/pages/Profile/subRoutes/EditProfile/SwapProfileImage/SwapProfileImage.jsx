import { useState, useContext, useCallback } from 'react';
import { UserContext } from 'context/UserContext';
import { t } from 'i18next';
import { AppContext } from 'context/AppContext';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import api from 'api/User';
import clsx from 'clsx';

import Button from 'components/Button/Button';

import { ReactComponent as GlobeIcon } from 'assets/icons/profile-icon-globe.svg';

import styles from './SwapProfileImage.module.scss';

const SwapProfileImage = () => {
  const { setUserNotification } = useContext(AppContext);
  const { profileImageUrl, setProfileImageUrl } = useContext(UserContext);
  const [newImageSrc, setNewImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(2);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { mutate: uploadImage } = api.useUploadImage((data) => {
    setProfileImageUrl(data?.url);
    setUserNotification({
      message: t('profilePage.profileInfo.imageUpdatedMessage'),
    });
    setNewImageSrc(null);
  });

  const onImageChange = (e) => {
    if (e.target.files.length === 1) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setNewImageSrc(imageUrl);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(newImageSrc, croppedAreaPixels);
      const onlyData = croppedImage.replace('data:image/jpeg;base64,', '');
      uploadImage(onlyData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={clsx(styles.wrapper, { [styles.editMode]: newImageSrc })}>
      {newImageSrc ? (
        <Cropper
          image={newImageSrc}
          crop={crop}
          zoom={zoom}
          maxZoom={4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round"
          cropSize={{ width: 165, height: 165 }}
          objectFit="horizontal-cover"
          showGrid={false}
          aspect={1}
          // classes={{ cropAreaClassName: styles.cropArea }}
        />
      ) : (
        <div className={styles.imageContainer}>
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="" />
          ) : (
            <GlobeIcon className={styles.globeIcon} />
          )}
        </div>
      )}

      {newImageSrc ? (
        <>
          <p className={styles.information}>
            {t('profilePage.profileInfo.imageCropInformation')}
          </p>
          <div className={styles.buttonWrapper}>
            <Button onClick={() => setNewImageSrc(null)} isTransparent>
              {t('profilePage.profileInfo.cancel')}
            </Button>
            <Button onClick={showCroppedImage} isTransparent>
              {t('profilePage.profileInfo.save')}
            </Button>
          </div>
        </>
      ) : (
        <label htmlFor="fileupload" className={styles.uploadButton}>
          {t('profilePage.profileInfo.swapImageButton')}
          <input
            id="fileupload"
            type="file"
            multiple
            accept=".jpg, .jpeg, .webp"
            onChange={onImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default SwapProfileImage;
