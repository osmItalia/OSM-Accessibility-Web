import { GeoJSON, Marker } from 'react-leaflet';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDirectionsState } from '../../store/directions/selectors';

export default function DirectionsLayer() {
  const directionsState = useSelector(selectDirectionsState);

  console.log(directionsState);

  return (
    <>
      {directionsState.start && <Marker position={directionsState.start} />}
      {directionsState.end && <Marker position={directionsState.end} />}
      {directionsState.navigation && (
        <GeoJSON
          key={directionsState.navigationKey}
          data={directionsState.navigation}
        />
      )}
    </>
  );
}
