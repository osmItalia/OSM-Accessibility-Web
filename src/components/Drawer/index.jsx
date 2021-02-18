import { Button, Card, Drawer, notification, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import MapSearch from '../Search';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/app/selectors';
import {
  DONATION_TEXT,
  MODES,
  NEWSLETTER_IFRAME_SRC,
  PAYPAL_DONATION_URL
} from '../../constants';
import Directions from '../Directions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { MailOutlined } from '@ant-design/icons';
import AddNote from '../AddNote';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

function openNotification() {
  notification.info({
    placement: 'bottomRight',
    message: 'Supporta Wikimedia Italia',
    icon: false,
    duration: null,
    style: {
      width: '350px'
    },
    description: (
      <>
        <p style={{ marginBottom: 0 }}>{DONATION_TEXT}</p>
        <Button
          href={PAYPAL_DONATION_URL}
          target="_blank"
          style={{ marginTop: '1rem' }}
          type="primary"
          icon={
            <FontAwesomeIcon icon={faPaypal} style={{ marginRight: '.5rem' }} />
          }
        >
          Fai una donazione
        </Button>
      </>
    )
  });
}

export default function AppDrawer() {
  const app = useSelector(getAppState);

  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(openNotification, []);

  return (
    <>
      <Card
        style={{
          width: '350px',
          position: 'fixed',
          top: '.5rem',
          left: '.5rem',
          zIndex: 999
        }}
      >
        {app.mode === MODES.SEARCH && <MapSearch />}
        {app.mode === MODES.DIRECTIONS && <Directions />}
      </Card>
      <div
        style={{
          position: 'fixed',
          left: '.5rem',
          bottom: '.5rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start'
        }}
      >
        <Tooltip title="Ricevi aggiornamenti" placement="right">
          <Button
            size="large"
            icon={<MailOutlined />}
            onClick={e => {
              e.stopPropagation();
              setShowNewsletter(true);
            }}
            style={BUTTON_STYLE}
          >
            Ricevi Aggiornamenti
          </Button>
        </Tooltip>
        <Drawer
          title="Rimani aggiornato"
          visible={showNewsletter}
          placement="left"
          width={375}
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
        <Tooltip title="Fai una donazione a Wikimedia Italia" placement="right">
          <Button
            size="large"
            icon={
              <FontAwesomeIcon
                icon={faPaypal}
                style={{ marginRight: '.5rem' }}
              />
            }
            onClick={openNotification}
            style={BUTTON_STYLE}
          >
            Supportaci
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
