import { useEffect, useState, useLayoutEffect } from "react";
import useForm from "../hooks/useForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth, useCurrentPet } from "../hooks/useStore";

// UI Components
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import DateInput from "../components/DateInput";

export default function AddReminder() {
  const auth = useAuth();
  const { currentPetId } = useCurrentPet();
  const axiosPrivate = useAxiosPrivate();
  const [form, handleChange, setForm] = useForm({
    name: "",
    upcoming: "",
    intervalValue: "",
    intervalType: "",
  });
  const [pet, setPet] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // current date for calendar validations
  const date = new Date();
  const now = date.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/api/reminders",
        JSON.stringify({ ...form, petId: currentPetId })
      );
      console.log(response.data);
      if (response.data.status === 201) {
        return navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // side-effect
  useLayoutEffect(() => {
    setForm({ ...form, petId: currentPetId, intervalType: "day" });
  }, [currentPetId]);

  useEffect(() => {
    const currentPet = auth.user.pets?.filter(
      (pet) => pet.id == currentPetId
    )[0];
    setPet(currentPet);
  }, [currentPetId]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  if (!auth.user.pets[0]) {
    return (
      <>
        <div>You have no pets yet</div>
        <Link
          className="font-medium text-gray-600 hover:text-gray-900"
          to="/add/pet"
        >
          Add Pet
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800">
        Let us know what to track for {pet?.name} 📅
      </h1>
      <form
        className="mt-8 flex flex-col gap-8"
        onSubmit={handleSubmit}
        action="submit"
      >
        <div className="flex items-center gap-6">
          <Input
            label="reminder name"
            // emoji="🐶"
            name="name"
            placeholder="Ex.: Monthly checkup"
            value={form.name}
            onChange={handleChange}
            // pattern={"^[A-Za-z]+$"}
            required
          />

          <DateInput
            label="upcoming date (mm/dd/yyyy)"
            name="upcoming"
            emoji="📅"
            onChange={handleChange}
            value={form.upcoming}
            min={now}
            // max={now}
            required
          />
          {/* <Input
            type="text"
            label="interval in between"
            emoji="⏳"
            name="interval"
            placeholder="10 months"
            value={form.interval}
            onChange={handleChange}
          /> */}
          {/*  */}

          <div className="flex flex-col gap-3">
            <label htmlFor="">interval</label>
            <div className="border border-gray-400 hover:border-gray-900 rounded-md px-2 flex items-center justify-between min-w-[272px] max-w-[272px] w-[272px] overflow-hidden h-12">
              <input
                min="1"
                max="36"
                placeholder="Ex.: 2"
                className="outline-none h-full w-full"
                type="number"
                name="intervalValue"
                onChange={handleChange}
                value={form.intervalValue}
              />
              <select
                className="outline-none pl-2 border-l-2"
                name="intervalType"
                id="intervalType"
                onChange={handleChange}
                value={form.intervalType}
              >
                <option value="day">day(s)</option>
                <option value="week">week(s)</option>
                <option value="month">month(s)</option>
                <option value="year">year(s)</option>
              </select>
            </div>
          </div>

          {/*  */}
        </div>
        <div className="flex flex-col gap-4">
          <Button onSubmit={handleSubmit}>Create Reminder</Button>

          {/* implement back */}
          {/* <Link
            className="font-medium text-gray-600 hover:text-gray-900 w-fit"
            to="/"
          >
            Go back
          </Link> */}
        </div>
      </form>
    </>
  );
}
