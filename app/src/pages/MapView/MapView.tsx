import { Avatar, AvatarFallback, AvatarImage } from "@shadcn-ui/components/ui/avatar";
import { Badge } from "@shadcn-ui/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shadcn-ui/components/ui/card";
import { Separator } from "@shadcn-ui/components/ui/separator";
import type { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { Calendar, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetMap } from "~/api/maps/getMap/useGetMap";
import { useListMapPins } from "~/api/pins/listMapPins/useListMapPins";
import { Container } from "~/components/Container";
import { MapEmbed } from "~/components/Map";
import { Navbar } from "~/components/Navbar/Navbar";
import { MapPinModal } from "./components/MapPinModal/MapPinModal";
import { type Pin } from "~/api/pins/schemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const MapViewPage = () => {
  const { id: mapId } = useParams();
  const [isMapPinModalOpen, setIsMapPinModalOpen] = useState<boolean>(false);
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
  const [selectedMapPin, setSelectedMapPin] = useState<Pin | null>(null);
  const [allMapPins, setAllMapPins] = useState<Record<string, Pin>>({});

  const { data: map, isFetching: isFetchingMap } = useGetMap({
    mapId,
  });

  const { data: mapPins, refetch: refetchMapPins } = useListMapPins({
    mapId,
    mapBounds,
  });

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

  const handleBoundsChanged = useCallback(
    debounce((bounds: MapCameraChangedEvent) => {
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
    }, 750),
    [],
  );

  const mapPinClickAction = (event: google.maps.MapMouseEvent) => {
    if (!mapPins) return;
    const selectedMapPin = mapPins.find(
      (mapPin) => mapPin.latitude === event.latLng?.lat() && mapPin.longitude === event.latLng?.lng(),
    );
    if (!selectedMapPin) return;

    setSelectedMapPin(selectedMapPin);
    setIsMapPinModalOpen(true);
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
                  <CardTitle className="text-xl">{map.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>by John Doe</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{map.description}</p>

                  <Separator />

                  {/* Map Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>1970-01-01 00:00</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Tags */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        Test123
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Locations (1)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        1
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Eiffel Tower</p>
                        <p className="text-xs text-muted-foreground">35.6586, 139.7016</p>
                      </div>
                    </div>
                  </div>
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
                markers={Object.values(allMapPins).map((mapPin) => ({ lat: mapPin.latitude, lng: mapPin.longitude }))}
                onBoundsChanged={(event) => handleBoundsChanged(event)}
                onMarkerClick={mapPinClickAction}
              />
            </div>
          </div>
        )}
      </Container>
      <MapPinModal
        isOpen={isMapPinModalOpen}
        setIsOpen={(open) => setIsMapPinModalOpen(open)}
        mapPin={selectedMapPin}
      />
    </>
  );
};
