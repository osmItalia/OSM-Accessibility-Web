import { Marker } from 'react-leaflet';
import React from 'react';
import { useSelector } from 'react-redux';
import { userPositionSelectors } from '../../store/userPosition/slice';
import { currentLocationMarker } from '../../assets/icons';

export default function UserPositionLayer() {
  const state = useSelector(userPositionSelectors.getState);

  return (
    <>
      {state.position && (
        <Marker position={state.position} icon={currentLocationMarker} />
      )}
    </>
  );
}
