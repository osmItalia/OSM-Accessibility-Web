import React, { useMemo } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';
import { Marker, Popup } from 'react-leaflet';
import { getIconForFeature, ICONS_LAYERS_CLUSTER } from '../../assets/icons';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { directionsActions } from '../../store/directions/slice';
import { searchActions } from '../../store/search/reducer';
import { appActions } from '../../store/app/slice';

function getWCText(wh) {
  switch (wh) {
    case 'yes':
      return 'Si';
    case 'no':
      return 'No';
    case 'limited':
      return 'Limitata';
    default:
      return 'Sconosciuto';
  }
}

const MarkerCluster = ({ markers, layer: layerName }) => {
  const dispatch = useDispatch();

  const iconCreateFn = useMemo(() => {
    return () => ICONS_LAYERS_CLUSTER[layerName];
  }, [layerName]);

  return (
    <MarkerClusterGroup key={markers.length} iconCreateFunction={iconCreateFn}>
      {markers.map(({ position, text, layer, wheelchair, id, properties }) => (
        <Marker
          key={id}
          position={[position[1], position[0]]}
          icon={getIconForFeature(layer, wheelchair)}
        >
          <Popup>
            <Typography.Title level={5}>{text}</Typography.Title>
            <Typography.Text>
              Accessibile: {getWCText(properties.wheelchair)}
            </Typography.Text>
            <div
              style={{
                marginTop: '0.5rem'
              }}
            >
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
