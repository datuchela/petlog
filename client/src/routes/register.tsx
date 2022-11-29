import { useNavigate } from "react-router-dom";

// custom hooks
import useForm from "../hooks/useForm";
import useRegister from "../hooks/useRegister";

// UI Components
import Heading from "../components/atoms/Heading";
import Button from "../components/atoms/Button";
import VerticalInput from "../components/molecules/VerticalInput";
import Link from "../components/atoms/Link";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { form, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { register, mutation } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(form);
    if (mutation.isSuccess) {
      return navigate("/add/pet", { replace: true });
    }
  };

  return (
    <>
      <Heading>Register</Heading>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <VerticalInput
              type="text"
              name="username"
              label="Username"
              emoji="🧑🏻"
              placeholder="username"
              value={form.username}
              handleChange={handleChange}
            />
            <VerticalInput
              type="email"
              name="email"
              label="Email"
              emoji="📧"
              placeholder="email"
              value={form.email}
              handleChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-6">
            <VerticalInput
              type="password"
              name="password"
              label="Password"
              emoji="🔑"
              placeholder="******"
              value={form.password}
              handleChange={handleChange}
            />
            <VerticalInput
              type="password"
              name="repeatPassword"
              label="Repeat Password"
              emoji="🔑"
              placeholder="******"
              value={form.repeatPassword}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600 font-medium">By signing up, you agree to petLog's</span>
            <Link className={"text-blue-500 hover:text-blue-400"} to="/tos">
              Terms of Service
            </Link>
          </div>
          <Button disabled={mutation.isLoading} type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-gray-900">Already have an account?</span>
            <Link className="w-min" to="/login">
              Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
