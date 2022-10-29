import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useForm from "../hooks/useForm";
import { useAuth } from "../hooks/useStore";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [form, handleChange] = useForm({
    usernameOrEmail: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/api/auth",
        JSON.stringify(form)
      );
      console.log(response.data);
      if (response?.data?.status === 200) {
        const { status, ...rest } = response.data;
        setAuth({ ...auth, ...rest });
        return navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800">Log in</h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        action="submit"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="username or email"
            emoji="🧑🏻"
            name="usernameOrEmail"
            placeholder="datuchela"
            value={form.usernameOrEmail}
            onChange={handleChange}
            // pattern={"^[A-Za-z]+$"}
            required
          />
          <Input
            type="password"
            label="password"
            emoji="🔑"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <Link
          to="/register"
          className="font-medium text-gray-600 hover:text-gray-900 w-fit"
        >
          Don't have an account?
        </Link>
        <Button onSubmit={handleSubmit}>Log in</Button>
      </form>
    </>
  );
}
