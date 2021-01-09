import { useSelector } from 'react-redux';
import { getFeaturesSelector } from '../../store/layers/selectors';
import React from 'react';
// import { GeoJSON, LayerGroup } from 'react-leaflet';
import MarkerCluster from '../Cluster';

export default function LayerRender() {
  const { points } = useSelector(getFeaturesSelector);

  // const geojsonFeatures = useMemo(() => {
  //   return features.map(feature => <GeoJSON key={feature.id} data={feature} />);
  // }, [features]);

  return (
    <>
      <MarkerCluster
        markers={points.map(point => ({
          id: point.id,
          position: point.geometry.coordinates,
          layer: point.layer,
          wheelchair: point.properties.wheelchair,
          text: point.properties.name ? point.properties.name : point.id,
          properties: point.properties
        }))}
      />
      {/* <LayerGroup>{geojsonFeatures}</LayerGroup> */}
    </>
  );
}
