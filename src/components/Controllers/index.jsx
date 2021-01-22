import React, { useState } from 'react';
import Icon, { MailOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app/slice';

import { ReactComponent as Restaurant } from '../../assets/restaurant-icon.svg';
import { ReactComponent as Bar } from '../../assets/bar-icon.svg';
import { ReactComponent as Shop } from '../../assets/shop-icon.svg';
import { getLayers } from '../../store/layers/selectors';
import { layersActions } from '../../store/layers/slice';
import { NEWSLETTER_IFRAME_SRC } from '../../constants';

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
