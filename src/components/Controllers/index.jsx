import React from 'react';
import Icon from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getLayers } from '../../store/layers/selectors';
import { layersActions } from '../../store/layers/slice';
import { LAYERS } from '../../constants';

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
    <>
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
        {LAYERS.map(l => (
          <Tooltip title={l.text} placement="left" key={l.name}>
            <Button
              size="large"
              type={getType(layers, l.name)}
              icon={<Icon component={l.icon} />}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(layersActions.toggleLayer(l.name));
              }}
              onDoubleClick={e => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(layersActions.toggleLayer(l.name));
              }}
              style={BUTTON_STYLE}
            />
          </Tooltip>
        ))}
      </div>
    </>
  );
}
