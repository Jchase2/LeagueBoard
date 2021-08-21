import { VStack, Flex, useColorModeValue } from "@chakra-ui/react"
import PlayerCard from "./PlayerCard";
import { v4 as uuidv4 } from "uuid";
import { queueTypes } from "../../utils/queueTypes";

interface Props {
    match: any
    users : any
}

const ProfileMatch: React.FC<Props> = ({ match, users }) => {
  const matchQueue = match?.queueId
  const queue = queueTypes?.filter((e) => e.queueId === matchQueue);
    return (
      <VStack key={uuidv4()} padding="5px">
        <Flex
          shadow="md"
          borderWidth="1px"
          borderRadius="10px"
          w="100%"
          maxw="100%"
          padding="5px"
          flexWrap="wrap"
          bg={useColorModeValue("#F0F8FF", "gray.900")}
        >
          {match &&
            match?.participants?.map((participant: any) => (
              <PlayerCard
                gameDuration={match.gameDuration}
                queue={queue}
                participant={participant}
                users={users}
                key={uuidv4()}
              />
            ))}
        </Flex>
      </VStack>
    );
}

export default ProfileMatch
