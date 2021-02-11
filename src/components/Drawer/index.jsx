import { Button, Card, notification } from 'antd';
import React, { useEffect } from 'react';
import MapSearch from '../Search';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/app/selectors';
import { DONATION_TEXT, MODES, PAYPAL_DONATION_URL } from '../../constants';
import Directions from '../Directions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

export default function AppDrawer() {
  const app = useSelector(getAppState);

  useEffect(() => {
    notification.info({
      placement: 'bottomLeft',
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
              <FontAwesomeIcon
                icon={faPaypal}
                style={{ marginRight: '.5rem' }}
              />
            }
          >
            Fai una donazione
          </Button>
        </>
      )
    });
  }, []);

  return (
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
  );
}
