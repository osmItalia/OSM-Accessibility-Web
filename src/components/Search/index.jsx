import { Button, Drawer, Input, List, Typography } from 'antd';
import { searchActions } from '../../store/search/reducer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoJSON, useMap } from 'react-leaflet';
import { bboxAsBounds } from '../../utils/geo';

export default function SearchDrawer() {
  const [visible] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector(st => st.search);
  const map = useMap();

  return (
    <>
      <Drawer
        visible={visible}
        closable={false}
        placement="left"
        mask={false}
        width={350}
      >
        <Input.Search
          name="destination"
          placeholder="Dove vuoi andare?"
          allowClear
          loading={state.loading}
          onSearch={val => dispatch(searchActions.changeInput(val))}
        />
        {state.list.length > 0 && (
          <Typography.Title level={4} style={{ marginTop: '1rem' }}>
            Risultati
          </Typography.Title>
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
                      map.flyToBounds(bboxAsBounds(item.bbox));
                    }}
                  >
                    Vedi
                  </Button>,
                  <Button>Naviga</Button>
                ]}
              >
                <List.Item.Meta title={item.properties.display_name} />
              </List.Item>
            )}
          />
        )}
      </Drawer>
      {state.list.map(f => (
        <GeoJSON data={f} key={f.properties.place_id} />
      ))}
    </>
  );
}
