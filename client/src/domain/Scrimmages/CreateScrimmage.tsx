import {
  Input, FormLabel, Button, Flex, Heading, useColorModeValue,
  Center, SimpleGrid, Container, Select, FormControl
} from "@chakra-ui/react";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { useHistory } from "react-router";
import { createScrimmage } from "../../redux/slices/scrimmageSlice";

interface Props {
  
}

const CreateScrimmage: React.FC = (props: Props) => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  const [scrimmageForm, setScrimmageForm] = useState({
    date: "",
    time: "",
    bestOf: "",
    team1Name: "",
    team2Name: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    player5: "",
    player6: "",
    player7: "",
    player8: "",
    player9: "",
    player10: "",
  });


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(createScrimmage(scrimmageForm));
      history.push('/scrimmages')
    } catch (error) {
      alert("Something went wrong when creating your Scrimmage, please correct the input fields");
      console.log(error);
    }
  };


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setScrimmageForm({
      ...scrimmageForm,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };


  return (
    <Flex align="center" flexDirection="column" marginTop={5}>
      <Flex
        boxShadow="lg"
        colorScheme={useColorModeValue("#F0F8FF", "black")}
        padding="30px"
        borderRadius="20px">
        <form onSubmit={handleSubmit}>
          <Center>
            <u>
              <Heading mb={4}> Create Scrimmage </Heading>
            </u>
          </Center>

          <SimpleGrid columns={3} spacing={3}>
            <Container>
              <Center>
                <FormLabel mb={2}>Date</FormLabel>
              </Center>
              <Input
                isRequired
                type="date"
                placeholder="Date"
                size="sm"
                name="date"
                value={scrimmageForm.date}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
            </Container>
            <Container>
              <FormControl isRequired id="Bestof">
                <Center><FormLabel>Best Of</FormLabel></Center>
                <Select placeholder="Best Of" name="bo">
                  <option>5</option>
                  <option>3</option>
                  <option>1</option>
                </Select>
              </FormControl>
            </Container>
            <Container>
            <Center>
                <FormLabel mb={2}>Time</FormLabel>
              </Center>
              <Input
              isRequired
              type="time"
              placeholder="Time"
              size="sm"
              name="time"
              value={scrimmageForm.time}
              onChange={handleChange}
              backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
              rounded="md"
              m={1}
            />
            </Container>
          </SimpleGrid>

          <SimpleGrid columns={2} spacing={5}>
            <Container>
              <Center>
                <FormLabel mb={2}>Team 1</FormLabel>
              </Center>
              <Input
                isRequired
                type="text"
                placeholder="Team Name"
                size="sm"
                name="team1Name"
                value={scrimmageForm.team1Name}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                isRequired
                type="text"
                placeholder="Player 1"
                size="sm"
                name="player1"
                value={scrimmageForm.player1} 
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                isRequired
                placeholder="Player 2"
                size="sm"
                name="player2"
                value={scrimmageForm.player2}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                isRequired
                placeholder="Player 3"
                size="sm"
                name="player3"
                value={scrimmageForm.player3}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                isRequired
                placeholder="Player 4"
                size="sm"
                name="player4"
                value={scrimmageForm.player4}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                isRequired
                placeholder="Player 5"
                size="sm"
                name="player5"
                value={scrimmageForm.player5}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
            </Container>

            <Container>
              <Center>
                <FormLabel mb={2}>Team 2</FormLabel>
              </Center>
              <Input
                type="text"
                placeholder="Team Name"
                size="sm"
                name="team2Name"
                value={scrimmageForm.team2Name}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 1"
                size="sm"
                name="player6"
                value={scrimmageForm.player6}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 2"
                size="sm"
                name="player7"
                value={scrimmageForm.player7}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 3"
                size="sm"
                name="player8"
                value={scrimmageForm.player8}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 4"
                size="sm"
                name="player9"
                value={scrimmageForm.player9}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 5"
                size="sm"
                name="player10"
                value={scrimmageForm.player10}
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
            </Container>
          </SimpleGrid>

          <Flex justifyContent="flex-end">
            <Button type="submit" m={1}>
              Create
            </Button>
            <Button onClick={() => history.push("/scrim")} m={1}>
              Cancel
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default CreateScrimmage
