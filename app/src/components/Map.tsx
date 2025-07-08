import { APIProvider, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
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

export const MapEmbed = () => {
  return (
    <APIProvider
      apiKey={config.googleMaps.apiKey}
      onError={(error) => console.log("Error loading Maps API", error)}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <AppCheckHandler />
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onBoundsChanged={(event) => console.log(event.detail.bounds)}
        onClick={(event) => console.log(event)}
        streetView={null}
        streetViewControl={false}
        fullscreenControl={false}
        mapTypeControl={false}
        clickableIcons={false}
      />
    </APIProvider>
  );
};
