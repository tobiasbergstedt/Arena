import useWindowFocus from 'hooks/useWindowFocus';
import { useCallback, useEffect, useRef } from 'react';

export default function useAutoRotation(mapRef) {
  const spinSettings = {
    maxSpinZoom: 5,
    secondsPerRevolution: 120,
    slowSpinZoom: 3,
    delayStart: 2500,
  };

  const windowFocus = useWindowFocus();
  const userInteractingRef = useRef(false);
  const timeoutRotationRef = useRef(null);
  const timeoutDelayedStartRef = useRef(null);
  const disabledRef = useRef(false);

  // Unmount
  useEffect(
    () => () => {
      clearTimeouts();
    },
    []
  );

  /**
   * Start, stops rotation when browser becomes active or not active
   */
  useEffect(() => {
    if (windowFocus) {
      startRotation();
    } else {
      clearTimeouts();
      if (mapRef.current) {
        mapRef.current.stop();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowFocus]);

  /**
   * Called when user starts(true) and stops(false) interactions with map.
   */
  const interaction = useCallback((active) => {
    userInteractingRef.current = active;
    clearTimeouts();
    if (!disabledRef.current) {
      active ? mapRef.current.stop() : startRotation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rotateGlobe() {
    const { slowSpinZoom, maxSpinZoom, secondsPerRevolution } = spinSettings;

    if (!mapRef.current || disabledRef.current) return;
    const zoom = mapRef.current.getZoom();

    if (!userInteractingRef.current && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution;

      if (zoom > slowSpinZoom) {
        // Slow spinning at higher zooms
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = mapRef.current.getCenter();
      center.lng -= distancePerSecond;

      mapRef.current.easeTo({ center, duration: 1000, easing: (n) => n });

      timeoutRotationRef.current = window.setTimeout(() => {
        rotateGlobe();
      }, 1000);
    }
  }

  function startRotation(delay = true) {
    if (delay) {
      const { delayStart } = spinSettings;
      timeoutDelayedStartRef.current = window.setTimeout(() => {
        rotateGlobe();
      }, delayStart);
    } else {
      rotateGlobe();
    }
  }

  function clearTimeouts() {
    if (timeoutRotationRef?.current) {
      window.clearTimeout(timeoutRotationRef.current);
      timeoutRotationRef.current = null;
    }

    if (timeoutDelayedStartRef?.current) {
      window.clearTimeout(timeoutDelayedStartRef.current);
      timeoutDelayedStartRef.current = null;
    }
  }

  function disableRotation() {
    disabledRef.current = true;
    clearTimeouts();
    if (mapRef.current) {
      mapRef.current.stop();
    }
  }

  function enableRotation() {
    disabledRef.current = false;
  }

  return [interaction, startRotation, disableRotation, enableRotation];
}
