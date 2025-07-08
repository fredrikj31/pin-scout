import { Button } from "@shadcn-ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import { Input } from "@shadcn-ui/components/ui/input";
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { MapPin, Trash } from "lucide-react";
import { Container } from "~/components/Container";
import { MapEmbed } from "~/components/Map";
import { Navbar } from "~/components/Navbar/Navbar";

export const MapEditPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="grid grid-cols-4 gap-4 h-full">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex flex-row items-center">
                  <Input type="text" value="Favorite Places In Paris" />
                </CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <Textarea className="text-sm text-muted-foreground">
                    Lorem Ipsum
                  </Textarea>
                </CardDescription>
              </CardHeader>
              <CardFooter className="space-y-4">
                {/* Map Stats */}
                <div className="flex items-center justify-end w-full text-muted-foreground">
                  <Button className="cursor-pointer">Save</Button>
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
                      <p className="text-sm font-medium truncate">
                        Eiffel Tower
                      </p>
                      <p className="text-xs text-muted-foreground">
                        35.6586, 139.7016
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="group hover:cursor-pointer !p-0 !bg-transparent"
                    >
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
      </Container>
    </>
  );
};
