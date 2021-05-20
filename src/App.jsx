import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from 'antd';

import {
  // GeoJSON,
  MapContainer,
  // Marker,
  // Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import Layer from './components/Layer';
import MapEvents from './components/MapEvents';
import LayerRender from './components/LayerRender';
import SearchLayer from './components/Search/SearchLayer';
import AppDrawer from './components/Drawer';
import Controllers from './components/Controllers';
import DirectionsLayer from './components/Directions/DirectionsLayer';
import { useSelector } from 'react-redux';
import { getIsSelectingFromMap } from './store/app/selectors';
import { CENTER, LAYERS } from './constants';
import DebugMarker from './components/DebugMarkers';
import UserPositionLayer from './components/UserPosition';
import Tour from './components/Tour';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl,
  shadowUrl
});

function App() {
  const setupMapReference = useCallback(map => {
    window.LEAFLET_MAP = map;
  }, []);

  const [height, setHeight] = useState();

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

  const isSelectingPoint = useSelector(getIsSelectingFromMap);

  return (
    <Layout
      style={{
        height: `${height}px`
      }}
    >
      <Tour />
      <AppDrawer />
      <DebugMarker visible={false} />
      <Controllers />
      <Layout style={{ maxWidth: '100%', height: '100%' }}>
        <Layout.Content style={{ height: '100%' }}>
          <MapContainer
            tap={false}
            center={CENTER}
            zoom={16}
            scrollWheelZoom
            zoomControl={false}
            whenCreated={setupMapReference}
            style={{
              maxWidth: '100%',
              height: '100%',
              cursor: isSelectingPoint ? 'crosshair' : 'auto'
            }}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            {LAYERS.map(l => (
              <Layer name={l.name} key={l.name} />
            ))}
            <LayerRender />
            <SearchLayer />
            <DirectionsLayer />
            <MapEvents />
            <UserPositionLayer />
          </MapContainer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
