[out:json][timeout:25];
(
  node["shop"="*"]({{bbox}});
  nw["shop"="*"]({{bbox}});
  node["amenity"="marketplace"]({{bbox}});
  nw["amenity"="marketplace"]({{bbox}});
);
out center;
