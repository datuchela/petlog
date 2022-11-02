import { useLayoutEffect, useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { usePets } from "../hooks/useStore";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Radio from "../components/Radio";
import DateInput from "../components/DateInput";

export default function AddPet() {
  const { setPets } = usePets();
  const axiosPrivate = useAxiosPrivate();
  const [species, setSpecies] = useState([]);
  const [emoji, setEmoji] = useState({ name: "", weight: "" });
  const [form, handleChange, setForm] = useForm({
    name: "",
    gender: "",
    birthday: "",
    weight: "",
    speciesId: "",
  });
  const [status, setStatus] = useState();

  // current date for calendar validations
  const date = new Date();
  const now = date.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/api/pets",
        JSON.stringify(form)
      );
      console.log(response.data);
      if (response.data.status === 201) {
        setStatus(response.data.status);
        setPets(response.data.pet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH SPECIES LIST
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSpecies = async () => {
      try {
        const response = await axiosPrivate.get("/api/species");
        if (response.data.status === 200) {
          setSpecies(response.data.species);
        }
      } catch (err) {
        console.error(err);
      }
    };

    isMounted && getSpecies();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // side-effect
  useLayoutEffect(() => {
    setForm({ ...form, gender: "male", speciesId: "1" });
  }, []);
  // end of side-effects

  // // DEBUGGING PURPOSES ONLY
  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  useEffect(() => {
    if (form?.speciesId === "1") {
      setEmoji({ name: "🐶", weight: "🐕" });
    }
    if (form?.speciesId === "2") {
      setEmoji({ name: "🐱", weight: "🐈" });
    }
    console.log("emoji: ", emoji);
  }, [form?.speciesId]);

  if (status === 201) {
    return (
      <>
        <h1 className="text-4xl font-semibold text-gray-800">✅ All Done!</h1>
        <h2 className="text-3xl text-gray-800">
          {form.speciesId === "1" ? "🐶" : "🐱"}
          {form.name} has been added successfully!
        </h2>
        <Link
          className="font-medium text-gray-600 hover:text-gray-900 w-fit"
          to="/"
        >
          go to home page
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800">
        Let’s get to know your pet first! {emoji.weight}
      </h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        action="submit"
      >
        <div className="flex flex-col gap-8">
          <div className="flex gap-16">
            <Input
              label="name"
              emoji={emoji.name}
              name="name"
              placeholder="ex. Poppy"
              value={form.name}
              onChange={handleChange}
              pattern={"^[A-Za-z]+$"}
              required
            />
            <div className="flex flex-col gap-3">
              <label
                className="text-base font-normal text-gray-800"
                htmlFor="gender"
              >
                gender
              </label>
              <div className="border border-gray-400 rounded-md overflow-hidden flex items-center min-w-[272px] max-w-[272px] h-12">
                <Radio
                  label="Male"
                  name="male"
                  radioName="gender"
                  onChange={handleChange}
                  checked={form.gender === "male"}
                  required
                />
                <Radio
                  label="Female"
                  name="female"
                  radioName="gender"
                  onChange={handleChange}
                  checked={form.gender === "female"}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-16 items-center">
            <DateInput
              label="birthday (mm/dd/yyyy)"
              name="birthday"
              emoji="🎂"
              onChange={handleChange}
              value={form.birthday}
              min="1970-01-01"
              max={now}
              required
            />
            <div className="flex flex-col gap-3">
              <label htmlFor="">species</label>
              <div className="border border-gray-400 hover:border-gray-900 pr-2 rounded-md flex items-center justify-between min-w-[272px] max-w-[272px] w-[272px] overflow-hidden h-12">
                <select
                  className="w-full h-full cursor-pointer outline-none pl-2"
                  onChange={handleChange}
                  value={form.speciesId}
                  name="speciesId"
                  id="speciesId"
                >
                  {species?.map((species) => {
                    return (
                      <option key={species.id} value={species.id}>
                        {species.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-16">
            <Input
              type="number"
              min="0"
              max="200"
              className="outline-none pl-2 py-3 w-full h-full text-base font-normal text-gray-800"
              label="weight (in kgs)"
              emoji={emoji.weight}
              name="weight"
              placeholder="10kgs"
              value={form.weight}
              onChange={handleChange}
            />
          </div> */}
        </div>
        <Link
          className="font-medium text-gray-600 hover:text-gray-900 w-fit"
          to="/pet/search"
        >
          Already have petID?
        </Link>
        <Button onSubmit={handleSubmit}>Create petID</Button>
      </form>
    </>
  );
}
