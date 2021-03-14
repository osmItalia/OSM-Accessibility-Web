import { GeoJSON, Marker } from 'react-leaflet';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDirectionsState } from '../../store/directions/selectors';
import { greenMarker, redMarker } from '../../assets/icons';

export default function DirectionsLayer() {
  const directionsState = useSelector(selectDirectionsState);

  console.log(directionsState);

  return (
    <>
      {directionsState.start && (
        <Marker position={directionsState.start} icon={greenMarker} />
      )}
      {directionsState.end && (
        <Marker position={directionsState.end} icon={redMarker} />
      )}
      {directionsState.navigation && (
        <GeoJSON
          key={directionsState.navigationKey}
          data={directionsState.navigation}
        />
      )}
    </>
  );
}
