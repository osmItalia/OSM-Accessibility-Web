import { useEffect } from 'react';
import { layersActions } from '../../store/layers/slice';
import { useDispatch } from 'react-redux';

export default function Layer({ name, visibleAfterScale = 1 }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layersActions.fetch({ name, visibleAfterScale }));
  }, []);

  return null;
}
