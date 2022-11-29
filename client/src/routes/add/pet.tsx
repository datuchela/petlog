import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// custom hooks
import useForm from "../../hooks/useForm";
import usePet from "../../hooks/usePet";
import usePets from "../../hooks/usePets";
import { getSpecies, SpeciesType } from "../../api/methods/species";

// UI Components
import Heading from "../../components/atoms/Heading";
import Button from "../../components/atoms/Button";
import VerticalInput from "../../components/molecules/VerticalInput";
import Link from "../../components/atoms/Link";
import VerticalSelect from "../../components/molecules/VerticalSelect";

const AddPetPage = () => {
  const navigate = useNavigate();
  const { form, handleChange } = useForm({
    name: "",
    gender: "male",
    birthday: "",
    speciesId: "1",
  });

  const maxDateOfBirth = new Date().toISOString().split("T")[0]; // Gets the current date in yyyy-mm-dd format to validate birthdate

  const {
    isLoading: isSpeciesLoading,
    isError: speciesIsError,
    error: speciesError,
    data: speciesData,
  } = useQuery(["species"], getSpecies, {
    refetchOnWindowFocus: false,
  });

  const { addPet } = usePet();
  const mutation = addPet();
  const { isLoading, isError, error, isSuccess, data, mutate } = mutation;

  useEffect(() => {
    if (!isSuccess) return;
    return navigate("/", { replace: true });
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <>
      <Heading>Let's get to know your pet</Heading>
      {isError && (
        <div className="font-semibold text-red-400 px-4 py-2 rounded-lg">
          Whoops, Something went wrong.
        </div>
      )}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <VerticalInput
              type="text"
              name="name"
              label="name"
              emoji="🐰"
              placeholder="Roger"
              value={form.name}
              handleChange={handleChange}
            />
            <VerticalSelect
              name="gender"
              label="gender"
              value={form.gender}
              handleChange={handleChange}
            >
              <option key="male" value="male">
                male
              </option>
              <option key="female" value="female">
                female
              </option>
            </VerticalSelect>
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
              max={maxDateOfBirth}
            />
            <VerticalSelect
              name="speciesId"
              label="species"
              value={form.speciesId}
              handleChange={handleChange}
            >
              {speciesData?.species?.map((specie: SpeciesType) => {
                return (
                  <option key={specie.id} value={specie.id}>
                    {specie.emoji + " " + specie.name}
                  </option>
                );
              })}
            </VerticalSelect>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button disabled={isLoading} type="submit" className="w-full">
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
