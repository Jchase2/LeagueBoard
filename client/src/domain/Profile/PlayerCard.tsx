import { Flex } from "@chakra-ui/react";

interface Props {
  participant: any;
  users: any;
}

const PlayerCard: React.FC<Props> = ({ participant, users }) => {
    
  return (
    <>
      <Flex>
        {participant?.summonerName === users.summoner_name && (
          <>
            <Flex>{participant?.championName}</Flex>
            <Flex></Flex>
            <Flex></Flex>
            <Flex></Flex>
            <Flex></Flex>
            <Flex></Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default PlayerCard
