import { useRef, useState, type ReactNode } from "react";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn-ui/components/ui/dialog";
import { useCreateMap } from "~/api/maps/createMap/useCreateMap";
import { Label } from "@shadcn-ui/components/ui/label";
import { Input } from "@shadcn-ui/components/ui/input";
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface CreateMapModal {
  createButtonComponent: ReactNode;
}
export const CreateMapModal = ({ createButtonComponent }: CreateMapModal) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const mapNameRef = useRef<HTMLInputElement>(null);
  const mapDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const { mutate: createMap, isPending: isCreateMapPending } = useCreateMap();

  const createMapAction = () => {
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

    createMap(
      {
        mapProperties: {
          name: mapName,
          description: mapDescription,
        },
      },
      {
        onSuccess: () => {
          toast("Successfully created map");
          setIsModalOpen(false);

          queryClient.invalidateQueries({ queryKey: ["user maps"] });
        },
      }
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{createButtonComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Map</DialogTitle>
          <DialogDescription>
            Give your new map a beautiful name and a nice description.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="mapName">Name</Label>
            <Input
              ref={mapNameRef}
              id="mapName"
              placeholder="Favorite Restaurants"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="mapDescription">Description</Label>
            <Textarea
              ref={mapDescriptionRef}
              id="mapDescription"
              placeholder="Lorem Ipsum"
              maxLength={200}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="cursor-pointer"
            onClick={createMapAction}
            disabled={isCreateMapPending}
          >
            Create Map
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
