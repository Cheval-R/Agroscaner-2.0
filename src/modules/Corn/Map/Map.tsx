import React from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  reactify,
  YMapListener,
} from "./lib/ymaps";
import type { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";
import ss from "./Map.module.scss";
import type { MapEvent } from "@yandex/ymaps3-types/imperative/YMapFeature/types";
import type { ICornFormSchema } from "../types/Corn.types";
import type { UseFormSetValue } from "react-hook-form";

const LOCATION: YMapLocationRequest = {
  center: [49.121358, 55.786949],
  zoom: 9,
};

interface Props {
  coordinates: { latitude: number; longitude: number };
  setValue: UseFormSetValue<ICornFormSchema>;
}

const Map: React.FC<Props> = ({ coordinates, setValue }) => {
  function setCoordinatesHandler(coordinates: LngLat) {
    const [longitude, latitude] = coordinates as [number, number];
    setValue("latitude", latitude.toFixed(6), { shouldValidate: true });
    setValue("longitude", longitude.toFixed(6), { shouldValidate: true });
  }

  const ClickCallback = (object: any, event: MapEvent) => {
    setCoordinatesHandler(event.coordinates);
  };
  return ymaps3 ? (
    <div style={{ width: "600px", height: "400px" }}>
      <YMap location={reactify.useDefault(LOCATION)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker
          coordinates={reactify.useDefault([Number(coordinates.longitude), Number(coordinates.latitude)] as LngLat, [
            coordinates.latitude,
            coordinates.longitude,
          ])}
          draggable={true}
          onDragEnd={(coordinates) => {
            setCoordinatesHandler(coordinates);
          }}
        >
          <span className={ss.marker}></span>
        </YMapMarker>
        <YMapListener
          layer="any"
          onClick={ClickCallback}
        />
      </YMap>
    </div>
  ) : null;
};

export default Map;
