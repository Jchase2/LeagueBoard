import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { createNewTopic } from "../../api/api";
import { useState } from "react";
import { Props } from "framer-motion/types/types";

interface myProps extends Props {
  setIsReply: Function;
}

const ReplyTopic: React.FC<myProps> = (props) => {

  const [topicData, setTopicData] = useState({
    parentid: Number(props.topicid),
    userid: 1,
    title: "",
    text: "",
    closed: false,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      createNewTopic(topicData).then((resp) => {
        props.setIsReply(false);
        props.updateComments();
        console.log("Successfully created reply.");
      });
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
    <Flex align="center" flexDirection="column">
      <form onSubmit={handleSubmit}>
        <FormControl m={2}>
          <FormLabel m={1}>New Reply</FormLabel>
          <Input
            type="text"
            placeholder="Title"
            size="sm"
            name="title"
            value={topicData.title}
            onChange={handleChange}
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
          <Button onClick={() => props.setIsReply(false)} m={1}>
            Cancel
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export default ReplyTopic;