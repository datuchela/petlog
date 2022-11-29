// custom hooks
import useAuthenticate from "../hooks/useAuthenticate";
import useForm from "../hooks/useForm";

// UI Components
import Heading from "../components/atoms/Heading";
import Button from "../components/atoms/Button";
import VerticalInput from "../components/molecules/VerticalInput";
import Link from "../components/atoms/Link";
import React from "react";

const LoginPage = () => {
  const { logIn, mutation } = useAuthenticate();
  const { form, handleChange } = useForm({ usernameOrEmail: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await logIn(form);
  };

  return (
    <>
      <Heading>Login</Heading>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <VerticalInput
            type="text"
            name="usernameOrEmail"
            label="Username or Email"
            emoji="🧑🏻"
            placeholder="username or email"
            value={form.usernameOrEmail}
            handleChange={handleChange}
          />
          <VerticalInput
            type="password"
            name="password"
            label="Password"
            emoji="🔑"
            placeholder="*********"
            value={form.password}
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button disabled={mutation.isLoading} type="submit" className="w-full">
            Log in
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-gray-900">don't have an account yet?</span>
            <Link className="w-min" to="/register">
              register
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
