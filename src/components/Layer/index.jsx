import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layersActions } from '../../store/layers/slice';
import { getLayersWithFeaturesSelector } from '../../store/layers/selectors';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import MarkerCluster from '../Cluster';
import find from 'lodash/find';

export default function Layer({ name, visibleAfterScale = 16 }) {
  const dispatch = useDispatch();
  const layers = useSelector(getLayersWithFeaturesSelector);

  const layer = useMemo(() => {
    return find(layers, l => l.name === name);
  }, [layers]);

  const features = useMemo(() => {
    if (!layer) {
      return null;
    }
    return layer.features.map(feature => (
      <GeoJSON key={feature.id} data={feature} />
    ));
  }, [layer]);

  useEffect(() => {
    dispatch(layersActions.fetch({ name, visibleAfterScale }));
  }, []);

  if (!layer) {
    return null;
  }

  console.log(layer);

  return (
    <>
      <MarkerCluster
        markers={layer.points.map(feature => ({
          position: feature.geometry.coordinates,
          text: feature.id
        }))}
      />
      <LayerGroup>{features}</LayerGroup>
    </>
  );
}
