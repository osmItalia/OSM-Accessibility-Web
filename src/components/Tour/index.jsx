import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app/slice';

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
      'Consenti a (percorsi agili) di accedere alla tua posizione per accompagnarti nel tuo percorso.',
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

export default function Tour() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    run: true,
    stepIndex: 0
  });

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
        setState({ run: false });
      }
    },
    [state, setState]
  );

  return (
    <Joyride
      stepIndex={state.stepIndex}
      steps={STEPS}
      callback={callback}
      continuous
      locale={LOCALE}
      showProgress
      run
      styles={{
        options: {
          // arrowColor: '#e3ffeb',
          // backgroundColor: '#e3ffeb',
          // overlayColor: 'rgba(79, 26, 0, 0.4)',
          // primaryColor: '#000',
          // textColor: '#004a14',
          // width: 900,
          zIndex: 1000
        }
      }}
    />
  );
}
