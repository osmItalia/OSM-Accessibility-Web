import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app/slice';
import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const LOCALE = {
  back: 'Indietro',
  close: 'Chiudi',
  last: 'Ultimo',
  next: 'Successivo',
  skip: 'Salta'
};

const STEPS = [
  {
    content:
      'Consenti a Percorsi agili di accedere alla tua posizione per accompagnarti nel tuo percorso.',
    target: '#position'
  },
  {
    content: 'Inserisci la tua destinazione',
    target: '#search'
  },
  {
    content: 'Scegli come muoverti',
    target: '#transport-mean'
  },
  {
    content: 'Inserisci il punto di partenza e di arrivo',
    target: '#directions-group'
  },
  {
    content: 'Oppure seleziona i luoghi dalla mappa',
    target: '#select-from-map-start'
  },
  {
    content: 'Fatti guidare da noi',
    target: '#start-navigation'
  },
  {
    content:
      "Mostra i punti d'interesse (Ad esempio trasporti, ristoranti, etc.)",
    target: '#poi-toggle'
  },
  {
    content:
      'Aggiungi una segnalazione se trovi un errore o una mancanza sulla mappa. I volontari di OpenStreetMap provvederanno a controllare il prima possibile',
    target: '#osm-note'
  },
  {
    content:
      'Vuoi ricevere notizie sulle nostre attività? Iscriviti alla newsletter di Wikimedia Italia',
    target: '#newsletter'
  },
  {
    content:
      'Vuoi contribuire allo sviluppo di altri progetti come questo? Fai una donazione a Wikimedia Italia',
    target: '#donate'
  }
];

export default function Tour({ breakpoints, currentBreakpoint, style }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    run: false,
    stepIndex: 0
  });

  useEffect(() => {
    const runTour = localStorage.getItem('RUN_TOUR');
    if (!runTour) {
      setState({ run: true, stepIndex: 0 });
    }
  }, []);

  const callback = useCallback(
    data => {
      const { action, index, status, type, lifecycle } = data;

      if (index === 1 && action === 'next' && lifecycle === 'complete') {
        dispatch(appActions.openDirections());
      }

      if (index === 2 && action === 'prev' && lifecycle === 'complete') {
        dispatch(appActions.openSearch());
      }

      if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
      } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        localStorage.setItem('RUN_TOUR', 'done');
        setState({ run: false });
      }
    },
    [state, setState]
  );

  return (
    <>
      <Tooltip title="Guida all'utilizzo dell'applicazione" placement="right">
        <Button
          size="large"
          onClick={() => setState({ run: true, stepIndex: 0 })}
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
          style={style}
        >
          {breakpoints[currentBreakpoint] > breakpoints.tablet && 'Guida'}
        </Button>
      </Tooltip>
      <Joyride
        stepIndex={state.stepIndex}
        steps={STEPS}
        callback={callback}
        continuous
        locale={LOCALE}
        showProgress
        showSkipButton
        run={state.run}
        styles={{
          options: {
            zIndex: 1000
          }
        }}
      />
    </>
  );
}
