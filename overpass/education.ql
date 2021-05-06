[out:json][timeout:25];
(
  node["amenity"="college"]({{bbox}});
  nw["amenity"="college"]({{bbox}});
  node["amenity"="driving_school"]({{bbox}});
  node["amenity"="kindergarten"]({{bbox}});
  node["amenity"="language_school"]({{bbox}});
  node["amenity"="library"]({{bbox}});
  nw["amenity"="library"]({{bbox}});
  node["amenity"="toy_library"]({{bbox}});
  node["amenity"="music_school"]({{bbox}});
  node["amenity"="university"]({{bbox}});
  nw["amenity"="university"]({{bbox}});
);
out center;
