import React, { useState, useEffect, useContext } from 'react';
import { DndContext } from '@dnd-kit/core';
import { bool } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import fixUrl from 'utils/fix-url';
import { UserContext } from 'context/UserContext';

import Droppable from '../Droppable/Droppable';
import Draggable from '../Draggable/Draggable';

import Player from 'assets/icons/player-number.svg';

import styles from './Lineup.module.scss';

const Lineup = ({ isReserves }) => {
  const { userTeam } = useContext(UserContext);
  const [lineup, setLineup] = useState({
    leftStriker1: null,
    leftStriker2: null,
    centralStriker1: null,
    centralStriker2: null,
    rightStriker1: null,
    rightStriker2: null,
    leftMidfielder1: null,
    leftMidfielder2: null,
    centralMidfielder1: null,
    centralMidfielder2: null,
    rightMidfielder1: null,
    rightMidfielder2: null,
    leftDefender1: null,
    leftDefender2: null,
    centralDefender1: null,
    centralDefender2: null,
    rightDefender1: null,
    rightDefender2: null,
    noPlayerLeft1: null,
    noPlayerLeft2: null,
    goalkeeper1: null,
    goalkeeper2: null,
    noPlayerRight1: null,
    noPlayerRight2: null,
  });
  const [players, setPlayers] = useState([]);
  const maxNumberOfPlayers = isReserves ? 20 : 10;

  useEffect(() => {
    // Fetch players from the API and set the players state
    const fetchPlayers = async () => {
      try {
        const response = await fetch(fixUrl(`/players/team/${userTeam.id}`));
        const apiData = await response.json();
        setPlayers(apiData);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [userTeam]);

  const checkIsDisabled = (position) => {
    if (
      position === 'noPlayerLeft1' ||
      position === 'noPlayerLeft2' ||
      position === 'noPlayerRight1' ||
      position === 'noPlayerRight2'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      // Check if the draggable was dropped outside of any droppable
      setLineup((prevLineup) => {
        const updatedLineup = { ...prevLineup };

        // Find the position of the dropped draggable in the lineup state
        const position = Object.keys(updatedLineup).find(
          (pos) => updatedLineup[pos] === active.id
        );

        if (position) {
          // Reset the position of the dropped draggable to null
          updatedLineup[position] = null;
        }

        return updatedLineup;
      });

      return;
    }

    const newPosition = over.id;
    const playerId = active.id;

    // Check if the player is already assigned to another position
    const previousPosition = Object.keys(lineup).find(
      (position) => lineup[position] === playerId
    );

    const updateLineup = () => {
      const updatedLineup = { ...lineup };

      if (previousPosition) {
        // Check if the dropped draggable is already assigned to another position
        const draggedPlayerId = lineup[newPosition];

        if (draggedPlayerId) {
          // Swap the positions of the two draggables
          updatedLineup[previousPosition] = draggedPlayerId;
          updatedLineup[newPosition] = playerId;
        } else {
          updatedLineup[previousPosition] = null; // Reset the previous position
          updatedLineup[newPosition] = playerId; // Assign the player to the new position
        }
      } else {
        updatedLineup[newPosition] = playerId; // Assign the player to the new position
      }

      return updatedLineup;
    };

    // Count the number of key-value pairs with a value other than "undefined"
    const nonUndefinedCount = Object.values(lineup).filter(
      (value) => value !== null
    ).length;

    const isEmpty = lineup[newPosition] === null;

    if (
      nonUndefinedCount >= maxNumberOfPlayers &&
      !previousPosition &&
      isEmpty
    ) {
      alert(`No more than ${maxNumberOfPlayers} players allowed.`);
      return;
    }

    // Usage:
    setLineup((prevLineup) =>
      updateLineup(prevLineup, previousPosition, newPosition, playerId)
    );
  };

  const handleClick = (player) => {
    alert(player.name);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.lineupGrid}>
        {Object.keys(lineup).map((position) => {
          const playerId = lineup[position];
          const player = players.find((p) => p.id === playerId);

          return (
            <Droppable
              key={position}
              id={position}
              disabled={checkIsDisabled(position)}
            >
              {player && player.id === playerId ? (
                <div
                  className={styles.emptyDroppable}
                  style={
                    checkIsDisabled(position)
                      ? {}
                      : { backgroundImage: `url(${Player})` }
                  }
                >
                  <Draggable
                    key={uuidv4()}
                    id={player.id}
                    number={player.number}
                    onClick={handleClick(player)}
                  />
                </div>
              ) : (
                <div
                  className={styles.emptyDroppable}
                  style={
                    checkIsDisabled(position)
                      ? {}
                      : { backgroundImage: `url(${Player})`, opacity: 0.25 }
                  }
                />
              )}
            </Droppable>
          );
        })}
      </div>

      <div className={styles.playersGrid}>
        {players.map((player) => {
          const playerId = player.id;
          const isInDroppable = Object.values(lineup).includes(playerId);

          return isInDroppable ? (
            <div
              key={uuidv4()}
              className={styles.emptyPlayer}
              style={{ backgroundImage: `url(${Player})` }}
            ></div>
          ) : (
            <div
              key={uuidv4()}
              className={styles.draggableWrapper}
              style={{ backgroundImage: `url(${Player})` }}
            >
              <Draggable id={playerId} number={player.number} />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};

Lineup.propTypes = {
  isReserves: bool,
};

Lineup.defaultProps = {
  isReserves: false,
};

export default Lineup;
