[out:json][timeout:25];
(
  node["amenity"="atm"]({{bbox}});
  node["amenity"="bank"]({{bbox}});
  nw["amenity"="bank"]({{bbox}});
  node["amenity"="bureau_de_change"]({{bbox}});
  node["amenity"="post_office"]({{bbox}});
  nw["amenity"="post_office"]({{bbox}});
);
out center;
