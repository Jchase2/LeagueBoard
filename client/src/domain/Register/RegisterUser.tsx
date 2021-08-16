import { useHistory } from "react-router-dom";
import { useState } from "react";
import { IRegisterForm } from "../../interfaces/RegisterForm";

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

const RegisterUser = () => {
  let history = useHistory();
  const [formData, setFormData] = useState<IRegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
    regionId: 0,
    summonerName: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, password: "", confirmPassword: "" });
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }
    history.push({
      pathname: "/verify",
      state: { formdata: formData },
    });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

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
                <Input
                  type="text"
                  name="summonerName"
                  value={formData.summonerName || ""}
                  size="lg"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired mt={4} mb={4}>
                <FormLabel> Regional ID </FormLabel>
                <Input
                  type="number"
                  name="regionId"
                  value={formData.regionId || ""}
                  size="lg"
                  onChange={handleChange}
                ></Input>
              </FormControl>
              <FormLabel> Email </FormLabel>
              <Input
                type="email"
                value={formData.email || ""}
                name="email"
                size="lg"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel> Password </FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                size="lg"
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel> Confirm Password </FormLabel>
              <Input
                type="password"
                value={formData.confirmPassword || ""}
                name="confirmPassword"
                onChange={handleChange}
                size="lg"
              />
            </FormControl>
            <Button
              variantcolor="teal"
              variant="outline"
              width="full"
              mt={4}
              type="submit"
            >
              Register
            </Button>
            {error && <span className="error-message">{error}</span>}
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterUser;
