import React from 'react';
import { Dropdown, Menu, Switch, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getA11yFilter } from '../../store/layers/selectors';
import { layersActions } from '../../store/layers/slice';

const ACCESSIBILITY_LEVELS = {
  yes: 'Accessibile',
  no: 'Non Accessibile',
  limited: 'Accessibilità limitata',
  unknown: 'Nessuna informazione'
};

export default function AccessibilityLevel({ children }) {
  const state = useSelector(getA11yFilter);
  const dispatch = useDispatch();

  const menu = (
    <Menu style={{ padding: '1rem 2rem' }}>
      {Object.keys(ACCESSIBILITY_LEVELS).map(l => (
        <div key={l} style={{ padding: '.2rem 0rem' }}>
          <Switch
            checked={state[l]}
            onChange={() => dispatch(layersActions.toggleFilter(l))}
          />{' '}
          {ACCESSIBILITY_LEVELS[l]}
        </div>
      ))}
    </Menu>
  );

  return (
    <Tooltip placement="left" title="Filtra per Accessibilità">
      <Dropdown overlay={menu} trigger={['click']}>
        {children}
      </Dropdown>
    </Tooltip>
  );
}
