import { Button, Input, Tooltip } from 'antd';
import React from 'react';
import { CarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app/slice';

export default function Directions() {
  const dispatch = useDispatch();

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
        onSearch={() => console.log('search')}
      />
      <Input.Search
        name="end"
        placeholder="Arrivo"
        allowClear
        style={{}}
        onSearch={() => console.log('search')}
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
        <Button type="primary">Avvia</Button>
      </div>
    </>
  );
}
