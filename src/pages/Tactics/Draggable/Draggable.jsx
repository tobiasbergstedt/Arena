import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { string, number, func } from 'prop-types';

import { ReactComponent as Player } from 'assets/icons/player-number.svg';

import styles from './Draggable.module.scss';

const Draggable = ({ id, number, onClick, passedStyle }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const handleClick = () => {
    if (!isDragging) {
      onClick();
    }
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.65 : 1,
      }
    : undefined;

  const combinedStyle = {
    ...style,
    ...passedStyle,
  };

  return (
    <div
      ref={setNodeRef}
      id={id}
      style={combinedStyle}
      className={styles.draggableContainer}
      {...listeners}
      {...attributes}
      onClick={handleClick}
    >
      <Player />
      <div className={styles.jerseyNumber}>{number}</div>
    </div>
  );
};

Draggable.propTypes = {
  id: string,
  number: number,
  onClick: func,
  passedStyle: string,
};

export default Draggable;
