import {
  Input,
  FormLabel,
  Button,
  Flex,
  Heading,
  useColorModeValue,
  Divider, Center, SimpleGrid, Container,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { useHistory } from "react-router";

interface Props {
  
}

const CreateScrimmage = (props: Props) => {
  let history = useHistory();
  const dispatch = useAppDispatch()


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // dispatch(createNewTopic(topicData));
      history.push('/topics')
    } catch (error) {
      alert("Something went wrong when creating your reply, please try again!");
      console.log(error);
    }
  };


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTopicData({
      ...topicData,
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
              <Heading mb={4}> Create a Scrimmage </Heading>
            </u>
          </Center>

          <SimpleGrid columns={2} spacing={2}>
            <Container>
              <Center>
                <FormLabel mb={2}>Date</FormLabel>
              </Center>
              <Input
                type="date"
                placeholder="Date"
                size="sm"
                name="title"
                /* value={scrim.date} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
            </Container>
            <Container>
            <Center>
                <FormLabel mb={2}>Time</FormLabel>
              </Center>
              <Input
              type="time"
              placeholder="Time"
              size="sm"
              name="title"
              /* value={scrim.time} */
              onChange={handleChange}
              backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
              rounded="md"
              m={1}
            />
            </Container>
          </SimpleGrid>

          <SimpleGrid columns={2} spacing={2}>
            <Container>
              <Center>
                <FormLabel mb={2}>Team 1</FormLabel>
              </Center>
              <Input
                type="text"
                placeholder="Team Name"
                size="sm"
                name="title"
                /* value={team1.name} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 1"
                size="sm"
                name="title"
                /*  value={team1.player1} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 2"
                size="sm"
                name="title"
                /*  value={team1.player2} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 3"
                size="sm"
                name="title"
                /* value={team1.player3} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 4"
                size="sm"
                name="title"
                /* value={team1.player4} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 5"
                size="sm"
                name="title"
                /* value={team1.player5} */
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
                name="title"
                /* value={tea} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 1"
                size="sm"
                name="title"
                /* value={team2.player1} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 2"
                size="sm"
                name="title"
                /* value={team2.player2} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 3"
                size="sm"
                name="title"
                /* value={team2.player3} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 4"
                size="sm"
                name="title"
                /* value={team2.player4} */
                onChange={handleChange}
                backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
                rounded="md"
                m={1}
              />
              <Input
                type="text"
                placeholder="Player 5"
                size="sm"
                name="title"
                /* value={team2.player5} */
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
