import { Button, Empty, Input, List, Tooltip, Typography } from 'antd';
import { searchActions } from '../../store/search/reducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bboxAsBounds } from '../../utils/geo';
import { CompassOutlined } from '@ant-design/icons';
import { appActions } from '../../store/app/slice';
import { directionsActions } from '../../store/directions/slice';

export default function MapSearch() {
  const dispatch = useDispatch();
  const state = useSelector(st => st.search);

  return (
    <>
      <div
        style={{
          display: 'flex'
        }}
      >
        <Input.Search
          id="search"
          name="destination"
          placeholder="Dove vuoi andare?"
          allowClear
          loading={state.loading}
          onSearch={val => dispatch(searchActions.changeInput(val))}
        />
        <Tooltip title="Ottieni indicazioni" trigger={['hover', 'focus']}>
          <Button
            icon={<CompassOutlined />}
            onClick={() => dispatch(appActions.openDirections())}
            aria-label="Ottieni indicazioni"
          />
        </Tooltip>
      </div>
      {state.list.length > 0 && (
        <Typography.Title level={4} style={{ marginTop: '1rem' }}>
          Risultati
        </Typography.Title>
      )}
      {!state.loading && state.list.length === 0 && state.input && (
        <Empty
          description="Nessun risultato trovato"
          style={{ marginTop: '1rem' }}
        />
      )}
      {(state.loading || (!state.loading && state.list.length > 0)) && (
        <List
          dataSource={state.list}
          loading={state.loading}
          style={{
            maxHeight: 'calc(100vh - 9rem)',
            overflowY: 'auto'
          }}
          itemLayout="vertical"
          rowKey="properties.place_id"
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  key="vedi"
                  onClick={() => {
                    console.log(item);
                    window.LEAFLET_MAP.flyToBounds(bboxAsBounds(item.bbox));
                  }}
                >
                  Vedi
                </Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(
                      directionsActions.setEndInput(
                        item.properties.display_name
                      )
                    );
                    dispatch(
                      directionsActions.setEnd([
                        item.geometry.coordinates[1],
                        item.geometry.coordinates[0]
                      ])
                    );
                    dispatch(searchActions.cleanSearch());
                    dispatch(appActions.openDirections());
                  }}
                >
                  Vai
                </Button>
              ]}
            >
              <List.Item.Meta title={item.properties.display_name} />
            </List.Item>
          )}
        />
      )}
    </>
  );
}
