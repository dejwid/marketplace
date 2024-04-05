'use effect';
import {createRef, useEffect} from "react";
import { Loader } from "@googlemaps/js-api-loader";

export type Location = {
  lat: number;
  lng: number;
}

export default function LocationPicker({
  defaultLocation,
  onChange,
  gpsCoords,
}:{
  defaultLocation: Location;
  onChange: (location: Location) => void;
  gpsCoords: Location|null;
}) {
  const divRef = createRef<HTMLDivElement>();

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });
    const {Map} = await loader.importLibrary('maps');
    const {AdvancedMarkerElement} = await loader.importLibrary('marker');
    const map = new Map(divRef.current as HTMLDivElement, {
      mapId: 'map',
      center: defaultLocation,
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const pin = new AdvancedMarkerElement({
      map,
      position: defaultLocation,
    });
    map.addListener('click', (ev:any) => {
      pin.position = ev.latLng;
      const lat = ev.latLng.lat();
      const lng = ev.latLng.lng();
      onChange({lat, lng});
    });
  }

  useEffect(() => {
    loadMap();
  }, [gpsCoords]);

  return (
    <>
      <div ref={divRef} id="map" className="w-full h-[200px]"></div>
    </>
  );
}