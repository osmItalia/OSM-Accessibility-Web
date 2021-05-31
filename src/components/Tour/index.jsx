import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app/slice';
import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

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

      if (
        window.STEPS[index].onNext &&
        action === 'next' &&
        lifecycle === 'complete'
      ) {
        dispatch(appActions[window.STEPS[index].onNext]());
      }

      if (
        window.STEPS[index].onPrev &&
        action === 'prev' &&
        lifecycle === 'complete'
      ) {
        dispatch(appActions[window.STEPS[index].onPrev]());
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
      <Tooltip
        title="Guida all'utilizzo dell'applicazione"
        placement="right"
        trigger={['hover', 'focus']}
      >
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
        {...window.TOUR_CONFIG}
        stepIndex={state.stepIndex}
        callback={callback}
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
