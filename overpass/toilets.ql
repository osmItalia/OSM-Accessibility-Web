[out:json][timeout:25];
(
  node["amenity"="toilets"]({{bbox}});
);
out body;
>;
out skel qt;
