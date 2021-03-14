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
        <p>
          Usate questa funzione per segnalare errori o fornire maggiori dettagli
          su un elemento, per esempio il nome di una strada o un indirizzo.
          Quando sarà possibile, un utente OSM sistemerà il problema segnalato.
        </p>
        <p>
          La tua nota sarà pubblica e potrà essere usata per aggiornare la
          mappa, perciò non fornire dati personali né informazioni derivanti da
          mappe o database protetti da copyright.
        </p>
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
      <Tooltip
        title="Hai scoperto un errore o una mancanza nella mappa? Apri una segnalazione in modo che altri mappatori possano correggere l'errore."
        placement="right"
      >
        <Button
          size="large"
          icon={<PushpinOutlined />}
          onClick={e => {
            e.stopPropagation();
            if (!state.selectFromMap) {
              notification.info({
                message:
                  "Premi per posizionare il marker sulla posizione esatta dell'errore o della mancanza"
              });
            }
            dispatch(noteActions.toggleSelectFromMap());
          }}
          style={BUTTON_STYLE}
        >
          Aggiungi Nota OSM
        </Button>
      </Tooltip>
    </>
  );
}
