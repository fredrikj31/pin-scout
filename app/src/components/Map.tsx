import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMapsLibrary,
  type MapCameraChangedEvent,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { config } from "~/config";
import { useEffect } from "react";
import { getToken, type AppCheckTokenResult } from "firebase/app-check";
import { useFirebase } from "~/providers/firebase/useFirebase";

const AppCheckHandler = () => {
  const { appCheck } = useFirebase();
  const coreLib = useMapsLibrary("core");
  useEffect(() => {
    if (!coreLib) return;

    const settings = coreLib.Settings.getInstance();
    (
      settings as unknown as {
        fetchAppCheckToken: () => Promise<AppCheckTokenResult>;
      }
    ).fetchAppCheckToken = async () => getToken(appCheck);
  }, [appCheck, coreLib]);

  return null;
};

interface MapEmbedProps {
  defaultCenter: {
    lat: number;
    lng: number;
  };
  markers?: { lat: number; lng: number }[];
  onBoundsChanged?: (event: MapCameraChangedEvent) => void;
  onClick?: (event: MapMouseEvent) => void;
  onMarkerClick?: (event: google.maps.MapMouseEvent) => void;
}
export const MapEmbed = ({ defaultCenter, markers, onBoundsChanged, onClick, onMarkerClick }: MapEmbedProps) => {
  return (
    <APIProvider
      apiKey={config.googleMaps.apiKey}
      onError={(error) => console.log("Error loading Maps API", error)}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <AppCheckHandler />
      <Map
        mapId={config.googleMaps.mapId}
        style={{ width: "100%", height: "100%" }}
        defaultZoom={13}
        defaultCenter={defaultCenter}
        onBoundsChanged={onBoundsChanged}
        onClick={onClick}
        streetView={null}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        clickableIcons={false}
      >
        {markers &&
          markers.map((marker) => (
            <AdvancedMarker
              key={`lat-${marker.lat}-lng-${marker.lng}`}
              onClick={onMarkerClick}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
      </Map>
    </APIProvider>
  );
};
