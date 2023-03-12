import { ICON_WARNING } from 'config/constants';
import { string, func } from 'prop-types';

import { ReactComponent as IconWarning } from 'assets/icons/icon-warning.svg';
import Button from 'components/Button/Button';

import styles from './BottomDialog.module.scss';

const BottomDialog = ({ iconType, header, body, onClose }) => {
  const renderIcon = (type) => {
    switch (type) {
      case ICON_WARNING:
        return <IconWarning className={styles.icon} />;
      default:
        <span>Missing icon</span>;
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      {iconType && renderIcon(iconType)}
      <h4 className={styles.header}>{header}</h4>
      <span className={styles.body}>{body}</span>
      <div>
        {onClose && (
          <Button className={styles.closeBtn} onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

BottomDialog.propTypes = {
  className: string,
  iconType: string,
  header: string,
  body: string,
  onClose: func,
};

BottomDialog.defaultProps = {
  className: null,
  iconType: null,
  header: '',
  body: '',
  onClose: null,
};

export default BottomDialog;
