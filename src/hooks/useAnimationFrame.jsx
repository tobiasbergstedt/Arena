import { useLayoutEffect, useRef } from 'react';

export default (callback) => {
  if (typeof performance === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const callbackRef = useRef();
  const frame = useRef();
  const init = useRef(performance.now());
  const last = useRef(performance.now());

  callbackRef.current = callback;

  const animate = (now) => {
    callbackRef.current({
      time: (now - init.current) / 1000, // In seconds
      delta: (now - last.current) / 1000, // In seconds
    });
    last.current = now;
    frame.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    frame.current = requestAnimationFrame(animate);
    return () => frame.current && cancelAnimationFrame(frame.current);
  }, []);
};
