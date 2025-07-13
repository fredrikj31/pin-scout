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

interface MapPinModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mapPin: {
    name: string;
    description: string;
  } | null;
}
export const MapPinModal = ({ isOpen, setIsOpen, mapPin }: MapPinModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mapPin?.name}</DialogTitle>
          <DialogDescription>{mapPin?.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
