import { Card } from "@shadcn-ui/components/ui/card";
import { ChevronRight } from "lucide-react";
import type { JSX } from "react";
import { Link } from "react-router";

interface LinkCardProps {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  link: string;
}
export const LinkCard = ({ title, subtitle, icon, link }: LinkCardProps) => {
  return (
    <Link to={link}>
      <Card className="flex flex-row p-4 items-center justify-between hover:bg-neutral-50 transition-all">
        <div className="flex flex-row gap-3">
          <div className="text-muted-foreground flex items-center">{icon}</div>
          <div className="flex flex-col">
            <span className="font-medium">{title}</span>
            <span className="font-sm text-muted-foreground">{subtitle}</span>
          </div>
        </div>
        <ChevronRight className="size-6 text-muted-foreground" />
      </Card>
    </Link>
  );
};
