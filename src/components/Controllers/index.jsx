import React from 'react';
import Icon, { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app/slice';

import { ReactComponent as Restaurant } from '../../assets/restaurant-icon.svg';
import { ReactComponent as Bar } from '../../assets/bar-icon.svg';
import { ReactComponent as Shop } from '../../assets/shop-icon.svg';
import { getLayers } from '../../store/layers/selectors';
import { layersActions } from '../../store/layers/slice';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

function getType(layers, layer) {
  return layers.includes(layer) ? 'primary' : 'default';
}

export default function Controllers() {
  const dispatch = useDispatch();
  const layers = useSelector(getLayers);
  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
        top: '10px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Tooltip title="Mostra ricerca e navigazione" placement="left">
        <Button
          size="large"
          icon={<SearchOutlined />}
          onClick={e => {
            e.stopPropagation();
            dispatch(appActions.toggleSider());
          }}
          style={BUTTON_STYLE}
        />
      </Tooltip>
      <Tooltip title="Ristoranti" placement="left">
        <Button
          size="large"
          type={getType(layers, 'restaurants')}
          icon={<Icon component={Restaurant} />}
          onClick={e => {
            e.stopPropagation();
            dispatch(layersActions.toggleLayer('restaurants'));
          }}
          style={BUTTON_STYLE}
        />
      </Tooltip>
      <Tooltip title="Bar" placement="left">
        <Button
          size="large"
          type={getType(layers, 'bars')}
          icon={<Icon component={Bar} />}
          onClick={e => {
            e.stopPropagation();
            dispatch(layersActions.toggleLayer('bars'));
          }}
          style={BUTTON_STYLE}
        />
      </Tooltip>
      <Tooltip title="Negozi" placement="left">
        <Button
          size="large"
          type={getType(layers, 'shops')}
          icon={<Icon component={Shop} />}
          onClick={e => {
            e.stopPropagation();
            dispatch(layersActions.toggleLayer('shops'));
          }}
          style={BUTTON_STYLE}
        />
      </Tooltip>
    </div>
  );
}
