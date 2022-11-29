import React, { useState } from "react";

type UseFormType = {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  setForm: React.Dispatch<any>;
};

const useForm = (initialValues: any): UseFormType => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, handleChange, setForm };
};

export default useForm;
