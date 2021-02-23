import React from 'react';
import { Col, Modal, Row } from 'antd';
import { ACCESSIBILITY_CLASSNAME, LAYERS } from '../../constants';

const STYLE = cluster => ({
  width: cluster ? '34px' : '50px',
  height: cluster ? '34px' : '50px'
});

export default function DebugMarker({ visible }) {
  if (!visible) {
    return false;
  }

  return (
    <Modal visible>
      {LAYERS.map(l => (
        <Row key={l.name} style={{ height: '70px' }} align="center">
          <Col span={6}>{l.text}</Col>
          {Object.keys(ACCESSIBILITY_CLASSNAME).map(cn => (
            <Col span={3} key={cn}>
              <div
                className={`leaflet-marker-icon layer-icon leaflet-zoom-animated leaflet-interactive ${ACCESSIBILITY_CLASSNAME[cn]} ${cn}`}
                style={STYLE(cn === 'cluster')}
              >
                {cn === 'cluster' ? <l.icon /> : <l.marker />}
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Modal>
  );
}
