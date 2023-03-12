import Button from 'components/Button/Button';
import { useState } from 'react';
import styles from './TestBody.module.scss';

const TestBody = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.wrapper}>
      <h4>Top</h4>
      <Button
        onClick={() => {
          setExpanded(true);
        }}
      >
        Expand
      </Button>
      <span>
        Can be really tricky to implement in a performant way. Luckily with this
        component you don't have to worry about that. By adding a header the
        touch hit target is much larger, making it more pleasant to use. For
        those big thicc phones they'll be happy to find that you can swipe on
        the sticky footer to adust the height, making one-handed usage a bit
        easier. On top of all that see how it remembers the last snap position
        it had when closing, and restore it when reopened. One more thing, the
        opening transition is interruptible, you can start dragging it right
        away.
      </span>
      {expanded && (
        <>
          <span>
            Can be really tricky to implement in a performant way. Luckily with
            this component you don't have to worry about that. By adding a
            header the touch hit target is much larger, making it more pleasant
            to use. For those big thicc phones they'll be happy to find that you
            can swipe on the sticky footer to adust the height, making
            one-handed usage a bit easier. On top of all that see how it
            remembers the last snap position it had when closing, and restore it
            when reopened. One more thing, the opening transition is
            interruptible, you can start dragging it right away.
          </span>
          <span>
            Can be really tricky to implement in a performant way. Luckily with
            this component you don't have to worry about that. By adding a
            header the touch hit target is much larger, making it more pleasant
            to use. For those big thicc phones they'll be happy to find that you
            can swipe on the sticky footer to adust the height, making
            one-handed usage a bit easier. On top of all that see how it
            remembers the last snap position it had when closing, and restore it
            when reopened. One more thing, the opening transition is
            interruptible, you can start dragging it right away.
          </span>
          <span>
            Can be really tricky to implement in a performant way. Luckily with
            this component you don't have to worry about that. By adding a
            header the touch hit target is much larger, making it more pleasant
            to use. For those big thicc phones they'll be happy to find that you
            can swipe on the sticky footer to adust the height, making
            one-handed usage a bit easier. On top of all that see how it
            remembers the last snap position it had when closing, and restore it
            when reopened. One more thing, the opening transition is
            interruptible, you can start dragging it right away.
          </span>
          <span>
            Can be really tricky to implement in a performant way. Luckily with
            this component you don't have to worry about that. By adding a
            header the touch hit target is much larger, making it more pleasant
            to use. For those big thicc phones they'll be happy to find that you
            can swipe on the sticky footer to adust the height, making
            one-handed usage a bit easier. On top of all that see how it
            remembers the last snap position it had when closing, and restore it
            when reopened. One more thing, the opening transition is
            interruptible, you can start dragging it right away.
          </span>
          <span>
            Can be really tricky to implement in a performant way. Luckily with
            this component you don't have to worry about that. By adding a
            header the touch hit target is much larger, making it more pleasant
            to use. For those big thicc phones they'll be happy to find that you
            can swipe on the sticky footer to adust the height, making
            one-handed usage a bit easier. On top of all that see how it
            remembers the last snap position it had when closing, and restore it
            when reopened. One more thing, the opening transition is
            interruptible, you can start dragging it right away.
          </span>
          <h4>Bottom</h4>
        </>
      )}
    </div>
  );
};

export default TestBody;
