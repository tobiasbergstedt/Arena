import React from 'react';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';
import { string, node, bool } from 'prop-types';

import styles from './Droppable.module.scss';

const Droppable = ({ id, children, disabled }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    disabled: disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(styles.droppable, {
        [styles.hovering]: isOver,
      })}
    >
      {children}
    </div>
  );
};

Droppable.propTypes = {
  id: string,
  children: node,
  disabled: bool,
};

export default Droppable;
