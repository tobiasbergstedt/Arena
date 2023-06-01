import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { string } from 'prop-types';

import { UserContext } from 'context/UserContext';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import HoverText from 'components/HoverText/HoverText';

import Star from 'assets/icons/star.svg';

import styles from './TeamInfo.module.scss';

const TeamInfo = ({ division }) => {
  const { user, userTeam } = useContext(UserContext);

  const { t } = useTranslation();

  const calculateReputation = () => {
    const reputationPercentage = Math.round(
      (userTeam.reputation / 10000) * 100
    );
    let numberOfStars = 1;
    if (reputationPercentage <= 100) {
      numberOfStars = Math.ceil(reputationPercentage / 20);
    }
    return numberOfStars;
  };

  const starsArray = [...Array(calculateReputation())];

  return (
    <div className={styles.teamInfoWrapper}>
      <ItemHeadings
        heading={t('club.teamInfo')}
        subHeading={userTeam.teamName}
        hasButton={t('general.edit')}
      />
      <div className={styles.teamInfoInnerWrapper}>
        <div className={styles.left}>
          <p className={clsx(styles.teamInfoSection, styles.paragraph)}>
            Reputation:{' '}
            {starsArray.map((_, index) => (
              <span
                key={index}
                className={styles.iconInnerWrapper}
                style={{
                  maskImage: `url(${Star})`,
                  WebkitMaskImage: `url(${Star})`,
                }}
              />
            ))}
          </p>
          <div className={styles.teamInfoSection}>
            <p className={styles.paragraph}>
              Manager:{' '}
              <HoverText
                text={user.displayName}
                onClick={() => {
                  alert('Clicked!');
                }}
              />
            </p>
            <p className={styles.paragraph}>Founded: {userTeam.dateFounded}</p>
          </div>
          <div className={styles.teamInfoSection}>
            <p className={styles.paragraph}>Hometown: {userTeam.homeTown}</p>
            <p className={styles.paragraph}>
              League:{' '}
              {division ? (
                <HoverText
                  text={division}
                  onClick={() => {
                    alert('Clicked!');
                  }}
                />
              ) : (
                t('global.loading')
              )}
            </p>
          </div>
          <p className={clsx(styles.teamInfoSection, styles.paragraph)}>
            {t('club.stadium')}:{' '}
            {userTeam.stadiumId ? (
              'Basher Brothers Blood Dome'
            ) : (
              <span>
                <HoverText
                  text={userTeam.teamName}
                  onClick={() => {
                    alert('Clicked!');
                  }}
                />
                {t('club.noStadium')}
              </span>
            )}
          </p>
          <p className={styles.about}>{t('club.about')}</p>
          <p className={styles.paragraph}>
            {userTeam.about
              ? userTeam.about
              : user.displayName + t('club.noAbout')}
          </p>
        </div>
        <img src={userTeam.logo} alt="" className={styles.teamLogo} />
      </div>
    </div>
  );
};

TeamInfo.propTypes = {
  division: string,
};

TeamInfo.defaultProps = {
  division: '',
};

export default TeamInfo;
