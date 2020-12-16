import { useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { mapActions } from '../../store/map/slice';

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

  return null;
}
