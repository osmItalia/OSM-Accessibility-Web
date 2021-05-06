[out:json][timeout:25];
(
  node["healthcare"="*"]({{bbox}});
  node["amenity"="clinic"]({{bbox}});
  node["amenity"="dentist"]({{bbox}});
  node["amenity"="doctors"]({{bbox}});
  node["amenity"="hospital"]({{bbox}});
  node["amenity"="nursing_home"]({{bbox}});
  node["amenity"="pharmacy"]({{bbox}});
  node["amenity"="social_facility"]({{bbox}});
  node["amenity"="veterinary"]({{bbox}});
  node["amenity"="funeral_hall"]({{bbox}});
);
out body;
>;
out skel qt;
