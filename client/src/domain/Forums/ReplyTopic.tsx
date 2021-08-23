import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Props } from "framer-motion/types/types";
import { createNewTopic, fetchComments, fetchUserInfo } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const ReplyTopic: React.FC<Props> = ({thread, setIsReply}) => {

  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userReducer.userState);

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch]);

  const [topicData, setTopicData] = useState({
    parentid: Number(thread.id),
    userid: user.id,
    title: "",
    text: "",
    closed: false,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(createNewTopic(topicData)).then(() => {
        dispatch(fetchComments(thread.id))
      })
      setIsReply(false);
    } catch (error) {
      console.log(error)
      alert("Something went wrong when creating your reply, please try again!");
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
          <Button onClick={() => setIsReply(false)} m={1}>
            Cancel
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export default ReplyTopic;
