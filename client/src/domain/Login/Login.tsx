import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { IUser } from "../../interfaces/User";
import { signIn } from "../../api/api";
import { ErrorShow } from "../../components/Error/ErrorShow";

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
  Link,
} from "@chakra-ui/react";

const Login = () => {
  let history = useHistory();

  const [loginData, setLoginData] = useState<IUser>({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //set token in localstorage and redirect to index
    signIn(loginData)
      .then((res) => {
        if (res.data.success) {
          setIsError(false);
          window.location.href = "/"
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(err)
      });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
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
      <ErrorShow
        message={"Email or Password are incorrect"}
        isClosed={isError}
        setIsError={setIsError}
      />
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
          <Heading>Login</Heading>
        </Box>
        <Box textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl mt={2}>
              <FormLabel> Email </FormLabel>
              <Input
                type="email"
                value={loginData.email || ""}
                name="email"
                size="lg"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel> Password </FormLabel>
              <Input
                type="password"
                name="password"
                value={loginData.password || ""}
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
                Login
              </Button>

            <Button
              variantcolor="teal"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => history.push("/signup")}
            >
              Not registered yet ? Sign up!
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
