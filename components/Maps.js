// framework
import { useEffect, useRef, useContext } from "react";
// context
import { UberContext } from "@context/uberContext";
// lib
import mapboxgl from "mapbox-gl";

const style = {
  wrapper: `flex-1 h-full w-full`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Maps = () => {
  const mapContainer = useRef(null);
  const { pickupCoordinates, dropoffCoordinates, pickup, dropoff } =
    useContext(UberContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [110.37148, -7.79406],
      zoom: 12,
      container: mapContainer.current,
    });

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates, pickup);
    }

    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates, dropoff);
    }

    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([dropoffCoordinates, pickupCoordinates], { padding: 400 });
    }
  }, [dropoffCoordinates, pickupCoordinates, pickup, dropoff]);

  const addToMap = (map, coordinates, location) => {
    const marker1 = new mapboxgl.Marker()
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${location.replace(/\b\w/g, (l) =>
            l.toUpperCase()
          )}</h3><p>${coordinates}</p>`
        )
      )
      .setLngLat(coordinates)
      .addTo(map);
  };

  return <div className={style.wrapper} ref={mapContainer} id="map"></div>;
};

export default Maps;
