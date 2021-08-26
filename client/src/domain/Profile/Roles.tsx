import { Flex, Heading } from "@chakra-ui/react";
import RoleImage from "../../components/Match/RoleImage";
import { mostUsed } from "../../utils/mostUsed"

interface Props {
  matches: any;
  user: any;
  userRank: any
}

const Roles: React.FC<Props> = ({ matches, user, userRank }) => {
   let roles: any = []
   let tier: any
   if (userRank?.length) { tier = userRank[0]?.tier;} else if(user && user.rank) { tier = user?.rank[0]?.tier }

   matches?.forEach((match) => {
     match?.participants?.forEach((participant) => {
       if (
         participant?.summonerName?.toLowerCase() ===
         user?.summoner_name?.toLowerCase()
       ) {
         roles.push(participant.individualPosition);
       }
     });
   });

   const roled = roles
   const mostPlayed = mostUsed(roled);
   const newRoles = roles?.filter((role) => role !== mostPlayed)
   const secondMostPlayed = mostUsed(newRoles);

  return (
    <Flex flexDirection="column" alignItems="center" w="100%" padding="10px">
      <Heading as="h3" size="lg" padding="5px">
        Preferred Positions
      </Heading>
      <Flex w="100%" flexDirection="row">
        <Flex w="50%" justifyContent="center">
          <RoleImage rank={tier} role={mostPlayed} message={"Most Played"} />
        </Flex>
        <Flex w="50%" justifyContent="center">
          <RoleImage
            rank={tier}
            role={secondMostPlayed}
            message={"Second Most Played"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Roles;
