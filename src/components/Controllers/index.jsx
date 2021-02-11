import React, { useState } from 'react';
import Icon, { MailOutlined } from '@ant-design/icons';
import { Button, Drawer, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getLayers } from '../../store/layers/selectors';
import { layersActions } from '../../store/layers/slice';
import { LAYERS, NEWSLETTER_IFRAME_SRC } from '../../constants';
import AddNote from '../AddNote';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

function getType(layers, layer) {
  return layers.includes(layer) ? 'primary' : 'default';
}

export default function Controllers() {
  const dispatch = useDispatch();
  const layers = useSelector(getLayers);

  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: '3.5rem',
          top: '10px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Tooltip title="Ricevi aggiornamenti" placement="left">
          <Button
            size="large"
            icon={<MailOutlined />}
            onClick={e => {
              e.stopPropagation();
              setShowNewsletter(true);
            }}
            style={BUTTON_STYLE}
          />
        </Tooltip>
        <Drawer
          title="Rimani aggiornato"
          visible={showNewsletter}
          placement="left"
          width={350}
          bodyStyle={{ padding: 0, paddingTop: '1rem' }}
          onClose={() => setShowNewsletter(false)}
        >
          <iframe
            src={NEWSLETTER_IFRAME_SRC}
            title="Newsletter subscription"
            frameBorder={0}
            style={{ width: '100%', height: '60vh' }}
          />
        </Drawer>
        <AddNote />
      </div>
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
          <Tooltip title={l.text} placement="left">
            <Button
              size="large"
              type={getType(layers, l.name)}
              icon={<Icon component={l.icon} />}
              onClick={e => {
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
