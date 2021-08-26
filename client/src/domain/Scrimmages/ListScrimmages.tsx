import { Flex, Box, Heading, Button, Center, InputGroup, InputLeftAddon, Input, Container, Divider } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IScrimmage } from "../../interfaces/Scrimmages";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchScrimmages } from "../../redux/slices/scrimmageSlice";
import MapScrims from "./MapScrims";


const ListScrimmages: React.FC = () => {

  const [filteredScrims, setFilteredScrims] = useState<IScrimmage[]>([]);
  const [query, setQuery] = useState<string>('');
  let history = useHistory();
  const dispatch = useAppDispatch()
  const scrims:any = useAppSelector((state) => state.scrimmageSlice.scrimmages);

  useEffect(() => {
    dispatch(fetchScrimmages());
  }, []);

  const filteringScrims = (value:string) => {
    setQuery(value);
    const result = scrims.filter(scrim => scrim.team1Name.toLowerCase().includes(value) || scrim.team2Name.toLowerCase().includes(value));
    setFilteredScrims(result);
  }

  return (
    <Flex minH="100vh" align="center" flexDirection="column">
      <Center>
        <Container marginLeft="25px" padding="0px">
          <InputGroup size="md">
            <InputLeftAddon children={<SearchIcon color="gray.900" />} />
            <Input
              variant="filled"
              type="tel"
              placeholder="Search"
              onChange={(event) => filteringScrims(event.target.value)}
            />
          </InputGroup>
        </Container>
      </Center>

      <Center>
        <Box textAlign="center">
          <Heading>UpComing Scrimmages</Heading>
        </Box>
      </Center>
      <Divider></Divider>
      <Center>
        <Box>
          <Button onClick={() => history.push("/scrims/create")} m={1}>
            New Scrimmage
          </Button>
        </Box>
        <Divider></Divider>
      </Center>
      
        <MapScrims scrims={query.length ? filteredScrims : scrims} />
      
    </Flex>
  );
};

export default ListScrimmages;