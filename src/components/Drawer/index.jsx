import { Layout } from 'antd';
import React from 'react';
import MapSearch from '../Search';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/app/selectors';
import { MODES } from '../../constants';
import Directions from '../Directions';

export default function AppDrawer() {
  const app = useSelector(getAppState);

  return (
    <Layout.Sider
      width={350}
      collapsible
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={!app.sider}
      theme="light"
      style={{
        padding: app.sider ? '1rem' : 0
      }}
    >
      {app.mode === MODES.SEARCH && <MapSearch />}
      {app.mode === MODES.DIRECTIONS && <Directions />}
    </Layout.Sider>
  );
}
