import L from 'leaflet';
import { ReactComponent as RestaurantIcon } from './assets/restaurant-icon.svg';
import { ReactComponent as ShopIcon } from './assets/shop-icon.svg';
import { ReactComponent as HealthIcon } from './assets/health-icon.svg';
import { ReactComponent as EducationIcon } from './assets/education-icon.svg';
import { ReactComponent as AuthoritiesIcon } from './assets/authorities-icon.svg';
import { ReactComponent as LeisureIcon } from './assets/leisure-icon.svg';
import { ReactComponent as ToiletsIcon } from './assets/toilets-icon.svg';
import { ReactComponent as TransportIcon } from './assets/transport-icon.svg';
import { ReactComponent as FinanceIcon } from './assets/finance-icon.svg';
import { ReactComponent as SportIcon } from './assets/sport-icon.svg';
import { ReactComponent as TourismIcon } from './assets/tourism-icon.svg';
import { ReactComponent as ReligionIcon } from './assets/religion-icon.svg';

import { ReactComponent as AuthoritiesMarker } from './assets/authorities.svg';
import { ReactComponent as RestaurantMarker } from './assets/restaurant.svg';
import { ReactComponent as ShopMarker } from './assets/shop.svg';
import { ReactComponent as EducationMarker } from './assets/education.svg';
import { ReactComponent as FinanceMarker } from './assets/finance.svg';
import { ReactComponent as HealthMarker } from './assets/health.svg';
import { ReactComponent as LeisureMarker } from './assets/leisure.svg';
import { ReactComponent as ToiletsMarker } from './assets/toilets.svg';
import { ReactComponent as TransportMarker } from './assets/transport.svg';

export const CENTER = [45.5074, 9.1924];

export const DONATION_TEXT = 'Supporta le nostre attività';

export const customMarker = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

export const ACCESSIBILITY_CLASSNAME = {
  yes: 'accessibility_yes',
  no: 'accessibility_no',
  limited: 'accessibility_limited',
  unknown: 'accessibility_unknown',
  cluster: 'accessibility_cluster'
};

export const MODES = {
  SEARCH: 'search',
  DIRECTIONS: 'directions'
};

export const TRAVEL_MEAN = {
  CAR: 'driving-car',
  FOOT: 'foot-walking',
  WHEELCHAIR: 'wheelchair'
};

export const NEWSLETTER_IFRAME_SRC =
  'https://www.webarea.services/form_give/index.php?pagina=form&action=viewForm&idform=474&idEnass=c8ffe9a587b126f152ed3d89a146b445';

export const PAYPAL_DONATION_URL =
  'https://www.paypal.com/donate/?business=ECAW27MH2UEPU&item_name=test&currency_code=EUR';

export const OSM_NOTE_API =
  'https://master.apis.dev.openstreetmap.org/api/0.6/notes';

export const LAYERS = [
  {
    name: 'restaurants',
    icon: RestaurantIcon,
    text: 'Ristorazione',
    marker: RestaurantMarker
  },
  { name: 'shops', icon: ShopIcon, text: 'Shopping', marker: ShopMarker },
  { name: 'health', icon: HealthIcon, text: 'Salute', marker: HealthMarker },
  {
    name: 'education',
    icon: EducationIcon,
    text: 'Istruzione',
    marker: EducationMarker
  },
  {
    name: 'authorities',
    icon: AuthoritiesIcon,
    text: 'Autorità',
    marker: AuthoritiesMarker
  },
  {
    name: 'leisure',
    icon: LeisureIcon,
    text: 'Tempo Libero',
    marker: LeisureMarker
  },
  {
    name: 'toilets',
    icon: ToiletsIcon,
    text: 'Servizi Igienici',
    marker: ToiletsMarker
  },
  {
    name: 'transport',
    icon: TransportIcon,
    text: 'Trasporti',
    marker: TransportMarker
  },
  {
    name: 'finance',
    icon: FinanceIcon,
    text: 'Finanza',
    marker: FinanceMarker
  },
  { name: 'sport', icon: SportIcon, text: 'Sport', marker: FinanceMarker },
  {
    name: 'tourism',
    icon: TourismIcon,
    text: 'Turismo',
    marker: FinanceMarker
  },
  {
    name: 'religion',
    icon: ReligionIcon,
    text: 'Religione',
    marker: FinanceMarker
  }
];
