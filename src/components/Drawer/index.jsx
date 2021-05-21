import { Button, Card, Drawer, Modal, notification, Tooltip } from 'antd';
import React, { useState, useCallback } from 'react';
import MapSearch from '../Search';
import { useSelector } from 'react-redux';
import { Media } from 'react-breakpoints';
import { getAppState } from '../../store/app/selectors';
import { MODES } from '../../constants';
import Directions from '../Directions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MailOutlined } from '@ant-design/icons';
import AddNote from '../AddNote';
import { selectIsAddingNote } from '../../store/notes/selectors';
import { faDonate, faInfo } from '@fortawesome/free-solid-svg-icons';
import PositionToggler from './PositionToggler';
import Tour from '../Tour';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

export default function AppDrawer() {
  const app = useSelector(getAppState);

  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const isAddingNote = useSelector(selectIsAddingNote);

  const openNotification = useCallback(() => {
    if (hasNotification) {
      return;
    }
    notification.info({
      placement: 'bottomRight',
      message: 'Sostieni Wikimedia Italia',
      icon: false,
      duration: null,
      onClose: () => setHasNotification(false),
      style: {
        width: '350px'
      },
      description: (
        <>
          <p style={{ marginBottom: 0 }}>{window.DONATION_TEXT}</p>
          <Button
            href={window.PAYPAL_DONATION_URL}
            target="_blank"
            style={{ marginTop: '1rem' }}
            type="primary"
            id="donate"
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
      <Modal
        visible={showInfo}
        title="Informazioni sul progetto"
        onCancel={() => setShowInfo(false)}
        footer={false}
      >
        <div dangerouslySetInnerHTML={{ __html: window.INFO_MODAL }} />
      </Modal>
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
              <PositionToggler />
              <Tooltip title="Rimani in contatto" placement="right">
                <Button
                  id="newsletter"
                  size="large"
                  icon={<MailOutlined />}
                  onClick={e => {
                    e.stopPropagation();
                    setShowNewsletter(true);
                  }}
                  style={BUTTON_STYLE}
                >
                  {breakpoints[currentBreakpoint] > breakpoints.tablet &&
                    'Rimani in contatto'}
                </Button>
              </Tooltip>
              <Drawer
                title="Rimani in contatto"
                visible={showNewsletter}
                placement="left"
                width={320}
                bodyStyle={{ padding: 0, paddingTop: '1rem' }}
                onClose={() => setShowNewsletter(false)}
              >
                <iframe
                  src={window.NEWSLETTER_IFRAME_SRC}
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
                  id="donate"
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon={faDonate}
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
                    'Sostieni Wikimedia Italia'}
                </Button>
              </Tooltip>
              <Tour
                breakpoints={breakpoints}
                currentBreakpoint={currentBreakpoint}
                style={BUTTON_STYLE}
              />
              <Tooltip
                title="Informazioni sul progetto Wikimedia OSM Disability"
                placement="right"
              >
                <Button
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon={faInfo}
                      style={{
                        marginRight:
                          breakpoints[currentBreakpoint] > breakpoints.tablet
                            ? '.5rem'
                            : '0'
                      }}
                    />
                  }
                  onClick={() => setShowInfo(true)}
                  style={BUTTON_STYLE}
                >
                  {breakpoints[currentBreakpoint] > breakpoints.tablet &&
                    'Info'}
                </Button>
              </Tooltip>
            </>
          )}
        </Media>
      </div>
    </>
  );
}
