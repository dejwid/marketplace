'use client';
import {Loader} from "@googlemaps/js-api-loader";
import {createRef, HTMLAttributes, useEffect} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  location: number[];
};

export default function LocationMap({location, ...divProps}:Props) {
  const mapsDivRef = createRef<HTMLDivElement>();

  useEffect(() => {
    loadMap();
  }, []);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
    });
    const {Map} = await loader.importLibrary('maps');
    const {AdvancedMarkerElement} = await loader.importLibrary('marker');
    const map = new Map(mapsDivRef.current as HTMLDivElement, {
      mapId: 'map',
      center: {lng:location[0], lat:location[1]},
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });
    new AdvancedMarkerElement({
      map,
      position: {lng:location[0], lat:location[1]},
    });
  }

  return (
    <>
      <div {...divProps} ref={mapsDivRef}></div>
    </>
  );
}