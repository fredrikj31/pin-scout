import { useState, type ReactNode } from "react";
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
import { toast } from "sonner";
import { useDeleteMap } from "~/api/maps/deleteMap/useDeleteMap";
import { useNavigate } from "react-router";

interface DeleteMapModalProps {
  mapId: string;
  mapName: string;
  deleteButtonComponent: ReactNode;
}
export const DeleteMapModal = ({ mapId, mapName, deleteButtonComponent }: DeleteMapModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: deleteMap, isPending: isDeleteMapPending } = useDeleteMap();

  const deleteMapAction = () => {
    deleteMap(
      {
        mapId,
      },
      {
        onSuccess: () => {
          toast("Successfully deleted map");
          setIsModalOpen(false);
          navigate("/");
        },
      },
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{deleteButtonComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Map?</DialogTitle>
          <DialogDescription>
            You are deleting the <b>"{mapName}"</b> map. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              No, Keep it.
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={deleteMapAction}
            disabled={isDeleteMapPending}
          >
            Yes, Delete Map!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
