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
import { Input } from "@shadcn-ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn-ui/components/ui/select";
import {
  Calendar,
  Edit,
  Eye,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Container } from "~/components/Container";
import { Navbar } from "~/components/Navbar/Navbar";
import { CreateMapModal } from "~/components/CreateMapModal/CreateMapModal";

export const MapListPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Maps</h1>
              <p className="text-muted-foreground">
                Manage and organize your pin collections
              </p>
            </div>
            <CreateMapModal
              createButtonComponent={
                <Button className="w-fit cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Map
                </Button>
              }
            />
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search maps..." className="pl-10" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="pins">Pin Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Maps Grid */}
          {/* No Results
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No maps found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Create your first map to get started"}
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Map
                </Button>
              </div>
            */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-lg transition-shadow duration-200 !gap-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight mb-1 truncate">
                      Beach Destinations
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>April 2, 2024</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
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
                  Beautiful beaches I've visited along the coast. Perfect for
                  summer vacations and weekend getaways.
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>69 pins</span>
                  </div>
                  <Badge variant={"default"} className="text-xs">
                    {"Public"}
                  </Badge>
                </div>
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
          </div>
        </div>
      </Container>
    </>
  );
};
