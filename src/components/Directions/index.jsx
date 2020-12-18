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
        style={{
          marginBottom: '.5rem'
        }}
        value={state.startInput}
        onChange={e =>
          dispatch(directionsActions.setStartInput(e.target.value))
        }
        loading={state.loadingStart}
        onSearch={val => dispatch(directionsActions.onSearchStart(val))}
      />
      <Input.Search
        name="end"
        placeholder="Arrivo"
        allowClear
        loading={state.loadingEnd}
        value={state.endInput}
        onChange={e => dispatch(directionsActions.setEndInput(e.target.value))}
        onSearch={val => dispatch(directionsActions.onSearchEnd(val))}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '0.5rem'
        }}
      >
        <Button>Inverti</Button>
        <Button
          onClick={() => dispatch(appActions.openSearch())}
          style={{
            marginRight: '1rem',
            marginLeft: 'auto'
          }}
        >
          Annulla
        </Button>
        <Button
          type="primary"
          disabled={!state.start || !state.end}
          onClick={() => dispatch(directionsActions.navigate())}
        >
          Avvia
        </Button>
      </div>
    </>
  );
}
