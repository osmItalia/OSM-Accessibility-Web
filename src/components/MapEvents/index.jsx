import { useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { mapActions } from '../../store/map/slice';
import { useEffect } from 'react';

export default function MapEvents() {
  const dispatch = useDispatch();
  const map = useMapEvents({
    zoomend: () => {
      dispatch(mapActions.setZoom(map.getZoom()));
    },
    moveend: () => {
      dispatch(mapActions.setBounds(map.getBounds()));
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timeout);
  }, [map]);

  return null;
}
