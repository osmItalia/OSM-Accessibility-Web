import { Button, Card, Drawer, notification, Tooltip } from 'antd';
import React, { useState, useCallback } from 'react';
import MapSearch from '../Search';
import { useSelector } from 'react-redux';
import { Media } from 'react-breakpoints';
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
import { selectIsAddingNote } from '../../store/notes/selectors';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

export default function AppDrawer() {
  const app = useSelector(getAppState);

  const [showNewsletter, setShowNewsletter] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const isAddingNote = useSelector(selectIsAddingNote);

  const openNotification = useCallback(() => {
    if (hasNotification) {
      return;
    }
    notification.info({
      placement: 'bottomRight',
      message: 'Supporta Wikimedia Italia',
      icon: false,
      duration: null,
      onClose: () => setHasNotification(false),
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
    setHasNotification(true);
  }, [hasNotification]);

  return (
    <>
      {!isAddingNote && (
        <Card
          style={{
            maxWidth: '350px',
            position: 'fixed',
            top: '.5rem',
            left: '.5rem',
            zIndex: 999
          }}
        >
          {app.mode === MODES.SEARCH && <MapSearch />}
          {app.mode === MODES.DIRECTIONS && <Directions />}
        </Card>
      )}
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
        <Media>
          {({ breakpoints, currentBreakpoint }) => (
            <>
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
                  {breakpoints[currentBreakpoint] > breakpoints.tablet &&
                    'Ricevi Aggiornamenti'}
                </Button>
              </Tooltip>
              <Drawer
                title="Rimani aggiornato"
                visible={showNewsletter}
                placement="left"
                width={320}
                bodyStyle={{ padding: 0, paddingTop: '1rem' }}
                onClose={() => setShowNewsletter(false)}
              >
                <iframe
                  src={NEWSLETTER_IFRAME_SRC}
                  title="Newsletter subscription"
                  frameBorder={0}
                  style={{ width: '100%', height: '90vh' }}
                />
              </Drawer>
              <AddNote
                showText={breakpoints[currentBreakpoint] > breakpoints.tablet}
              />
              <Tooltip
                title="Fai una donazione a Wikimedia Italia"
                placement="right"
              >
                <Button
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon={faPaypal}
                      style={{
                        marginRight:
                          breakpoints[currentBreakpoint] > breakpoints.tablet
                            ? '.5rem'
                            : '0'
                      }}
                    />
                  }
                  onClick={openNotification}
                  style={BUTTON_STYLE}
                >
                  {breakpoints[currentBreakpoint] > breakpoints.tablet &&
                    'Supportaci'}
                </Button>
              </Tooltip>
            </>
          )}
        </Media>
      </div>
    </>
  );
}
