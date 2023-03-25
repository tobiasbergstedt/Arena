import { func, string } from 'prop-types';

import styles from './HoverText.module.scss';

const HoverText = ({ onClick, text }) => {
  return (
    <span className={styles.hoverText} onClick={onClick}>
      {text}
    </span>
  );
};

HoverText.propTypes = {
  onClick: func,
  text: string,
};

HoverText.defaultProps = {
  onclick: () => {},
  text: '',
};

export default HoverText;
