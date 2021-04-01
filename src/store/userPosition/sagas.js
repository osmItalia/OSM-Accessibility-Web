import { takeLatest, call, put, select } from 'redux-saga/effects';
import { userPositionActions, userPositionSelectors } from './slice';
import { eventChannel, END } from 'redux-saga';
import { LatLng } from 'leaflet/dist/leaflet-src.esm';
import { notification } from 'antd';

function locationChangeChannel() {
  let watchId = null;
  // Return the event channel.
  const channel = eventChannel(emit => {
    console.log('starting to watch');
    // Close the channel after any errors in `watchPosition`.
    const onError = error => {
      console.log('stop watching');
      console.log(error);
      notification.error({
        message: "Si è verificato un'errore nell'ottenere la tua posizione",
        description: 'La funzionalità verrà disattivata'
      });
      emit(END);
    };

    // Invokes the `emit` callback whenever the location changes.
    watchId = navigator.geolocation.watchPosition(emit, onError);

    // The `eventChannel` call should return the unsubscribe
    // function, this will stop watching of the location of the user.
    return () => navigator.geolocation.clearWatch(watchId);
  });

  return {
    channel,
    watchId
  };
}

function* locationChange(payload) {
  if (payload === END) {
    yield put(userPositionActions.disable());
  } else {
    const pos = [payload.coords.latitude, payload.coords.longitude];
    if (window.USER_POSITION_FIRST_ZOOM) {
      window.LEAFLET_MAP.setView(new LatLng(...pos), 16);
      window.USER_POSITION_FIRST_ZOOM = false;
    }

    yield put(userPositionActions.setPosition(pos));
  }
}

// async function getPosition() {
//   return new Promise((res, rej) =>
//     navigator.geolocation.getCurrentPosition(res, rej)
//   );
// }

function* handleEnable() {
  window.USER_POSITION_FIRST_ZOOM = true;
  const { channel, watchId } = yield call(locationChangeChannel);
  yield put(userPositionActions.setGeowatch(watchId));
  try {
    yield takeLatest(channel, locationChange);
  } catch (e) {
    console.log(e);
    yield put(userPositionActions.disable());
  }
}

function* handleDisable() {
  const { geowatch } = yield select(userPositionSelectors.getState);
  navigator.geolocation.clearWatch(geowatch);
  yield put(userPositionActions.setGeowatch(null));
  yield put(userPositionActions.setPosition(null));
}

export function* watchUserPosition() {
  yield takeLatest(userPositionActions.enable.type, handleEnable);
  yield takeLatest(userPositionActions.disable.type, handleDisable);
}
