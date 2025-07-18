import { Button } from "@shadcn-ui/components/ui/button";
import { Trash } from "lucide-react";

interface PinLocationRowProps {
  number: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  deleteEnabled?: boolean;
  onDelete?: () => void;
}
export const PinLocationRow = ({ number, name, location, deleteEnabled, onDelete }: PinLocationRowProps) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground">
          {location.lat}, {location.lng}
        </p>
        {deleteEnabled && (
          <Button variant="ghost" className="group hover:cursor-pointer !p-0 !bg-transparent" onClick={onDelete}>
            <Trash className="size-6 text-red-500 group-hover:text-red-600" />
          </Button>
        )}
      </div>
    </div>
  );
};
