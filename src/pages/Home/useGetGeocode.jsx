import { useEffect, useState } from 'react';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

function useGetGeocode(onGetGeocode) {
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    const getGeocode = async (placeData) => {
      if (!placeData) return;

      try {
        const { structured_formatting, place_id } = placeData;
        const { main_text, secondary_text } = structured_formatting;

        const geocode = await geocodeByPlaceId(place_id);

        const latLng = await getLatLng(geocode[0]);
        const parsedBounds = JSON.parse(
          JSON.stringify(geocode[0].geometry.viewport)
        );

        const bounds = [
          [parsedBounds.west, parsedBounds.south], // southwestern corner of the bounds
          [parsedBounds.east, parsedBounds.north], // northeastern corner of the bounds
        ];

        onGetGeocode({
          position: latLng,
          bounds,
          main_text,
          secondary_text,
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    getGeocode(placeData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeData]);

  return [setPlaceData, onGetGeocode];
}

export default useGetGeocode;
