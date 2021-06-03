
window.QUERY_BOUNDS = [
  [45.4881, 9.1811],
  [45.4953, 9.1935]
]

/*
*  MAP config
* */

window.CENTER = [
  (((window.QUERY_BOUNDS[1][0] - window.QUERY_BOUNDS[0][0]) / 2) + window.QUERY_BOUNDS[0][0]).toFixed(4),
  (((window.QUERY_BOUNDS[1][1] - window.QUERY_BOUNDS[0][1]) / 2) + window.QUERY_BOUNDS[0][1]).toFixed(4),
];
window.ZOOM = 16;


/*
* control the margin of the bound relative to the query_bounds
* */
window.XMARGIN = 0.01;
window.YMARGIN = 0.008;

/*
* pass additional configuration for the map container
* */
window.MAP_CONFIG = {
  center: window.CENTER,
  zoom: window.ZOOM,
  scrollWheelZoom: true,
  tap: false,
  zoomControl: false,
  maxBounds: [
    [window.QUERY_BOUNDS[0][0] - window.YMARGIN, window.QUERY_BOUNDS[0][1] - window.XMARGIN],
    [window.QUERY_BOUNDS[1][0] + window.YMARGIN, window.QUERY_BOUNDS[1][1] + window.XMARGIN],
  ],
};

window.TILELAYER_CONFIG = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  maxZoom: 19,
  minZoom: 14,
}

/*
* configurations for Nominatim service
* */
window.NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search/';
window.NOMINATIM_CONFIG = {
  format: 'geojson',
  addressdetails: 1,
  extratags: 1,
  countrycodes: 'it',
  viewbox: '9.06481,45.382812,9.302908,45.5425',
  bounded: 1
};

/*
*  Absolute path to layers files basepath, layers must be geojson inside this directory
* */
window.LAYER_SOURCE = '/static/data/';

window.NEWSLETTER_IFRAME_SRC =
  'https://www.webarea.services/form_give/index.php?pagina=form&action=viewForm&idform=474&idEnass=c8ffe9a587b126f152ed3d89a146b445';

window.PAYPAL_DONATION_URL = 'https://sostieni.wikimedia.it/';

/*
* Notes API
* */
window.OSM_NOTE_API =
  'https://master.apis.dev.openstreetmap.org/api/0.6/notes';

/*
* URL of OpenStreetMap
* */
window.OSM_URL = 'https://master.apis.dev.openstreetmap.org/';

/*
* Text to prepend to notes
* */
window.NOTE_TAG = '#OSM-Accessibility-WebApp\nSegnalazione:';

window.DONATION_TEXT = 'Supporta le nostre attività';


/*
* Open Route Service API
* */
window.OPENROUTE_URL = 'https://api.openrouteservice.org/v2/directions/';
window.OPENROUTE_KEY = '5b3ce3597851110001cf62482fd4e95de6c24215b315c05de4c2bc2e';


/*
* Configure how to translate tags
* */
window.TAGS = {
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
  'amenity=university': 'Università',
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
  'amenity=bureau_de_change': 'Cambio valute',
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
window.TAGS_GENERIC = {
  office: 'Uffici',
  sport: 'Sport',
  healthcare: 'Sanità',
  leisure: 'Svago',
  shop: 'Negozio',
  tourism: 'Turismo'
};



/*
* TOUR config
* */
window.LOCALE = {
  back: 'Indietro',
  close: 'Chiudi',
  last: 'Ultimo',
  next: 'Successivo',
  skip: 'Salta'
};

/*
* Config Step
* */
window.STEPS = [
  {
    content:
      'Consenti a Percorsi agili di accedere alla tua posizione per accompagnarti nel tuo percorso.',
    target: '#position'
  },
  {
    content: 'Inserisci la tua destinazione',
    target: '#search',
    onNext: 'openDirections', // don't modify, this triggers an action
  },
  {
    content: 'Scegli come muoverti',
    target: '#transport-mean',
    onPrev: 'openSearch', // don't modify, this triggers an action
  },
  {
    content: 'Inserisci il punto di partenza e di arrivo',
    target: '#directions-group'
  },
  {
    content: 'Oppure seleziona i luoghi dalla mappa',
    target: '#select-from-map-start'
  },
  {
    content: 'Fatti guidare da noi',
    target: '#start-navigation'
  },
  {
    content: 'Filtra i punti di interesse in base alla loro accessibilità',
    target: '#accessibility-filter'
  },
  {
    content:
      "Mostra o nascondi tutti i punti d'interesse (Ad esempio trasporti, ristoranti, etc.)",
    target: '#poi-toggle'
  },
  {
    content:
      'Aggiungi una segnalazione se trovi un errore o una mancanza sulla mappa. I volontari di OpenStreetMap provvederanno a controllare il prima possibile',
    target: '#osm-note'
  },
  {
    content:
      'Vuoi ricevere notizie sulle nostre attività? Iscriviti alla newsletter di Wikimedia Italia',
    target: '#newsletter'
  },
  {
    content:
      'Vuoi contribuire allo sviluppo di altri progetti come questo? Fai una donazione a Wikimedia Italia',
    target: '#donate'
  }
];


/*
* Allow to configure the Tour
* https://docs.react-joyride.com/props
* */
window.TOUR_CONFIG = {
  continuous: true,
  showProgress: true,
  showSkipButton: true,
  steps: window.STEPS,
  locale: window.LOCALE,
};


window.INFO_MODAL = `
  <p>
    Percorsi Agili è una Web App che permette alle persone con disabilità motoria di muoversi sul territorio usando <b><a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer noopener">OpenStreetMap</a></b>, un progetto di mappatura libera e collaborativa.
  </p>
  <p>
    L'app è stata sviluppata da <b><a href="https://www.wikimedia.it/" target="_blank" rel="noreferrer noopener">Wikimedia Italia</a></b>, nell’ambito dei progetti legati all’accessibilità, con lo scopo di aiutare ad affrontare le difficoltà nell’organizzare i propri spostamenti, a causa di barriere architettoniche, del difficile accesso ai mezzi pubblici e delle scarse informazioni relative alla mobilità per le persone con disabilità motoria.
  </p>
  <p>
    L’obiettivo del progetto è permettere di vivere il proprio territorio con un'attenzione non solo alle necessità, ma anche alla valorizzazione del tempo libero, agevolando la conoscenza di itinerari percorribili con carrozzine, bastoni o deambulatori.
  </p>
  <p>La Web App permetterà di organizzare i propri spostamenti evidenziando informazioni relative all'accessibilità di strutture ricettive (negozi, bar e ristoranti), delle fermate degli autobus con presenza di rampe di accesso o delle stazioni ferroviarie.</p>
  <p>
    La Web App è un progetto pilota ed è attualmente possibile trovare le informazioni relative all'accessibilità solo nella zona del Municipio 9 del Comune di Milano.
  </p>
  <p>I dati OpenStreetMap vengono aggiornati con frequenza settimanale</p>
`