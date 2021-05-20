import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  userPositionActions,
  userPositionSelectors
} from '../../store/userPosition/slice';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

export default function PositionToggler() {
  const state = useSelector(userPositionSelectors.getState);
  const dispatch = useDispatch();

  const toggle = () => {
    if (state.enabled) {
      dispatch(userPositionActions.disable());
    } else {
      dispatch(userPositionActions.enable());
    }
  };

  return (
    <Tooltip
      title={state.enabled ? 'Disattiva Posizione' : `Attiva Posizione`}
      placement="right"
    >
      <Button
        id="position"
        type={state.enabled ? 'primary' : 'default'}
        size="large"
        icon={<FontAwesomeIcon icon={faLocationArrow} />}
        onClick={e => {
          e.stopPropagation();
          toggle();
        }}
        style={BUTTON_STYLE}
      />
    </Tooltip>
  );
}
