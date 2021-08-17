import { Input, FormControl, FormLabel, Button, Flex, Textarea } from "@chakra-ui/react";
import { createTopic } from "../../api/backendApi";
import { useState } from "react";

const CreateTopic = () => {
  const [topicData, setTopicData] = useState({
    userid: 1,
    title: "",
    text: "",
    closed: false,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    createTopic(topicData).then(resp => {
      console.log(resp)
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopicData({
      ...topicData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <Flex align="center" flexDirection="column">
      <form onSubmit={handleSubmit}>
        <FormControl m={2}>
          <FormLabel m={1}>New Topic</FormLabel>
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
        </FormControl>
      </form>
    </Flex>
  );
};

export default CreateTopic;
