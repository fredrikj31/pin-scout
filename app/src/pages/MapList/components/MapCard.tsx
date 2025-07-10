import { Badge } from "@shadcn-ui/components/ui/badge";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn-ui/components/ui/dropdown-menu";
import { Calendar, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router";

interface MapCardProps {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
}
export const MapCard = ({ id, name, description, isPublic }: MapCardProps) => {
  return (
    <Link to={`/maps/${id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200 !gap-0">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight mb-1 truncate">
                {name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>April 2, 2024</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Map
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Map
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Map
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between">
          <Badge
            variant={isPublic ? "default" : "secondary"}
            className="text-xs"
          >
            {isPublic ? "Public" : "Private"}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 cursor-pointer"
          >
            <Eye className="mr-1 h-3 w-3" />
            View
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
