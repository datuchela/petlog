import { useState } from "react";
import { useAuth } from "../hooks/useStore";
import useForm from "../hooks/useForm";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// UI Components
import Heading from "../components/atoms/Heading";
import Button from "../components/atoms/Button";
import VerticalInput from "../components/molecules/VerticalInput";
import Link from "../components/atoms/Link";

const Login = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [form, handleChange] = useForm({ usernameOrEmail: "", password: "" });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post(
        "/api/auth",
        JSON.stringify(form)
      );
      console.log(response.data);
      if (response?.status === 200) {
        setAuth({ ...auth, ...response.data });
        return navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
            placeholder="example"
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
          <Button disabled={isLoading} type="submit" className="w-full">
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

export default Login;
