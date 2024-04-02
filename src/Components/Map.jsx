import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Buttons from "../Components/Buttons";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../ContextPrivider/ContextPrivider"; //CUSTOM HOOK CONTEXT PROVIDER
import { useGeolocation } from "../hooks/useGeolocation"; //CUSTOM HOOK
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [currentPosition, setCurrentPosition] = useState([40, 0]);

  const [mapLat, mapLng] = useUrlPosition();

  const { cities } = useCitiesContext();
  useEffect(() => {
    if (mapLat && mapLng) setCurrentPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setCurrentPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Buttons type="position" onclick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Buttons>
      )}
      <MapContainer
        className={styles.map}
        center={currentPosition}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={currentPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
