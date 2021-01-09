import { Button, Col, Input, notification, Row, Tooltip } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app/slice';
import { directionsActions } from '../../store/directions/slice';
import { selectDirectionsState } from '../../store/directions/selectors';
import {
  faCar,
  faWalking,
  faWheelchair
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRAVEL_MEAN } from '../../constants';
import { CloseOutlined, SelectOutlined } from '@ant-design/icons';

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
            type={state.travelMean === TRAVEL_MEAN.CAR ? 'primary' : 'default'}
            icon={<FontAwesomeIcon icon={faCar} />}
            size="large"
            shape="circle"
            style={{ marginRight: '.5rem' }}
            onClick={() =>
              dispatch(directionsActions.setTravelMean(TRAVEL_MEAN.CAR))
            }
          />
        </Tooltip>
        <Tooltip title="A piedi">
          <Button
            type={state.travelMean === TRAVEL_MEAN.FOOT ? 'primary' : 'default'}
            icon={<FontAwesomeIcon icon={faWalking} />}
            size="large"
            shape="circle"
            style={{ marginRight: '.5rem' }}
            onClick={() =>
              dispatch(directionsActions.setTravelMean(TRAVEL_MEAN.FOOT))
            }
          />
        </Tooltip>
        <Tooltip title="Sedia a rotelle">
          <Button
            type={
              state.travelMean === TRAVEL_MEAN.WHEELCHAIR
                ? 'primary'
                : 'default'
            }
            icon={<FontAwesomeIcon icon={faWheelchair} />}
            size="large"
            shape="circle"
            style={{ marginRight: '.5rem' }}
            onClick={() =>
              dispatch(directionsActions.setTravelMean(TRAVEL_MEAN.WHEELCHAIR))
            }
          />
        </Tooltip>
      </div>
      <Input.Group>
        <Row gutter={8}>
          <Col span={21}>
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
          </Col>
          <Col span={2}>
            <Tooltip title="Seleziona dalla mappa">
              <Button
                icon={
                  state.selectFromMap ? <CloseOutlined /> : <SelectOutlined />
                }
                onClick={() => {
                  if (!state.selectFromMap) {
                    notification.info({
                      message: 'Premi sulla mappa per selezionare il punto'
                    });
                  }
                  dispatch(directionsActions.toggleSelectFromMap());
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Input.Group>
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
        <Button
          type="primary"
          onClick={() => dispatch(directionsActions.navigate())}
          style={{ marginLeft: '.5rem' }}
          disabled={!state.start || !state.end}
          loading={
            state.loadingStart || state.loadingEnd || state.navigationLoading
          }
        >
          Vai
        </Button>
      </div>
    </>
  );
}
