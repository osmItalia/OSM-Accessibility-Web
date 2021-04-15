import { useSelector } from 'react-redux';
import { getFeaturesGroupedByLayer } from '../../store/layers/selectors';
import React from 'react';
import MarkerCluster from '../Cluster';

export default function LayerRender() {
  const layers = useSelector(getFeaturesGroupedByLayer);

  // const geojsonFeatures = useMemo(() => {
  //   return features.map(feature => <GeoJSON key={feature.id} data={feature} />);
  // }, [features]);

  return (
    <>
      {Object.keys(layers).map(k => (
        <MarkerCluster
          key={k}
          layer={k}
          markers={layers[k].map(point => ({
            id: point.id,
            position: point.geometry.coordinates,
            layer: point.layer,
            wheelchair: point.properties.wheelchair,
            text: point.properties.name,
            tags: point.tags,
            properties: point.properties
          }))}
        />
      ))}
      {/* <LayerGroup>{geojsonFeatures}</LayerGroup> */}
    </>
  );
}
