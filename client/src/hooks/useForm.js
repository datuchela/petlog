import { useState } from "react";

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    if (e.target.pattern) {
      const pattern = new RegExp(e.target.pattern);
      if (e.target.value == "" || pattern.test(e.target.value)) {
        console.log("hello");
        setForm({ ...form, [e.target.name]: e.target.value });
      }
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return [form, handleChange, setForm];
};

export default useForm;
