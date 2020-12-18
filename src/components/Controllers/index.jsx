import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app/slice';

export default function Controllers() {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
        top: '10px',
        zIndex: 1000
      }}
    >
      <Button
        size="large"
        icon={<SearchOutlined />}
        onClick={e => {
          e.stopPropagation();
          dispatch(appActions.toggleSider());
        }}
      />
    </div>
  );
}
