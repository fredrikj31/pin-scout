import { Button } from "@shadcn-ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shadcn-ui/components/ui/card";
import { Input } from "@shadcn-ui/components/ui/input";
import { Label } from "@shadcn-ui/components/ui/label";
import { Link } from "react-router";
import { useRef } from "react";
import { useAuth } from "~/providers/auth/useAuth";

export const SignupPage = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);

  const auth = useAuth();

  const signup = () => {
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;
    const firstName = firstNameInput.current?.value;
    const lastName = lastNameInput.current?.value;

    if (!email || !password || !firstName || !lastName) return;

    auth.signup({ email, password, firstName, lastName });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create your user</CardTitle>
              <CardDescription>Sign up and create a profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input ref={emailInput} id="email" type="email" placeholder="johndoe@example.com" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input ref={passwordInput} id="password" type="password" required />
                </div>
                <div className="flex flex-row gap-2">
                  <div className="grid gap-3">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input ref={firstNameInput} id="firstName" type="text" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input ref={lastNameInput} id="lastName" type="text" required />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button onClick={() => signup()} className="w-full">
                    Signup
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
