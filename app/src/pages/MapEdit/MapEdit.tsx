import { Button } from "@shadcn-ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shadcn-ui/components/ui/card";
import { Input } from "@shadcn-ui/components/ui/input";
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { MapPin, Trash } from "lucide-react";
import { useRef } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useGetMap } from "~/api/maps/getMap/useGetMap";
import { useUpdateMap } from "~/api/maps/updateMap/useUpdateMap";
import { Container } from "~/components/Container";
import { MapEmbed } from "~/components/Map";
import { Navbar } from "~/components/Navbar/Navbar";

export const MapEditPage = () => {
  const mapNameRef = useRef<HTMLInputElement>(null);
  const mapDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const { id: mapId } = useParams();
  const { data: map, isFetching: isFetchingMap } = useGetMap({
    mapId,
  });
  const { mutate: updateMap, isPending: isUpdateMapPending } = useUpdateMap({
    mapId,
  });

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
                  <div className="flex items-center justify-end w-full text-muted-foreground">
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
                    Locations (1)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        1
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Eiffel Tower</p>
                        <p className="text-xs text-muted-foreground">35.6586, 139.7016</p>
                      </div>
                      <Button variant="ghost" className="group hover:cursor-pointer !p-0 !bg-transparent">
                        <Trash className="size-6 text-red-500 group-hover:text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Main Map */}
            <div className="col-span-3 size-full min-h-[1000px]">
              <MapEmbed />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
