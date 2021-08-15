import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Register } from "../../redux/actions/Authenticate";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

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
  {
    /* On submit of register, render verification component with formData.regionId and formData.summonerName as props */
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justifyContent="center"
      flexDirection="column"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Image src="lol.svg" alt="Logo" mb={6} mt={6} />
      <Box
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        minW="35vw"
        bg={useColorModeValue("white", "gray.800")}
        marginBottom="20px"
      >
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={4}>
              <FormControl isRequired mt={4}>
                <FormLabel> Summoner name </FormLabel>
                <Input type="summonerName" name="summonerName" size="lg" />
              </FormControl>
              <FormControl isRequired mt={4} mb={4}>
                <FormLabel> Regional ID </FormLabel>
                <Input></Input>
                {/* <Select placeholder="Select Region">
                {regionArray.map((e: any) => {
                  <option>e.region</option>;
                })}
              </Select> */}
              </FormControl>
              <FormLabel> Email </FormLabel>
              <Input type="email" name="password" size="lg" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel> Password </FormLabel>
              <Input type="password" name="password" size="lg" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel> Confirm Password </FormLabel>
              <Input type="password" name="confirmPassword" size="lg" />
            </FormControl>
            <Button
              variantColor="teal"
              variant="outline"
              width="full"
              mt={4}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterUser;
