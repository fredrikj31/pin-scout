import { MapPin } from "lucide-react";
import { useGetUser } from "../../../api/getUser/useGetUser";

export const Header = () => {
  const { data: user } = useGetUser();

  return (
    <div className="flex flex-col gap-2 w-full ">
      {/* Icon & Title */}
      <div className="flex flex-row justify-center items-center gap-2">
        <MapPin className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Pin Scout</h1>
      </div>

      {/* Subtitle */}
      <p className="text-muted-foreground text-lg font-semibold">
        Welcome back, {user?.firstName}!
      </p>
    </div>
  );
};
