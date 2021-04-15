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
import { TAGS, TAGS_GENERIC } from '../../constants';

function getWCText(wh) {
  switch (wh) {
    case 'yes':
      return 'Accessibile';
    case 'no':
      return 'Non accessibile';
    case 'limited':
      return 'Accessibile con limitazioni';
    default:
      return "Nessuna informazione sull'accessibilità";
  }
}

function getAddress(props) {
  const p = { ...props };
  if (typeof p['addr:postcode'] === 'undefined') {
    p['addr:postcode'] = '20162';
  }
  if (typeof p['addr:city'] === 'undefined') {
    p['addr:city'] = 'Milano';
  }
  if (typeof p['addr:housenumber'] === 'undefined') {
    p['addr:housenumber'] = '';
  }
  if (typeof p['addr:street'] !== 'undefined') {
    return `${p['addr:street']}${
      p['addr:housenumber'] ? ` ${p['addr:housenumber']}` : ''
    }, ${p['addr:postcode']} ${p['addr:city']}`;
  }
  return '';
}

function getTag(tags) {
  let tag = null;
  try {
    tags.forEach(t => {
      if (TAGS[t]) {
        tag = TAGS[t];
        throw Error('Simulate a short circuit and break the loop');
      }
    });
  } catch (e) {
    // just ignore the error
  }
  if (!tag) {
    try {
      tags.forEach(t => {
        const generic = t.split('=')[0];
        if (TAGS_GENERIC[generic]) {
          tag = TAGS_GENERIC[generic];
          throw Error('Simulate a short circuit and break the loop');
        }
      });
    } catch (e) {
      // just ignore the error
    }
  }
  return tag;
}

const MarkerCluster = ({ markers, layer: layerName }) => {
  const dispatch = useDispatch();

  const iconCreateFn = useMemo(() => {
    return () => ICONS_LAYERS_CLUSTER[layerName];
  }, [layerName]);

  return (
    <MarkerClusterGroup key={markers.length} iconCreateFunction={iconCreateFn}>
      {markers.map(
        ({ position, text, layer, wheelchair, id, properties, tags }) => (
          <Marker
            key={id}
            position={[position[1], position[0]]}
            icon={getIconForFeature(layer, wheelchair)}
          >
            <Popup>
              <Typography.Title level={5}>{getTag(tags)}</Typography.Title>
              {text && (
                <div>
                  <Typography.Text>{text}</Typography.Text>
                </div>
              )}
              <div>
                <Typography.Text>{getAddress(properties)}</Typography.Text>
              </div>
              <div>
                <Typography.Text>
                  {getWCText(properties.wheelchair)}
                </Typography.Text>
              </div>
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
        )
      )}
    </MarkerClusterGroup>
  );
};

export default MarkerCluster;
