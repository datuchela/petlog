import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

type ComboBoxPropsType = {
  isLoading: boolean;
  arrayOfData: Array<{ id: number; name: string }>;
  value: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const ComboBox: React.FC<ComboBoxPropsType> = ({ isLoading, arrayOfData, value, handleChange }) => {
  const [selected, setSelected] = useState(arrayOfData ? arrayOfData[0].id : 0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const filteredArray =
    query === ""
      ? arrayOfData
      : arrayOfData?.filter((entry) => {
          return entry.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="border border-black">
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
        <Combobox.Options>
          {filteredArray?.map((entry) => (
            <Combobox.Option key={entry.id} value={entry.id}>
              {entry.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default ComboBox;
