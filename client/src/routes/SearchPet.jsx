import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Pet from "../components/Pet";

export default function SearchPet() {
  const axiosPrivate = useAxiosPrivate();
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState("#0000");
  const [error, setError] = useState();
  const [pet, setPet] = useState();

  const petIdRegex = /^([A-Z]{0,1}[a-z]{0,16})(?:\#[0-9]{0,4})?$/;

  const handleInput = (e) => {
    if (e.target.value === "" || petIdRegex.test(e.target.value)) {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    setError(null);
    if (search.includes("#")) {
      const num = search.split("#")[1];
      function pad(num, size) {
        const zeroes = num + "0000";
        return zeroes.substring(num.length, size);
      }
      const paddedNum = pad(num, 4);
      setSuggestion(paddedNum);
    }

    return () => setSuggestion("#0000");
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const petIdArray = search.split("#");
    try {
      const response = await axiosPrivate.get(
        `/api/pets/${petIdArray[0]}/${petIdArray[1]}`
      );
      if (response?.data?.status !== 200) {
        setError("Something went wrong");
        // throw Error(response.data?.msg);
      }
      setPet(response?.data?.pet);
    } catch (error) {
      return console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800">
        {pet?.name || "Search with petID"}
      </h1>
      {pet ? (
        <>
          <Pet pet={pet} />
          <button onClick={() => setPet(null)}>back to search</button>
        </>
      ) : (
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          action="submit"
        >
          <Input
            label="petID"
            emoji="🐶"
            name="petID"
            placeholder="Riley#4123"
            error={error}
            value={search}
            onChange={handleInput}
            size={search.length}
            className="relative z-10 bg-transparent text-gray-600 text-lg"
          >
            {search && (
              <span
                aria-hidden={true}
                className={`absolute pointer-events-none select-none pl-2 py-3 text-lg font-normal text-gray-400`}
              >
                {search + suggestion}
              </span>
              // <input
              //   className={`absolute pointer-events-none select-none pl-2 py-3 text-base font-normal text-gray-400 disabled:bg-transparent`}
              //   value={search}
              //   disabled={true}
              // />
            )}
          </Input>
          <Link
            to="/pet/add"
            className="font-medium text-gray-600 hover:text-gray-900 w-fit"
          >
            Don't have petID?
          </Link>
          <Button onClick={handleSubmit}>Search</Button>
        </form>
      )}
    </>
  );
}
