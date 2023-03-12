import React, {
  forwardRef,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { HomeContext } from 'context/HomeContext';
import { func, bool } from 'prop-types';
import throttle from 'lodash.throttle';
import {
  HIDE_CLOCK_ZOOM_LEVEL_DESKTOP,
  HIDE_CLOCK_ZOOM_LEVEL_MOBILE,
  VALID_ZOOM_SELECT_PLACE_DESKTOP,
  VALID_ZOOM_SELECT_PLACE_MOBILE,
} from 'config/settings';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Layer, Marker, Source } from 'react-map-gl';

import { motion, useAnimationControls, useAnimationFrame } from 'framer-motion';

import UserMarker from 'assets/images/pin.png';
import DefaultMarker from 'assets/images/other-pin.png';

import { MAPBOX_STYLE, MAPBOX_TOKEN } from 'config/settings';
import { heatMapConfig } from './heatMapLayerConfig';
import { pinsLayerConfig } from './pinsLayerConfig';

import Places from 'api/Places';

import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';
import useFlyTo from './useFlyTo';

import useAutoRotation from 'pages/Home/Mapbox/useAutoRotation';
import PlaceTooltip from 'pages/Home/Mapbox/Tooltip/Tooltip';
import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';

import styles from './Mapbox.module.scss';

const mapBoxStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
};

