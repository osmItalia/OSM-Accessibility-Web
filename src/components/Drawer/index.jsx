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
import PositionToggler from './PositionToggler';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

const INFO_MODAL_CONTENT = (
  <>
    <p>
      Wikimedia Italia, nell’ambito delle progettualità legate all’accessibilità
      e alla condivisione delle informazioni, ha realizzato il progetto Percorsi
      Agili, una Web App che permette alle persone con disabilità di muoversi
      sul territorio usando OpenStreetMap, un progetto di mappatura libera e
      collaborativa, conosciuto anche come “la Wikipedia delle mappe”.
    </p>
    <p>
      Le persone con disabilità motoria incontrano quotidianamente difficoltà
      nell’organizzare i propri spostamenti a causa delle barriere
      architettoniche, del difficile accesso ai mezzi pubblici e delle scarse
      informazioni per raggiungere sentieri e percorsi di montagna adatti alle
      loro necessità.
    </p>
    <p>
      L’obiettivo del progetto è permettere alle persone con disabilità motoria
      di vivere la città (strade, nei negozi bar e ristoranti e sui mezzi di
      trasporto) senza barriere architettoniche. È importante valorizzare anche
      il tempo libero, agevolando la conoscenza di itinerari e sentieri
      percorribili con carrozzine, bastoni o deambulatori.
    </p>
    <p>
      La Web App permetterà alle persone con disabilità motoria di organizzare i
      propri spostamenti in città usando le mappe di OpenStreetMap, evidenziando
      informazioni relative ad esempio all&apos;accessibilità di strutture
      ricettive (negozi, bar e ristoranti), delle fermate degli autobus con
      presenza di rampe di accesso o delle stazioni ferroviarie.
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
              <PositionToggler />
              <Tooltip title="Rimani in contatto" placement="right">
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
