import { useRef } from "react";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn-ui/components/ui/dialog";
import { Label } from "@shadcn-ui/components/ui/label";
import { Input } from "@shadcn-ui/components/ui/input";
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateMapPin } from "~/api/pins/createMapPin/useCreateMapPin";

interface CreateMapPinModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mapId: string;
  mapPinLocation: { lat: number; lng: number } | null;
}
export const CreateMapPinModal = ({ isOpen, setIsOpen, mapId, mapPinLocation }: CreateMapPinModalProps) => {
  const pinNameRef = useRef<HTMLInputElement>(null);
  const pinDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const { mutate: createMapPin, isPending: isCreateMapPinPending } = useCreateMapPin({ mapId });

  const createMapPinAction = () => {
    const pinName = pinNameRef.current?.value.trim();
    const pinDescription = pinDescriptionRef.current?.value.trim();
    if (pinName === undefined || pinDescription === undefined || !mapPinLocation) return;

    if (pinName.length === 0) {
      console.log("hej");
      toast("Please fill in the  pin name");
      return;
    }
    if (pinDescription.length === 0) {
      toast("Please give your  pin a description");
      return;
    }

    createMapPin(
      {
        mapPinProperties: {
          name: pinName,
          description: pinDescription,
          latitude: mapPinLocation.lat,
          longitude: mapPinLocation.lng,
        },
      },
      {
        onSuccess: () => {
          toast("Successfully created map");
          setIsOpen(false);

          queryClient.invalidateQueries({ queryKey: ["user maps"] });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Map Pin</DialogTitle>
          <DialogDescription>Add a name & descriptive description to your new map pin.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="pinName">Name</Label>
            <Input ref={pinNameRef} id="pinName" placeholder="Ratatouille Restaurant" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pinDescription">Description</Label>
            <Textarea
              ref={pinDescriptionRef}
              id="pinDescription"
              placeholder="Beautiful and tasteful food which gives an overall excellent experience."
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
          <Button className="cursor-pointer" onClick={createMapPinAction} disabled={isCreateMapPinPending}>
            Create Pin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
