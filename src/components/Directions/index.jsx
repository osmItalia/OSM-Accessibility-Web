import { Button, Col, Input, notification, Row, Select, Tooltip } from 'antd';
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
import { greenMarkerUrl, redMarkerUrl } from '../../assets/icons';
import { withBreakpoints } from 'react-breakpoints';

function Directions({ breakpoints, currentBreakpoint }) {
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
        <Tooltip title="In auto">
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
        <Tooltip title="In sedia a rotelle">
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
        <Row
          gutter={8}
          style={{
            marginBottom: '.5rem',
            alignItems: 'center'
          }}
        >
          <Col
            span={21}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <img src={greenMarkerUrl.replace('2x-', '')} alt="Icona partenza" />
            <Select
              name="start"
              placeholder="Partenza"
              allowClear
              showSearch
              showArrow={false}
              filterOption={false}
              value={state.startInput}
              onChange={val => dispatch(directionsActions.setStartInput(val))}
              onSearch={val => dispatch(directionsActions.onSearchStart(val))}
              style={{
                width:
                  breakpoints[currentBreakpoint] < breakpoints.mobileLandscape
                    ? '180px'
                    : '230px'
              }}
            >
              {state.startOptions.map(opt => (
                <Select.Option key={opt.key} value={opt.key}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={2}>
            <Tooltip title="Seleziona dalla mappa">
              <Button
                icon={
                  state.selectFromMap ? <CloseOutlined /> : <SelectOutlined />
                }
                disabled={state.selectFromMapDestination}
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
      <Input.Group>
        <Row
          gutter={8}
          style={{
            marginBottom: '.5rem',
            alignItems: 'center'
          }}
        >
          <Col
            span={21}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <img src={redMarkerUrl.replace('2x-', '')} alt="Icona arrivo" />
            <Select
              name="end"
              placeholder="Arrivo"
              allowClear
              showSearch
              showArrow={false}
              filterOption={false}
              value={state.endInput}
              onChange={val => dispatch(directionsActions.setEndInput(val))}
              onSearch={val => dispatch(directionsActions.onSearchEnd(val))}
              style={{
                width:
                  breakpoints[currentBreakpoint] < breakpoints.mobileLandscape
                    ? '180px'
                    : '230px'
              }}
            >
              {state.endOptions.map(opt => (
                <Select.Option key={opt.key} value={opt.key}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={2}>
            <Tooltip title="Seleziona dalla mappa">
              <Button
                icon={
                  state.selectFromMapDestination ? (
                    <CloseOutlined />
                  ) : (
                    <SelectOutlined />
                  )
                }
                disabled={state.selectFromMap}
                onClick={() => {
                  if (!state.selectFromMapDestination) {
                    notification.info({
                      message: 'Premi sulla mappa per selezionare il punto'
                    });
                  }
                  dispatch(directionsActions.toggleSelectFromMapDestination());
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Input.Group>
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

export default withBreakpoints(Directions);
