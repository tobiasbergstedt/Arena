import { Link } from 'react-router-dom';
import { bool, string } from 'prop-types';
import clsx from 'clsx';

import styles from './ListItem.module.scss';

const ListItem = ({ hasNoValue, label, text, className, link, linkText }) => {
  return (
    <div className={clsx(styles.innerWrapper, className)}>
      <p className={styles.label}>{!hasNoValue && label}</p>
      <p className={clsx({ [styles.text]: hasNoValue })}>{text}</p>
      {link && (
        <Link className={styles.link} to={link}>
          {linkText}
        </Link>
      )}
    </div>
  );
};

ListItem.propTypes = {
  hasNoValue: bool,
  label: string.isRequired,
  text: string.isRequired,
  className: string,
  link: string,
  linkText: string,
};

ListItem.defaultProps = {
  hasNoValue: false,
  className: '',
  link: '',
  linkText: '',
};

export default ListItem;
