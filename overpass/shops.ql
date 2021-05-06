[out:json][timeout:25];
(
  node["shop"="*"]({{bbox}});
  node["amenity"="marketplace"]({{bbox}});
);
out body;
>;
out skel qt;
