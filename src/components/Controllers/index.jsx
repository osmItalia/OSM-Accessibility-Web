import React, { useState } from 'react';
import Icon from '@ant-design/icons';
import { Button, Col, Drawer, Row, Switch, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getLayers, getShowAll } from '../../store/layers/selectors';
import { layersActions } from '../../store/layers/slice';
import { LAYERS } from '../../constants';
import { Media } from 'react-breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

function getType(layers, layer) {
  return layers.includes(layer) ? 'primary' : 'default';
}

function DesktopControllers() {
  const dispatch = useDispatch();
  const layers = useSelector(getLayers);
  const showAll = useSelector(getShowAll);

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
        <Tooltip
          placement="left"
          title={showAll ? 'Mostra tutti' : 'Nascondi tutti'}
        >
          <Button
            size="large"
            icon={<FontAwesomeIcon icon={showAll ? faEye : faEyeSlash} />}
            style={BUTTON_STYLE}
            onClick={() => dispatch(layersActions.setShowAll())}
          />
        </Tooltip>
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

function MobileControllers() {
  const layers = useSelector(getLayers);
  const dispatch = useDispatch();
  const showAll = useSelector(getShowAll);

  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: '9px',
          bottom: '145px',
          zIndex: 1000
        }}
      >
        <Button
          icon={<FontAwesomeIcon icon={faLayerGroup} />}
          onClick={() => setDrawer(true)}
          size="large"
        />
      </div>
      <Drawer
        visible={drawer}
        title="Punti d'interesse"
        onClose={() => setDrawer(false)}
      >
        {LAYERS.map(l => (
          <Row style={{ marginBottom: '.5rem' }} align="center">
            <Col span={3}>
              <Icon component={l.icon} />
            </Col>
            <Col span={17}>
              <span>{l.text}</span>
            </Col>
            <Col span={4}>
              <Switch
                checked={layers.includes(l.name)}
                onChange={() => dispatch(layersActions.toggleLayer(l.name))}
              />
            </Col>
          </Row>
        ))}
        <Button
          size="large"
          icon={
            <FontAwesomeIcon
              icon={showAll ? faEye : faEyeSlash}
              style={{ marginRight: '.5rem' }}
            />
          }
          style={{ margin: '1.5rem auto', display: 'block' }}
          onClick={() => dispatch(layersActions.setShowAll())}
        >
          {showAll ? 'Mostra tutti' : 'Nascondi tutti'}
        </Button>
      </Drawer>
    </>
  );
}

export default function Controllers() {
  return (
    <Media>
      {({ breakpoints, currentBreakpoint }) =>
        breakpoints[currentBreakpoint] > breakpoints.tablet ? (
          <DesktopControllers />
        ) : (
          <MobileControllers />
        )
      }
    </Media>
  );
}
