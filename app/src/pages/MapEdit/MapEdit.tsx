import { Button } from "@shadcn-ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shadcn-ui/components/ui/card";
import { Input } from "@shadcn-ui/components/ui/input";
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useGetMap } from "~/api/maps/getMap/useGetMap";
import { useUpdateMap } from "~/api/maps/updateMap/useUpdateMap";
import { Container } from "~/components/Container";
import { MapEmbed } from "~/components/Map";
import { Navbar } from "~/components/Navbar/Navbar";
import { CreateMapPinModal } from "./components/CreateMapPinModal/CreateMapPinModal";
import { DeleteMapModal } from "~/components/DeleteMapModal/DeleteMapModal";
import { useListMapPins } from "~/api/pins/listMapPins/useListMapPins";
import type { Pin } from "~/api/pins/schemas";
import type { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { PinLocationRow } from "~/components/PinLocationRow/PinLocationRow";
import { useDebounce } from "~/hooks/useDebounce";

export const MapEditPage = () => {
  const [isCreateMapPinModalOpen, setIsCreateMapPinModalOpen] = useState<boolean>(false);
  const [mapPinLocation, setMapPinLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [allMapPins, setAllMapPins] = useState<Record<string, Pin>>({});
  const [mapBounds, setMapBounds] = useState<{
    latitude: {
      upperBound: number;
      lowerBound: number;
    };
    longitude: {
      upperBound: number;
      lowerBound: number;
    };
  } | null>(null);

  const mapNameRef = useRef<HTMLInputElement>(null);
  const mapDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const { id: mapId } = useParams();
  const { data: map, isFetching: isFetchingMap } = useGetMap({
    mapId,
  });
  const { mutate: updateMap, isPending: isUpdateMapPending } = useUpdateMap({
    mapId,
  });

  const { data: mapPins, refetch: refetchMapPins } = useListMapPins({
    mapId,
    mapBounds,
  });

  const handleBoundsChanged = useDebounce((bounds: MapCameraChangedEvent) => {
    setMapBounds({
      latitude: {
        lowerBound: bounds.detail.bounds.south,
        upperBound: bounds.detail.bounds.north,
      },
      longitude: {
        lowerBound: bounds.detail.bounds.west,
        upperBound: bounds.detail.bounds.east,
      },
    });
  }, 750);

  useEffect(() => {
    if (!mapPins) return;

    const newMapPins: Record<string, Pin> = {};
    mapPins.forEach((pin) => {
      newMapPins[pin.id] = pin;
    });

    setAllMapPins((prev) => ({ ...prev, ...newMapPins }));
  }, [mapPins]);

  useEffect(() => {
    refetchMapPins();
  }, [refetchMapPins, mapBounds]);

  const updateMapAction = () => {
    const mapName = mapNameRef.current?.value.trim();
    const mapDescription = mapDescriptionRef.current?.value.trim();
    if (mapName === undefined || mapDescription === undefined) return;

    if (mapName.length === 0) {
      console.log("hej");
      toast("Please fill in the map name");
      return;
    }
    if (mapDescription.length === 0) {
      toast("Please give your map a description");
      return;
    }

    updateMap(
      {
        mapProperties: {
          name: mapName,
          description: mapDescription,
        },
      },
      {
        onSuccess: () => {
          toast("Successfully updated map");
        },
      },
    );
  };

  return (
    <>
      <Navbar />
      <Container>
        {/* Loading State */}
        {isFetchingMap && map === undefined && <span>Loading...</span>}
        {/* Not Found State */}
        {map === null && <span>Map not found</span>}
        {/* Found State */}
        {map && (
          <div className="grid grid-cols-4 gap-4 h-full">
            {/* Sidebar */}
            <div className="col-span-1 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex flex-row items-center">
                    <Input ref={mapNameRef} type="text" defaultValue={map.name} />
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Textarea ref={mapDescriptionRef} className="text-sm" defaultValue={map.description} />
                  </CardDescription>
                </CardHeader>
                <CardFooter className="space-y-4">
                  {/* Map Stats */}
                  <div className="flex items-center justify-end w-full text-muted-foreground gap-2">
                    <DeleteMapModal
                      mapId={map.id}
                      mapName={map.name}
                      deleteButtonComponent={
                        <Button variant="destructive" className="cursor-pointer">
                          Delete
                        </Button>
                      }
                    />
                    <Button className="cursor-pointer" onClick={updateMapAction} disabled={isUpdateMapPending}>
                      Save
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Locations ({Object.keys(allMapPins).length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.values(allMapPins).map((mapPin, index) => (
                    <PinLocationRow
                      name={mapPin.name}
                      number={index + 1}
                      location={{
                        lat: mapPin.latitude,
                        lng: mapPin.longitude,
                      }}
                      deleteEnabled
                      onDelete={() => console.log("hej med dig")}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
            {/* Main Map */}
            <div className="col-span-3 size-full min-h-[1000px]">
              <MapEmbed
                defaultCenter={{
                  lat: 55.7306521,
                  lng: 12.3396037,
                }}
                onClick={(event) => {
                  if (event.detail.latLng) {
                    setMapPinLocation({
                      lat: event.detail.latLng.lat,
                      lng: event.detail.latLng.lng,
                    });
                  }
                  setIsCreateMapPinModalOpen(true);
                }}
                markers={Object.values(allMapPins).map((mapPin) => ({ lat: mapPin.latitude, lng: mapPin.longitude }))}
                onBoundsChanged={(event) => handleBoundsChanged(event)}
              />
            </div>
          </div>
        )}
      </Container>
      {mapId && (
        <CreateMapPinModal
          isOpen={isCreateMapPinModalOpen}
          setIsOpen={(open) => setIsCreateMapPinModalOpen(open)}
          mapId={mapId}
          mapPinLocation={mapPinLocation}
        />
      )}
    </>
  );
};
