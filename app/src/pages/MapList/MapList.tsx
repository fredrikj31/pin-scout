import { Button } from "@shadcn-ui/components/ui/button";
import { Input } from "@shadcn-ui/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn-ui/components/ui/select";
import { MapPin, Plus, Search } from "lucide-react";
import { Container } from "~/components/Container";
import { Navbar } from "~/components/Navbar/Navbar";
import { CreateMapModal } from "~/components/CreateMapModal/CreateMapModal";
import { useListMaps } from "~/api/maps/listMaps/useListMaps";
import { MapCard } from "~/components/MapCard/MapCard";
import { Skeleton } from "@shadcn-ui/components/ui/skeleton";

export const MapListPage = () => {
  const { data: maps, isFetching: isFetchingMaps } = useListMaps();

  return (
    <>
      <Navbar />
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Maps</h1>
              <p className="text-muted-foreground">Manage and organize your pin collections</p>
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

          {maps === undefined && isFetchingMaps && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-[180px] w-full rounded-xl" />
              <Skeleton className="h-[180px] w-full rounded-xl" />
              <Skeleton className="h-[180px] w-full rounded-xl" />
            </div>
          )}

          {/* Maps Grid */}
          {maps && maps.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No maps found</h3>
              <p className="text-muted-foreground mb-4">Create your first map to get started</p>
            </div>
          )}
          {maps && maps.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {maps.map((map) => (
                <MapCard id={map.id} name={map.name} description={map.description} isPublic={true} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
