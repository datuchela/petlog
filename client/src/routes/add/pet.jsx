import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

// custom hooks
import useForm from "../../hooks/useForm";
import useAddPet from "../../hooks/useAddPet";
import { getSpecies } from "../../api/methods";

// UI Components
import Heading from "../../components/atoms/Heading";
import Button from "../../components/atoms/Button";
import VerticalInput from "../../components/molecules/VerticalInput";
import Link from "../../components/atoms/Link";

const AddPetPage = () => {
  const navigate = useNavigate();
  const [form, handleChange] = useForm({
    name: "",
    gender: "",
    birthday: "",
    speciesId: "1",
  });

  const {
    isLoading: isLoading,
    isError: speciesIsError,
    error: speciesError,
    data: speciesData,
  } = useQuery("species", getSpecies, {
    refetchOnWindowFocus: false,
  });

  const { add, mutation } = useAddPet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await add(form);
    if (mutation.isSuccess) {
      console.log("isSuccess");
      return navigate("/", { replace: true });
    }
  };

  return (
    <>
      <Heading>Add Pet 🐕</Heading>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <VerticalInput
              type="text"
              name="name"
              label="name"
              emoji="🐰"
              placeholder="Poppy"
              value={form.name}
              handleChange={handleChange}
            />
            <VerticalInput
              type="text"
              name="gender"
              label="gender"
              emoji="🐩"
              placeholder="Male or Female"
              value={form.gender}
              handleChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-6">
            <VerticalInput
              type="date"
              name="birthday"
              label="birthday"
              emoji="🎂"
              placeholder="17/03/2018"
              value={form.birthday}
              handleChange={handleChange}
            />
            <select
              name="speciesId"
              placeholder={isLoading ? "Loading..." : "Select species"}
              value={form.speciesId}
              onChange={handleChange}
            >
              {speciesData?.species?.map((specie) => {
                return (
                  <option key={specie.id} value={specie.id}>
                    {specie.name}
                  </option>
                );
              })}
            </select>
            {/* <VerticalInput
              type="select"
              name="speciesId"
              label="species"
              emoji="🐹"
              placeholder="Select species"
              value={form.speciesId}
              handleChange={handleChange}
            /> */}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            disabled={mutation.isLoading}
            type="submit"
            className="w-full"
          >
            Add Pet
          </Button>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600 font-medium">
              By adding your pet, you agree to petLog's
            </span>
            <Link className={"text-blue-500 hover:text-blue-400"} to="/tos">
              Terms of Service
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPetPage;
