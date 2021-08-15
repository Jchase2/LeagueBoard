import { useState, useEffect } from "react";
import { getVerifyInfo } from "../../api/api";
import { getRegions } from "../../api/api";

import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Select,
  useColorModeValue
} from "@chakra-ui/react";

// Declaring type of props - see "Typing Component Props" for more examples
type RegisterUserProps = {
  regionId: number;
  summonerName: string;
};

const VerificationComponent = () => {
  const [regionArray, setRegionArray] = useState<string[]>([]);
  const [iconLinkArr, setIconLinkArr] = useState<string[]>([]);

  useEffect(() => {
    getRegions().then((res) => {
      setRegionArray([...res.data]);
    });
  });

  // COME FROM RegisterScreen
  // props --> {signup fields}
  // Enter this component call verifyInfo with Summoner and RegionId
  // verifyInfo returns ---> iconId and the puuid.
  // puuid needs to be added to signup fields
  // iconId added to the setIconLink

  // Ask user to change icon, when button clicked call verifyInfo again and add iconId to iconLink.
  // Check if iconLink[0] === iconLink[1] and iconLink[0] !== defaultIconId
  // if true call signup request
  // else  cancel thesis
  // if icon is already the default, repeat register and change icon before registering

  // useEffect(() => {
  //   getVerifyInfo(props.regionId, props.summonerName).then((res) => {
  //     setIconLinkArr([...iconLinkArr, res.iconId]);
  //   });
  // });

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
      <Box
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        minW="35vw"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Box textAlign="center">
          <Text display="flex" flexWrap="wrap" justifyContent="center">
            Enter your Summoner name and Regional ID before pressing verify change your in game icon
          </Text>
        </Box>
        <Box my={4}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={6}>
              <FormLabel> Summoner name </FormLabel>
              <Input type="summonerName" name="summonerName" size="lg" />
            </FormControl>
            <FormControl isRequired mt={6} mb={6}>
              <FormLabel> Regional ID </FormLabel>
              {/* <Select placeholder="Select Region">
                {regionArray.map((e: any) => {
                  <option>e.region</option>;
                })}
              </Select> */}
            </FormControl>
            <Button
              variantColor="teal"
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
