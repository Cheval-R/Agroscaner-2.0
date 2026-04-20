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
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lon: number) => void;
}

//  TODO: Настроить изменение маркера сразу как изменились данные координат
const Map: React.FC<Props> = ({ latitude, longitude, onLocationChange }) => {
  const handleMapClick = (_object: unknown, event: MapEvent) => {
    const [lon, lat] = event.coordinates;
    onLocationChange(Number(lat.toFixed(6)), Number(lon.toFixed(6)));
  };

  const handleMarkerDragEnd = (coordinates: LngLat) => {
    const [lon, lat] = coordinates;
    onLocationChange(Number(lat.toFixed(6)), Number(lon.toFixed(6)));
  };

  return ymaps3 ? (
    <div className={ss.mapShell}>
      <div className={ss.meta}>
        <span className={ss.coordinate}>
          Широта <strong>{latitude.toFixed(6)}</strong>
        </span>
        <span className={ss.coordinate}>
          Долгота <strong>{longitude.toFixed(6)}</strong>
        </span>
      </div>

      <div className={ss.canvas}>
        <YMap location={reactify.useDefault(LOCATION)}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <YMapMarker
            coordinates={reactify.useDefault([Number(longitude), Number(latitude)] as LngLat, [
              latitude,
              longitude,
            ])}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          >
            <span className={ss.marker}></span>
          </YMapMarker>
          <YMapListener
            layer="any"
            onClick={handleMapClick}
          />
        </YMap>
      </div>
    </div>
  ) : null;
};

export default Map;
