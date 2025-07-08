import { Globe2, MapPin, Share2, Users } from "lucide-react";
import { LinkCard } from "./components/LinkCard";
import { Container } from "~/components/Container";
import { Navbar } from "~/components/Navbar/Navbar";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="flex flex-col gap-2">
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
        </div>
      </Container>
    </>
  );
};