const Mapbox = forwardRef(
  ({ onInteraction, onMarkerPlaced, isInteractive }, ref) => {
    const mapRef = useRef();
    const tooltipRef = useRef(null);

    const [mapData, setMapData] = useState(null);
    const [markerPoint, setMarkerPoint] = useState(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(false);

    const { setDisplayCountdownClock, setZoomValidForSelectPlace } =
      useContext(HomeContext);

    useImperativeHandle(ref, () => ({
      moveToBounds,
      clearMarker,
    }));

    const [interaction, startRotation, disableRotation, enableRotation] =
      useAutoRotation(mapRef);
    const [flyTo, flyToBounds] = useFlyTo(mapRef, () => {
      enableRotation(); // Triggered when flyTo is finished
    });
    const breakpoint = useBreakpoint();
    const controls = useAnimationControls();
    const apiPlaces = Places.useGetActivePlaces();

    useAnimationFrame(() => {
      if (selectedMarker) {
        const { lng, lat } = selectedMarker.lngLat;
        const coordinate = [lng, lat];
        const point = mapRef.current.project(coordinate);
        if (tooltipRef.current) {
          tooltipRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;
        }
      }
    });

    useEffect(() => {
      if (apiPlaces?.data) {
        const geojson = {
          type: 'FeatureCollection',
          features: apiPlaces.data.activeLotteryPlaces,
        };
        setMapData(geojson);
      }
    }, [apiPlaces.data]);

    const onMapLoaded = useCallback(() => {
      mapRef.current.loadImage(DefaultMarker, (error, image) => {
        if (error) throw error;
        if (!mapRef.current.hasImage('default-marker')) {
          mapRef.current.addImage('default-marker', image, { sdf: false });
        }
      });

      // easeTo onLoaded fixes glitchy movement att start.
      controls.set({ scale: 0.8 });
      mapRef.current.easeTo({
        center: mapRef.current.getCenter(),
        duration: 0,
      });
      startRotation(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onMapInteraction = useCallback((isActive) => {
      if (isInteractive) {
        onInteraction(isActive);
        interaction(isActive);
      }
    }, []);

    const onZoomThrottle = throttle(() => {
      testIfCountdownIsVisible();
      testIfSelectPlaceIsVisible();
      testIfTooltipIsVisible();
    }, 500);

    const onMoveThrottle = throttle(() => {
      testIfTooltipIsVisible();
    }, 500);

    function testIfSelectPlaceIsVisible() {
      const zoomLevel = mapRef.current.getZoom();
      console.log('zoomLevel ', zoomLevel);
      const zoomBreakpoint =
        breakpoint === MOBILE
          ? VALID_ZOOM_SELECT_PLACE_MOBILE
          : VALID_ZOOM_SELECT_PLACE_DESKTOP;
      if (zoomLevel > zoomBreakpoint) {
        // setDisplayCountdownClock(false);
        setZoomValidForSelectPlace(true);
        console.log('VALID ZOOM');
      } else {
        // setDisplayCountdownClock(true);
        setZoomValidForSelectPlace(false);
        console.log('NOT VALID ZOOM');
      }
    }

    function testIfCountdownIsVisible() {
      const zoomLevel = mapRef.current.getZoom();
      const clockBreakpoint =
        breakpoint === MOBILE
          ? HIDE_CLOCK_ZOOM_LEVEL_MOBILE
          : HIDE_CLOCK_ZOOM_LEVEL_DESKTOP;
      if (zoomLevel > clockBreakpoint) {
        setDisplayCountdownClock(false);
      } else {
        setDisplayCountdownClock(true);
      }
    }

    function testIfTooltipIsVisible() {
      if (selectedMarker) {
        const { lng, lat } = selectedMarker.lngLat;
        const inBounds = mapRef.current
          .getMap()
          .getBounds()
          .contains([lng, lat]);

        const inZoomLevel = mapRef.current.getZoom() > 9.5 ? true : false;
        setIsTooltipVisible(inBounds && inZoomLevel);
      } else {
        setIsTooltipVisible(false);
      }
    }

    function moveToBounds(bounds, duration = null) {
      disableRotation();
      flyToBounds(bounds, duration);
    }

    function clearMarker() {
      setMarkerPoint(null);
    }

    function getMarkerFromPoint(point) {
      // TODO: Investigate if the custom viewport actually is needed.
      const width = 2;
      const height = 5;
      const yOffset = 0;
      const features = mapRef.current.getMap().queryRenderedFeatures(
        [
          [point.x - width / 2, point.y - height / 2 + yOffset],
          [point.x + width / 2, point.y + height / 2 + yOffset],
        ],
        {
          layers: [pinsLayerConfig.id],
        }
      );

      if (features.length > 0) {
        return features[0];
      }
      return null;
    }

    function selectMarker(target) {
      setMarkerPoint(null);
      onMarkerPlaced(false);
      disableRotation();
      setSelectedMarker(target);

      flyTo(target.lngLat, () => {
        // console.log('on fly to finished', selectedMarker);
      });
    }

    async function placeMarker(lngLat) {
      onMarkerPlaced(true);
      setSelectedMarker(null);
      disableRotation();

      setMarkerPoint(lngLat);
      flyTo(lngLat);

      await controls.set(() => ({
        scale: 0.8,
      }));
      await controls.start(() => ({
        scale: 0.7,
      }));
    }

    return (
      <div className={styles.wrapper}>
        <Suspense fallback={<SpinnerGlobe />}>
          {breakpoint && (
            <Map
              ref={mapRef}
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: breakpoint === 'mobile' ? 0.8 : 1.5,
              }}
              style={mapBoxStyle}
              interactiveLayerIds={[pinsLayerConfig.id]}
              attributionControl={false}
              mapboxAccessToken={MAPBOX_TOKEN}
              projection="globe"
              mapStyle={MAPBOX_STYLE}
              onLoad={onMapLoaded}
              interactive={isInteractive}
              onTouchStart={() => onMapInteraction(true)}
              onMouseDown={() => onMapInteraction(true)}
              onMouseUp={() => onMapInteraction(false)}
              onPitchEnd={() => onMapInteraction(false)}
              onRotateEnd={() => onMapInteraction(false)}
              onDragEnd={() => onMapInteraction(false)}
              onZoomEnd={() => onMapInteraction(false)}
              onZoom={onZoomThrottle}
              onMove={onMoveThrottle}
              onClick={async (event) => {
                if (!isInteractive) return;
                const { point, lngLat } = event;
                const markerData = getMarkerFromPoint(point);
                // If users have tapped on an existing marker, select it. Then return.
                if (markerData) {
                  const { coordinates } = markerData.geometry;
                  const target = {
                    lngLat: { lng: coordinates[0], lat: coordinates[1] },
                    data: markerData,
                  };
                  selectMarker(target);
                  return;
                }

                // If users have tapped on an empty spot, place a marker.
                placeMarker(lngLat);
              }}
              fog={{}}
            >
              <Source id="active-places" type="geojson" data={mapData}>
                <Layer {...heatMapConfig} />
                <Layer {...pinsLayerConfig} />
                <PlaceTooltip
                  ref={tooltipRef}
                  data={selectedMarker?.data}
                  isVisible={isTooltipVisible}
                />
                {markerPoint && (
                  <Marker
                    longitude={markerPoint.lng}
                    latitude={markerPoint.lat}
                    anchor="bottom"
                  >
                    <motion.div
                      animate={controls}
                      transition={{
                        type: 'spring',
                        damping: 10,
                        stiffness: 150,
                      }}
                      style={{ originY: 1 }}
                    >
                      <img src={UserMarker} />
                    </motion.div>
                  </Marker>
                )}
              </Source>
            </Map>
          )}
        </Suspense>
      </div>
    );
  }
);

Mapbox.propTypes = {
  onInteraction: func,
  onMarkerPlaced: func,
  isInteractive: bool,
};

Mapbox.defaultProps = {
  onInteraction: () => {},
  onMarkerPlaced: () => {},
  isInteractive: true,
};

export default Mapbox;
