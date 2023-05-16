import clsx from 'clsx';
import { string, arrayOf, object, array, func } from 'prop-types';

import styles from './MenuSection.module.scss';
import { useNavigate } from 'react-router-dom';

const MenuSection = ({ items, heading, slugs, setIsSideMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.gameMenuWrapper}>
      <p className={clsx(styles.menuSubHeading, styles.gameMenuHeading)}>
        {heading}
      </p>
      <div className={styles.gameMenuItemsWrapper}>
        {items.map(({ url, title, linkTo }, index) => (
          <div
            key={title + index}
            className={clsx(styles.gameMenuItem, {
              [styles.gameItemActive]: linkTo === slugs[1],
            })}
            onClick={() => {
              navigate(`/${linkTo}`);
              setIsSideMenuOpen(false);
            }}
          >
            <div
              className={styles.gameMenuIconInnerWrapper}
              style={{
                maskImage: url,
                WebkitMaskImage: url,
              }}
            />
            <span className={styles.title}>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

MenuSection.propTypes = {
  heading: string.isRequired,
  items: arrayOf(object),
  slugs: array.isRequired,
  setIsSideMenuOpen: func,
};

export default MenuSection;
