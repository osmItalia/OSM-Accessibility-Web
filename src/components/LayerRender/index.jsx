import { useSelector } from 'react-redux';
import { getFeaturesSelector } from '../../store/layers/selectors';
import React, { useMemo } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import MarkerCluster from '../Cluster';

export default function LayerRender() {
  const { features, points } = useSelector(getFeaturesSelector);

  const geojsonFeatures = useMemo(() => {
    return features.map(feature => <GeoJSON key={feature.id} data={feature} />);
  }, [features]);

  return (
    <>
      <MarkerCluster
        markers={points.map(point => ({
          position: point.geometry.coordinates,
          text:
            point.properties.amenity || point.properties.name
              ? `${point.properties.amenity} ${point.properties.name}`
              : point.id
        }))}
      />
      <LayerGroup>{geojsonFeatures}</LayerGroup>
    </>
  );
}
