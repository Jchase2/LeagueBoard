import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { getVerifyInfo, signUp } from "../../api/api";
import { ErrorShow } from "../../components/Error/ErrorShow";

import {
  Flex,
  Box,
  Text,
  Button,
  Image,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";

const VerificationComponent = () => {
  let history = useHistory();
  const [icon, setIcon] = useState<number>(0);
  const location: any = useLocation();
  const [isError, setIsError] = useState<boolean>(true);

  const callFunc = async () => {
    return getVerifyInfo(
      location.state.formdata.regionId,
      location.state.formdata.summonerName
    );
  };

  useEffect(() => {
    callFunc().then((res) => {
      setIcon(res.iconid);
    });
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = await getVerifyInfo(
      location.state.formdata.regionId,
      location.state.formdata.summonerName
    );
    if (data.iconid !== icon) {
      //register call api
      signUp(location.state.formdata, data.puuid)
        .then((res) => {
          if (res.success) {
            localStorage.setItem("accessToken", res.token);
            history.push("/");
          }
        })
        .catch((err) => {
          setIsError(true);
        });
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justifyContent="center"
      flexDirection="column"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Image src="lol.svg" alt="Logo" mb={6} />
      <ErrorShow
        message={"Please change your League of Legends Icon and press verify."}
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
      >
        <Box textAlign="center">
          <Heading
            as="h2"
            size="1xl"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
          >
            Please change your user icon on League of Legends, then press
            verify. After verifying, you may change it back.
          </Heading>
        </Box>
        <Box my={4}>
          <Text> Summoner Name: {location.state.formdata.summonerName} </Text>
          <Text> Region Id: {location.state.formdata.regionId} </Text>
          <form onSubmit={handleSubmit}>
            <Button
              variantcolor="teal"
              variant="outline"
              width="full"
              mt={6}
              type="submit"
            >
              Verify
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default VerificationComponent;
