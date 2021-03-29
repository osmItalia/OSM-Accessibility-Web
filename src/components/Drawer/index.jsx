import { Button, Card, Drawer, Modal, notification, Tooltip } from 'antd';
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
import { MailOutlined } from '@ant-design/icons';
import AddNote from '../AddNote';
import { selectIsAddingNote } from '../../store/notes/selectors';
import {
  faDonate,
  faInfo,
  faQuestion
} from '@fortawesome/free-solid-svg-icons';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

const INFO_MODAL_CONTENT = (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec purus eget
      purus posuere scelerisque. Etiam ac ipsum at dolor interdum vehicula vitae
      ut sem. Vestibulum eget velit sed tellus euismod sodales sed ac metus.
      Vivamus blandit gravida mauris, a porttitor eros viverra non. Phasellus
      dui libero, rhoncus vel risus ac, bibendum venenatis velit. Aliquam a
      tristique tellus. Cras elementum feugiat orci. Fusce pellentesque erat vel
      leo fringilla, ut aliquet dolor pretium. Aenean nec accumsan lacus, congue
      efficitur mauris.{' '}
    </p>
    <p>
      Nulla auctor massa massa, sed bibendum justo luctus sed. Cras ligula nibh,
      ornare feugiat elementum vel, tristique eget eros. In hac habitasse platea
      dictumst. In vitae libero tincidunt mi lobortis sagittis. Maecenas
      imperdiet eu velit quis sodales. Pellentesque pellentesque urna ut urna
      porta ornare. In lorem dui, ultrices eget fermentum quis, dapibus a erat.
      Sed fringilla arcu at dolor laoreet, porttitor lobortis justo feugiat.
      Cras varius auctor lectus ut laoreet. Praesent tristique ante sit amet dui
      blandit, at dignissim quam auctor. Etiam non pharetra est, in sollicitudin
      purus. Fusce id erat odio. Duis sit amet fermentum eros, sed bibendum
      nulla. Vivamus rhoncus laoreet risus, non accumsan sapien ullamcorper vel.
      Mauris nec neque sit amet nunc fermentum fermentum at vitae lacus. Mauris
      sodales diam nec erat iaculis, non placerat eros faucibus. Vivamus libero
      neque, varius ac enim et, congue consectetur eros. Morbi fringilla, lorem
      ac pulvinar venenatis, massa nibh facilisis leo, et lobortis eros enim at
      nunc. Duis sagittis ornare sapien vitae pellentesque. Nam ultricies
      vehicula augue, sed rhoncus felis varius ut.
    </p>
    <p>
      Ut at sem quis urna laoreet varius. Nullam placerat tortor eros, a rutrum
      quam convallis a. Vestibulum quis sagittis velit, mollis vestibulum ante.
      Curabitur vitae gravida magna, eu consequat massa. Nulla at mi ex.
      Pellentesque interdum magna eget iaculis rhoncus. Aenean iaculis, velit
      non venenatis luctus, nisi dolor eleifend odio, id sodales nibh velit ac
      sem. Curabitur id dui aliquam, vestibulum diam non, ultricies turpis.
      Mauris vel bibendum felis, eu tempor augue. Vestibulum quis sem hendrerit,
      consectetur libero molestie, molestie erat. Quisque quis odio id arcu
      pulvinar pharetra. In eu dapibus neque, sit amet dapibus urna. Aliquam
      malesuada dictum elementum. Aenean eu malesuada felis.
    </p>
  </>
);

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
          <p style={{ marginBottom: 0 }}>{DONATION_TEXT}</p>
          <Button
            href={PAYPAL_DONATION_URL}
            target="_blank"
            style={{ marginTop: '1rem' }}
            type="primary"
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
        {INFO_MODAL_CONTENT}
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
              <Tooltip title="Rimani aggiornato" placement="right">
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
                    'Rimani aggiornato'}
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
                    breakpoints[currentBreakpoint] < breakpoints.tablet && (
                      <FontAwesomeIcon
                        icon={faDonate}
                        style={{
                          marginRight:
                            breakpoints[currentBreakpoint] > breakpoints.tablet
                              ? '.5rem'
                              : '0'
                        }}
                      />
                    )
                  }
                  onClick={openNotification}
                  style={BUTTON_STYLE}
                >
                  {breakpoints[currentBreakpoint] > breakpoints.tablet &&
                    'Sostieni Wikimedia'}
                </Button>
              </Tooltip>
              <Tooltip
                title="Guida all'utilizzo dell'applicazione"
                placement="right"
              >
                <Button
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon={faQuestion}
                      style={{
                        marginRight:
                          breakpoints[currentBreakpoint] > breakpoints.tablet
                            ? '.5rem'
                            : '0'
                      }}
                    />
                  }
                  style={BUTTON_STYLE}
                >
                  {breakpoints[currentBreakpoint] > breakpoints.tablet &&
                    'Guida'}
                </Button>
              </Tooltip>
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
