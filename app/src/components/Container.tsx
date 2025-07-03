import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full">
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
};
