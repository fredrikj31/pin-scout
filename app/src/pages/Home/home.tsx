import {
  Eye,
  Globe,
  Map,
  MapPin,
  Plus,
  Settings,
  Share2,
  User,
} from "lucide-react";
import { Container } from "~/components/Container";
import { Navbar } from "~/components/Navbar/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import { Button } from "@shadcn-ui/components/ui/button";
import { Badge } from "@shadcn-ui/components/ui/badge";
import { Link } from "react-router";

export const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Navbar />
      <Container>
        <main>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, John!
            </h1>
            <p className="text-slate-600">
              Discover new places and share your favorite spots with the world.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-400">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Plus className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create New Map</h3>
                <p className="text-slate-600 text-sm">
                  Start mapping your next adventure
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Globe className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Explore Maps</h3>
                <p className="text-slate-600 text-sm">
                  Discover amazing places from other users
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Share2 className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Share & Connect</h3>
                <p className="text-slate-600 text-sm">
                  Connect with fellow travelers
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* My Maps Section */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">My Maps</h2>
                <Link to={"/maps"}>
                  <Button variant="outline" className="cursor-pointer">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-slate-200 rounded-t-lg overflow-hidden">
                    <img className="w-full h-full object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        Favorite Places in Paris
                      </CardTitle>
                      <Badge variant={"default"}>{"Public"}</Badge>
                    </div>
                    <CardDescription>Lorem Ipsum</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          69 pins
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          420 views
                        </span>
                      </div>
                      <span>April 1, 2025</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">
                        Created{" "}
                        <span className="font-medium">
                          Favorite Places in Paris
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">April 15, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Browse Public Maps
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
};
