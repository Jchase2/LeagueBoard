import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { IRegisterForm } from "../../interfaces/RegisterForm";
import { verifyEmailAndUser } from "../../api/api";
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
import { SelectRegion } from './SelectRegion';
import { ErrorShow } from "../../components/Error/ErrorShow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRegions } from "../../redux/slices";

const RegisterUser = () => {
  let history = useHistory();
  const regions = useAppSelector((state) => state.regionReducer.regionState);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IRegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
    regionId: 0,
    summoner_name: "",
  });

  const [isError, setIsError] = useState<boolean>(false);
  const [stateMessage, setStateMessage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("FormData: ", formData);
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, password: "", confirmPassword: "" });
      setStateMessage("Password and confirm password are not the same.");
      return setIsError(true);
    }

    verifyEmailAndUser(
      formData.regionId,
      formData.summoner_name,
      formData.email
    )
      .then(() => {
        history.push({
          pathname: "/verify",
          state: { formdata: formData },
        });
      })
      .catch((err) => {
        setIsError(true);
        setStateMessage("Summoner or email already exist.");
      });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
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
      <ErrorShow
        message={stateMessage}
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
          <Heading>Register</Heading>
        </Box>
        <Box textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={4}>
              <FormControl isRequired mt={4}>
                <FormLabel> Summoner name </FormLabel>
                <Input
                  type="text"
                  name="summoner_name"
                  value={formData.summoner_name || ""}
                  size="lg"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired mt={4} mb={4}>
                <FormLabel> Regional ID </FormLabel>
                <SelectRegion name="regionId" handleChange={handleChange} regions={regions} />
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
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterUser;