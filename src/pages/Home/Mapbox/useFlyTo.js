import { useRef } from 'react';

export default function useFlyTo(mapRef, onFlyToEnd) {
  const isFlyingToBounds = useRef(false);
  const isFlyingTo = useRef(false);
  const isFlyingToCompleteCallback = useRef(false);

  function flyTo(lngLat, onCompleteCallback) {
    isFlyingTo.current = true;
    isFlyingToCompleteCallback.current = onCompleteCallback;

    mapRef.current?.flyTo({
      center: [lngLat.lng, lngLat.lat],
      // zoom: 9,
      // speed: 0.3,
      duration: 1000,
    });

    mapRef.current?.on('moveend', () => {
      if (isFlyingTo.current) {
        isFlyingTo.current = false;
        if (isFlyingToCompleteCallback.current) {
          isFlyingToCompleteCallback.current();
          isFlyingToCompleteCallback.current = null;
        }
        onFlyToEnd();
      }
    });
  }

  function flyToBounds(bounds, duration = null) {
    isFlyingToBounds.current = true;
    const options = duration ? { duration } : null;
    mapRef.current?.fitBounds(bounds, options);
    mapRef.current?.on('moveend', () => {
      if (isFlyingToBounds.current) {
        isFlyingToBounds.current = false;
        onFlyToEnd();
      }
    });
  }

  return [flyTo, flyToBounds];
}
