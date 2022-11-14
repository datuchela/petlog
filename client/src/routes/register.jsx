import { useNavigate } from "react-router-dom";

// custom hooks
import useForm from "../hooks/useForm";
import useRegister from "../hooks/useRegister";

// UI Components
import Heading from "../components/atoms/Heading";
import Button from "../components/atoms/Button";
import VerticalInput from "../components/molecules/VerticalInput";
import Link from "../components/atoms/Link";

// Page Component
const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, handleChange] = useForm({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { register, mutation } = useRegister();

  const handleSubmit = async (e) => {
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
              placeholder="example"
              value={form.username}
              handleChange={handleChange}
            />
            <VerticalInput
              type="email"
              name="email"
              label="Email"
              emoji="📧"
              placeholder="example@mail.com"
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
              placeholder="*********"
              value={form.password}
              handleChange={handleChange}
            />
            <VerticalInput
              type="password"
              name="repeatPassword"
              label="Repeat Password"
              emoji="🔑"
              placeholder="*********"
              value={form.repeatPassword}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            disabled={mutation.isLoading}
            type="submit"
            className="w-full"
          >
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
