import { Button, Input, Tooltip } from 'antd';
import React from 'react';
import { CarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app/slice';
import { directionsActions } from '../../store/directions/slice';
import { selectDirectionsState } from '../../store/directions/selectors';

export default function Directions() {
  const dispatch = useDispatch();
  const state = useSelector(selectDirectionsState);

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: '1rem'
        }}
      >
        <Tooltip title="Auto">
          <Button
            type="primary"
            icon={<CarOutlined />}
            size="large"
            shape="circle"
            style={{ marginRight: '.5rem' }}
          />
        </Tooltip>
        <Tooltip title="A piedi">
          <Button
            icon={<CarOutlined />}
            size="large"
            shape="circle"
            style={{ marginRight: '.5rem' }}
          />
        </Tooltip>
        <Tooltip title="Sedia a rotelle">
          <Button
            icon={<CarOutlined />}
            size="large"
            shape="circle"
            style={{ marginRight: '.5rem' }}
          />
        </Tooltip>
      </div>
      <Input.Search
        name="start"
        placeholder="Partenza"
        allowClear
        addonAfter={null}
        enterButton={false}
        className="hide-search"
        style={{
          marginBottom: '.5rem'
        }}
        value={state.startInput}
        onChange={e =>
          dispatch(directionsActions.setStartInput(e.target.value))
        }
        loading={state.loadingStart}
        onSearch={() => dispatch(directionsActions.onSearchStart())}
        onBlur={() => dispatch(directionsActions.onSearchStart())}
      />
      <Input.Search
        name="end"
        placeholder="Arrivo"
        addonAfter={null}
        enterButton={false}
        className="hide-search"
        allowClear
        loading={state.loadingEnd}
        value={state.endInput}
        onChange={e => dispatch(directionsActions.setEndInput(e.target.value))}
        onSearch={() => dispatch(directionsActions.onSearchEnd())}
        onBlur={() => dispatch(directionsActions.onSearchEnd())}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.5rem'
        }}
      >
        <Button onClick={() => dispatch(directionsActions.invert())}>
          Inverti
        </Button>
        <Button
          onClick={() => dispatch(appActions.openSearch())}
          style={{
            marginLeft: 'auto'
          }}
        >
          Annulla
        </Button>
      </div>
    </>
  );
}
