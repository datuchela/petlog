import Link from "next/link";

import Button from "./Button";
import Input from "./Input";

const Search = ({ handleSubmit }) => {
  return (
    <>
      <Input
        label="petID"
        emoji="🐶"
        name="petID"
        placeholder="Riley#4123"
        onChange={handleChange}
      />
      <Link href="/register">
        <a className="font-medium text-gray-600 hover:text-gray-900 w-fit">
          Don't have petID?
        </a>
      </Link>
      <Button onClick={handleSubmit}>Search</Button>
    </>
  );
};

export default Search;
