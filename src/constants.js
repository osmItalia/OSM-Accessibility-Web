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
import { ReactComponent as SportMarker } from './assets/sport.svg';
import { ReactComponent as TourismMarker } from './assets/tourism.svg';
import { ReactComponent as ReligionMarker } from './assets/religion.svg';

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

export const PAYPAL_DONATION_URL = 'https://sostieni.wikimedia.it/';

export const OSM_NOTE_API =
  'https://master.apis.dev.openstreetmap.org/api/0.6/notes';

export const OSM_URL = 'https://master.apis.dev.openstreetmap.org/';

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
  { name: 'sport', icon: SportIcon, text: 'Sport', marker: SportMarker },
  {
    name: 'tourism',
    icon: TourismIcon,
    text: 'Turismo',
    marker: TourismMarker
  },
  {
    name: 'religion',
    icon: ReligionIcon,
    text: 'Religione',
    marker: ReligionMarker
  }
];

export const BREAKPOINTS = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920
};

export const TAGS = {
  'amenity=marketplace': 'Mercato',
  'amenity=bar': 'Bar',
  'amenity=bbq': 'BBQ',
  'amenity=biergarten': "Birreria all'aperto",
  'amenity=cafe': 'Café',
  'amenity=drinking_water': 'Fontanella',
  'amenity=fast_food': 'Fast Food',
  'amenity=ice_cream': 'Gelateria',
  'amenity=pub': 'Pub',
  'amenity=restaurant': 'Ristorante',
  'amenity=bicycle_parking': 'Posteggio Biciclette',
  'amenity=bicycle_repair_station': 'Punto di riparazione biciclette',
  'amenity=bicycle_rental': 'Noleggio biciclette',
  'amenity=boat_rental': 'Noleggio barche',
  'amenity=boat_sharing': 'Boat Sharing',
  'amenity=bus_station': 'Stazione autobus',
  'amenity=car_rental': 'Noleggio Auto',
  'amenity=car_sharing': 'Car Sharing',
  'amenity=car_wash': 'Autolavaggio',
  'amenity=vehicle_inspection': '',
  'amenity=charging_station': 'Punto di ricarica auto',
  'amenity=ferry_terminal': 'Terminal Traghetto',
  'amenity=fuel': 'Benzinaio',
  'amenity=motorcycle_parking': 'Parcheggio Motoveicoli',
  'amenity=parking': 'Parcheggio',
  'amenity=parking_entrance': 'Ingresso Parcheggio',
  'amenity=parking_space': 'Parcheggio',
  'amenity=taxi': 'Taxi',
  'public_transport=platform': 'Banchina',
  'public_transport=station': 'Stazione',
  'highway=bus_stop': 'Fermata Autobus',
  'railway=platform': 'Banchina ferroviaria',
  'amenity=arts_centre': "Galleria d'arte",
  'amenity=casino': 'Casinò',
  'amenity=cinema': 'Cinema',
  'amenity=community_centre': 'Centro di aggregazione',
  'amenity=gambling': "Gioco d'azzardo",
  'amenity=love_hotel': 'Motel',
  'amenity=nightclub': 'Nightclub',
  'amenity=planetarium': 'Planetario',
  'amenity=public_bookcase': 'Biblioteca',
  'amenity=social_centre': 'Centro di aggregazione',
  'amenity=stripclub': 'Strip Club',
  'amenity=studio': 'Studio di registrazione',
  'amenity=theatre': 'Teatro',
  'amenity=college': 'Scuola superiore',
  'amenity=driving_school': 'Scuola Guida',
  'amenity=kindergarten': 'Asilo',
  'amenity=language_school': 'Scuola di lingua',
  'amenity=library': 'Libreria',
  'amenity=toy_library': '',
  'amenity=music_school': 'Scuola di musica',
  'amenity=university': 'UNniversità',
  'amenity=clinic': 'Clinica',
  'amenity=dentist': 'Dentista',
  'amenity=doctors': 'Dottori',
  'amenity=hospital': 'Ospedale',
  'amenity=nursing_home': 'RSA',
  'amenity=pharmacy': 'Farmacia',
  'amenity=social_facility': 'Servizi sociali',
  'amenity=veterinary': 'Veterinario',
  'amenity=funeral_hall': 'Camera mortuaria',
  'amenity=atm': 'Sportello bancomat',
  'amenity=bank': 'Banca',
  'amenity=bureau_de_change': 'Cambio Valute',
  'amenity=post_office': 'Poste',
  'amenity=toilets': 'Bagni pubblici',
  'office=government': 'Edificio amministrativo',
  'amenity=police': 'Polizia',
  'amenity=embassy': 'Ambasciata',
  'office=diplomatic': 'Ambasciata',
  'amenity=townhall': 'Municipio',
  'amenity=place_of_worship': 'Luogo di preghiera'
};

/*
 * Describe Fallback generic tags like `sport=*`
 * */
export const TAGS_GENERIC = {
  office: 'Uffici',
  sport: 'Sport',
  healthcare: 'Sanità',
  leisure: 'Svago',
  shop: 'Negozio',
  tourism: 'Turismo'
};

export const NOTE_TAG = '#OSM-Accessibility-WebApp\nSegnalazione:';
