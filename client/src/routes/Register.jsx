import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useAuth } from "../hooks/useStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
  const navigate = useNavigate();

  // handle form inputs
  const [form, handleChange] = useForm({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerResponse = await axiosPrivate.post(
        "/api/users",
        JSON.stringify(form)
      );
      console.log("registerResponse: ", registerResponse?.data);
      const authResponse = await axiosPrivate.post(
        "/api/auth",
        JSON.stringify({
          usernameOrEmail: form.username,
          password: form.password,
        })
      );
      console.log("authResponse: ", authResponse?.data);
      if (authResponse?.data?.status === 200) {
        const { status, ...rest } = authResponse.data;
        auth.setAuth(rest);
        return navigate("/add/pet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(form); // just logging purposes
  // }, [form]);

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800">
        Let’s get to know you first!
      </h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        action="submit"
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-16">
            <Input
              label="username"
              emoji="🧑🏻"
              name="username"
              placeholder="datuchela"
              value={form.username}
              onChange={handleChange}
              pattern={"^[A-Za-z0-9]+$"}
              required
            />
            <Input
              type="email"
              label="email"
              emoji="📧"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center gap-16">
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
            <Input
              type="password"
              label="re-enter password"
              emoji="🔑"
              name="repeatPassword"
              placeholder="********"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <Link
          to="/login"
          className="font-medium text-gray-600 hover:text-gray-900 w-fit"
        >
          Already have an account?
        </Link>
        <Button onSubmit={handleSubmit}>Create an account</Button>
      </form>
    </>
  );
}
