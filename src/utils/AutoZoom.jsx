import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function AutoZoom({ routeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (routeCoords && routeCoords.length > 0) {
      const bounds = L.latLngBounds(
        routeCoords.map((point) => [point.lat, point.lng]),
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routeCoords, map]);

  return null;
}


export default AutoZoom;
