import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import { Badge } from "@shadcn-ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import { Separator } from "@shadcn-ui/components/ui/separator";
import { Calendar, Eye, Heart, MapPin } from "lucide-react";
import { Container } from "~/components/Container";
import { MapEmbed } from "~/components/Map";
import { Navbar } from "~/components/Navbar/Navbar";

export const MapPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="grid grid-cols-4 gap-4 h-full">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Favorite Places in Paris
                </CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>by John Doe</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lorem Ipsum
                </p>

                <Separator />

                {/* Map Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>420 views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>69 likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>1970-01-01 00:00</span>
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Test123
                    </Badge>
                  </div>
                </div>
              </CardContent>
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
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
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
