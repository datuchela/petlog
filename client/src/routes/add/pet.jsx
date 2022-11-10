import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";

// custom hooks
import useForm from "../../hooks/useForm";
import usePet from "../../hooks/usePet";
import usePets from "../../hooks/usePets";
import { getPets, getSpecies } from "../../api/methods";

// UI Components
import Heading from "../../components/atoms/Heading";
import Button from "../../components/atoms/Button";
import VerticalInput from "../../components/molecules/VerticalInput";
import Link from "../../components/atoms/Link";
import VerticalSelect from "../../components/molecules/VerticalSelect";

const AddPetPage = () => {
  const navigate = useNavigate();
  const { pets, isLoading: isPetsLoading } = usePets();
  const [form, handleChange] = useForm({
    name: "",
    gender: "male",
    birthday: "",
    speciesId: "1",
  });

  useEffect(() => {
    console.log(pets);
  }, [pets]);

  const {
    isLoading: isSpeciesLoading,
    isError: speciesIsError,
    error: speciesError,
    data: speciesData,
  } = useQuery("species", getSpecies, {
    refetchOnWindowFocus: false,
  });

  const emojiArray = ["🐕", "🐈", "🦅"];

  const { addPet } = usePet();
  const mutation = addPet();
  const { isLoading, isError, data, mutate } = mutation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(form);
    if (!isLoading && !isError) {
      console.log(mutation);
      console.log("isSuccess");
      return navigate("/", { replace: true });
    }
  };

  return (
    <>
      <Heading>Let's get to know your pet</Heading>
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
            <VerticalSelect
              name="gender"
              label="gender"
              value={form.gender}
              onChange={handleChange}
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
            />
            <VerticalSelect
              name="speciesId"
              label="species"
              value={form.speciesId}
              onChange={handleChange}
            >
              {speciesData?.species?.map((specie) => {
                return (
                  <option key={specie.id} value={specie.id}>
                    {emojiArray[specie.id - 1] + " " + specie.name}
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
      <div>
        <div>Pets:</div>
        <div>
          {isPetsLoading
            ? "Loading..."
            : pets?.map((pet) => <div key={pet.id}>{pet.name}</div>)}
        </div>
      </div>
    </>
  );
};

export default AddPetPage;
