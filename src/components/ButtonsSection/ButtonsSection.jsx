import { string, arrayOf, shape, func, bool } from 'prop-types';
import clsx from 'clsx';

import NavButton from './NavButton/NavButton';

import styles from './ButtonsSection.module.scss';

const ButtonsSection = ({ className, heading, items }) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      <h4 className={styles.heading}>{heading}</h4>
      {items.map(({ href, iconType, label, hasWarning, onClick }) => (
        <NavButton
          key={label}
          href={href}
          iconType={iconType}
          label={label}
          hasWarning={hasWarning}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

ButtonsSection.propTypes = {
  className: string,
  heading: string,
  items: arrayOf(
    shape({
      href: string,
      iconType: string,
      label: string.isRequired,
      onClick: func,
      hasWarning: bool,
    })
  ).isRequired,
};

ButtonsSection.defaultProps = {
  className: null,
  heading: '',
};

export default ButtonsSection;
