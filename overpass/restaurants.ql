[out:json][timeout:25];
(
  node["amenity"="bar"]({{bbox}});
  node["amenity"="bbq"]({{bbox}});
  node["amenity"="biergarten"]({{bbox}});
  node["amenity"="cafe"]({{bbox}});
  node["amenity"="drinking_water"]({{bbox}});
  node["amenity"="fast_food"]({{bbox}});
  node["amenity"="ice_cream"]({{bbox}});
  node["amenity"="pub"]({{bbox}});
  node["amenity"="restaurant"]({{bbox}});
  nw["amenity"="restaurant"]({{bbox}});
);
out center;
