import React from 'react';
import { string, bool } from 'prop-types';
import clsx from 'clsx';

import styles from './Spinner.module.scss';

const Spinner = ({ className, isSmall, isMedium, isLarge }) => (
  <div
    className={clsx(className, styles.spinner, {
      [styles.isSmall]: isSmall,
      [styles.isMedium]: isMedium,
      [styles.isLarge]: isLarge,
    })}
  />
);

Spinner.propTypes = {
  className: string,
  isSmall: bool,
  isMedium: bool,
  isLarge: bool,
};

Spinner.defaultProps = {
  className: null,
  isSmall: false,
  isMedium: false,
  isLarge: false,
};

export default Spinner;
