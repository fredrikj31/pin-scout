import { Globe2, MapPin, Share2, Users } from "lucide-react";
import { Header } from "./components/Header";
import { LinkCard } from "./components/LinkCard";
import { Button } from "@shadcn-ui/components/ui/button";
import { useAuth } from "../../providers/auth/useAuth";
import { Container } from "../../components/Container";

export const HomePage = () => {
  const auth = useAuth();

  return (
    <Container>
      <div className="flex flex-col gap-2">
        <Header />

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <LinkCard
            title="Create New Map"
            subtitle="Start pinning your favorite places"
            icon={<Globe2 />}
            link="/maps/create"
          />
          <LinkCard
            title="My Map"
            subtitle="View and edit your maps"
            icon={<MapPin />}
            link="/maps"
          />
          <LinkCard
            title="Discover Maps"
            subtitle="Explore maps from other users"
            icon={<Users />}
            link="/discover"
          />
          <LinkCard
            title="Profile"
            subtitle="Manage your account"
            icon={<Share2 />}
            link="/profile"
          />
        </div>
        {/* <h1 className="text-xl">Hello {auth.user?.email}</h1>
      <EventButton />*/}
        <Button onClick={() => auth.logout()}>Logout</Button>
      </div>
    </Container>
  );
};
