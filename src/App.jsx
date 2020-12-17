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
import SearchDrawer from './components/Search';
import Layer from './components/Layer';
import MapEvents from './components/MapEvents';

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
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ height: '100vh' }}>
        <MapContainer
          center={[45.4624676, 9.1716306]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '100vh' }}
          zoomControl={false}
          whenCreated={setupMapReference}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Layer name="shops" />
          <Layer name="crossing" />
          <SearchDrawer />
          <MapEvents />
        </MapContainer>
      </Layout.Content>
    </Layout>
  );
}

export default App;
