[out:json][timeout:25];
(
  node["office"="government"]({{bbox}});
  nw["office"="government"]({{bbox}});
  node["amenity"="police"]({{bbox}});
  nw["amenity"="police"]({{bbox}});
  node["amenity"="embassy"]({{bbox}});
  nw["amenity"="embassy"]({{bbox}});
  node["amenity"="townhall"]({{bbox}});
  nw["amenity"="townhall"]({{bbox}});
  node["office"="diplomatic"]({{bbox}});
  nw["office"="diplomatic"]({{bbox}});
);
out center;
