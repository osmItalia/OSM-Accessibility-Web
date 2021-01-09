import React from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';
import { Marker, Popup } from 'react-leaflet';
import { getIconForFeature } from '../../assets/icons';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { directionsActions } from '../../store/directions/slice';
import { searchActions } from '../../store/search/reducer';
import { appActions } from '../../store/app/slice';

const MarkerCluster = ({ markers }) => {
  const dispatch = useDispatch();

  return (
    <MarkerClusterGroup key={markers.length}>
      {markers.map(({ position, text, layer, wheelchair, id }) => (
        <Marker
          key={id}
          position={[position[1], position[0]]}
          icon={getIconForFeature(layer, wheelchair)}
        >
          <Popup>
            <Typography.Title level={5}>{text}</Typography.Title>
            <div>
              <Button
                type="primary"
                style={{
                  margin: 'auto',
                  display: 'block'
                }}
                onClick={() => {
                  dispatch(directionsActions.setEndInput(text));
                  dispatch(
                    directionsActions.setEnd([position[1], position[0]])
                  );
                  dispatch(searchActions.cleanSearch());
                  dispatch(appActions.openDirections());
                }}
              >
                Vai
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default MarkerCluster;
