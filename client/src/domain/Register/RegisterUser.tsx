import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { Register } from "../../redux/actions/Authenticate";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  regionId: string;
  summonerName: string;
}

const RegisterUser = () => {
  const [formData, setFormData] = useState<IRegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
    regionId: "",
    summonerName: "",
  });

  const dispatch = useDispatch();
  const history: any = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // dispatch an action to signup
    if (formData.email && formData.password && formData.confirmPassword) {
      // include extra validation here to check that they have a leagueOfLegends accout
      if (formData.password === formData.confirmPassword)
        dispatch(Register(formData, history));
      else {
        setFormData((current: any) => ({
          ...current,
          password: "",
          confirmPassword: "",
        }));
        alert(`Passwords don't match, try again`);
      }
    } else alert(`Please fill out all fields`);
  };

  /*  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchIsRegister = () => {
    setIsRegister(!isRegister);

  }; */
  // use chalkra to create the layout

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
          {/* On submit of register, render verification component with formData.regionId and formData.summonerName as props */}
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterUser;
