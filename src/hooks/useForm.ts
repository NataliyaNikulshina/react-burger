import { ChangeEvent, useState } from "react";
import { TUseForm } from "../services/types/data";

export const useForm = (inputValues: TUseForm ) => {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
