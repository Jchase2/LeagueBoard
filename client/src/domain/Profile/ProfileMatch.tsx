import { VStack, Flex } from "@chakra-ui/react"
import PlayerCard from "./PlayerCard";
import { v4 as uuidv4 } from "uuid";

interface Props {
    match: any
    users : any
}

const ProfileMatch: React.FC<Props> = ({ match, users }) => {
    return (
      <VStack key={uuidv4()} padding="5px">
        <Flex
          shadow="md"
          borderWidth="1px"
          borderRadius="10px"
          w="100%"
          maxw="100%"
          padding="24px"
          flexWrap="wrap"
        >
          {match?.participants?.map((participant: any) => (
            <PlayerCard
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
