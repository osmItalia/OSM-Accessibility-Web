import React, { useCallback } from 'react';
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

  return (
    <Layout>
      <AppDrawer />
      <Layout style={{ minHeight: '100vh', maxWidth: '100%' }}>
        <Layout.Content style={{ height: '100vh' }}>
          <MapContainer
            center={[45.5074, 9.1924]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: '100vh', maxWidth: '100%' }}
            zoomControl={false}
            whenCreated={setupMapReference}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Layer name="shops" />
            <Layer name="restaurants" />
            <Layer name="bars" />
            <LayerRender />
            <SearchLayer />
            <DirectionsLayer />
            <MapEvents />
            <Controllers />
          </MapContainer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
