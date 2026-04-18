import type { LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';
import type { MapEvent } from '@yandex/ymaps3-types/imperative/YMapFeature/types';
import React from 'react';

import {
  reactify,
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapListener,
  YMapMarker,
} from './lib/ymaps';
import ss from './Map.module.scss';
const LOCATION: YMapLocationRequest = {
  center: [49.121358, 55.786949],
  zoom: 9,
};

interface Props {
  coordinates: { latitude: number; longitude: number };
  onCoordinatesChange: (coordinates: { latitude: string; longitude: string }) => void;
}

//  TODO: Настроить изменение маркера сразу как изменились данные координат
const Map: React.FC<Props> = ({ coordinates, onCoordinatesChange }) => {
  function setCoordinatesHandler(coordinates: LngLat) {
    const [longitude, latitude] = coordinates as [number, number];

    onCoordinatesChange({
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
    });
  }

  const ClickCallback = (object: any, event: MapEvent) => {
    setCoordinatesHandler(event.coordinates);
  };
  return ymaps3 ? (
    <div style={{ width: '600px', height: '400px' }}>
      <YMap location={reactify.useDefault(LOCATION)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker
          coordinates={reactify.useDefault(
            [Number(coordinates.longitude), Number(coordinates.latitude)] as LngLat,
            [coordinates.latitude, coordinates.longitude],
          )}
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
