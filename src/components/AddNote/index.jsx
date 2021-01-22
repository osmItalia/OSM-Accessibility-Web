import React from 'react';
import { Button, Form, Modal, Tooltip, Input, notification } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { noteActions } from '../../store/notes/slice';
import { selectNoteState } from '../../store/notes/selectors';

const BUTTON_STYLE = {
  marginBottom: '.3rem'
};

export default function AddNote() {
  const dispatch = useDispatch();
  const state = useSelector(selectNoteState);

  return (
    <>
      <Modal
        visible={state.position}
        title="Inserisci Nota su OSM"
        onCancel={() => dispatch(noteActions.close())}
        footer={false}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={data => dispatch(noteActions.sendNote(data))}
        >
          <Form.Item name="text" label="Nota" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Invia
          </Button>
        </Form>
      </Modal>
      <Tooltip title="Aggiungi nota OSM" placement="left">
        <Button
          size="large"
          icon={<PushpinOutlined />}
          onClick={e => {
            e.stopPropagation();
            if (!state.selectFromMap) {
              notification.info({
                message: 'Premi sulla mappa per selezionare il punto'
              });
            }
            dispatch(noteActions.toggleSelectFromMap());
          }}
          style={BUTTON_STYLE}
        />
      </Tooltip>
    </>
  );
}
