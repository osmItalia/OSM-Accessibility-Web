import { useSelector } from 'react-redux';
import { GeoJSON } from 'react-leaflet';
import React from 'react';

export default function SearchLayer() {
  const state = useSelector(st => st.search);

  return state.list.map(f => <GeoJSON data={f} key={f.properties.place_id} />);
}
