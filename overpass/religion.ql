[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]({{bbox}});
  nw["amenity"="place_of_worship"]({{bbox}});
);
out center;
