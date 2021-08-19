import {
  Input,
  FormLabel,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router";
import SidebarWithHeader from "../../components/Heading/Heading";
import { createNewTopic } from "../../redux/slices/topicsSlice";
import { useAppDispatch } from "../../redux/hooks";

const CreateTopic: React.FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch()

  const [topicData, setTopicData] = useState({
    userid: 1,
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
    <SidebarWithHeader>
      <Flex align="center" flexDirection="column">
        <form onSubmit={handleSubmit}>
            <FormLabel m={1}>New Topic</FormLabel>
            <Input
              type="text"
              placeholder="Title"
              size="sm"
              name="title"
              value={topicData.title}
              onChange={handleChange}
              rounded="md"
              m={1}
            />
            <Textarea
              type="text"
              placeholder="Topic Text"
              size="lg"
              name="text"
              value={topicData.text}
              onChange={handleChange}
              m={1}
            />
            <Button type="submit" m={1}>
              Create
            </Button>
            <Button onClick={() => history.push("/topics")} m={1}>
              Cancel
            </Button>
        </form>
      </Flex>
    </SidebarWithHeader>
  );
};

export default CreateTopic;
