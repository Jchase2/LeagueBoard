import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getVerifyInfo, signUp } from "../../api/api";
import { ErrorShow } from "../../components/Error/ErrorShow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRegions } from "../../redux/slices";

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
  const [icon, setIcon] = useState<number>(0);
  const location: any = useLocation();
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

   const regions = useAppSelector((state) => state.regionReducer.regionState);
   const regionName = regions[location.state.formdata.regionId - 1]?.name;

    useEffect(() => {
      dispatch(fetchRegions());
    }, [dispatch]);

  const callFunc = async () => {
    return getVerifyInfo(
      location.state.formdata.regionId,
      location.state.formdata.summoner_name
    );
  };

  useEffect(() => {
    callFunc().then((res) => {
      setIcon(res.iconid);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = await getVerifyInfo(
      location.state.formdata.regionId,
      location.state.formdata.summoner_name
    );
      console.log(data.iconid)
    if (data.iconid !== icon) {
      //register call api
      console.log(data)
      console.log(data.iconid)

      signUp(location.state.formdata, data.puuid, data.iconid).then((res) => {
        if (res.data.success) {
          setIsError(false);
          window.location.href = "/";
        }
      });
    } else setIsError(true);
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
            size="md"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
          >
            Please change your user icon on League of Legends, then press
            verify. After verifying, you may change it back.
          </Heading>
        </Box>
        <Box my={4}>
          <Text fontSize="2xl">
            {" "}
            Summoner : {location.state.formdata.summoner_name}{" "}
          </Text>
          <Text fontSize="2xl"> Region : {regionName} </Text>
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
