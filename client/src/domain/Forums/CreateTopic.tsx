import {
  Input,
  FormLabel,
  Button,
  Flex,
  Textarea,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createNewTopic } from "../../redux/slices/topicsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserInfo } from "../../redux/slices";

const CreateTopic: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userReducer.userState);

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch]);

  const [topicData, setTopicData] = useState({
    userid: user.id,
    title: "",
    text: "",
    closed: false,
    parentid: 0,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(createNewTopic(topicData));
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
        borderRadius="20px"
      >
        <form onSubmit={handleSubmit}>
          <u>
            <Heading mb={4}> Create a post</Heading>
          </u>
          <FormLabel mb={2}>New Topic</FormLabel>
          <Input
            type="text"
            placeholder="Title"
            size="sm"
            name="title"
            value={topicData.title}
            onChange={handleChange}
            backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
            rounded="md"
            m={1}
          />
          <Textarea
            type="text"
            placeholder="Text (optional)"
            size="lg"
            name="text"
            backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
            value={topicData.text}
            onChange={handleChange}
            m={1}
            minW="30vw"
          />
          <Flex justifyContent="flex-end">
          <Button type="submit" m={1} >
            Create
          </Button>
          <Button onClick={() => history.push("/topics")} m={1}>
            Cancel
          </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateTopic;
